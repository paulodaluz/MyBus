import { useMapRegion } from '../../../hooks/useMapRegion';
import { hasCoordinates, selectVehicleLocations } from '../../../service/MapDataService';
import { WideButton } from '../../../components/WideButton';
import { Feedback } from '../../../components/commonComponents/Feedback';
import { Screen } from '../../../components/commonComponents/Screen';
import * as Location from 'expo-location';
import { firebase } from '../../../database/FirebaseConfiguration';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import bus_icon from '../../../assets/icons/png/map/bus_icon.png';
import bus_stop from '../../../assets/icons/png/map/bus_stop.png';
import passenger_marker from '../../../assets/icons/png/map/passenger_marker.png';
import { getBusStopsLocalzations } from '../../../backend/map/PassengerMap';
import { calculateTime } from '../../../backend/utils/Utils';
import { getMyVehicles } from '../../../backend/vehicles/Vehicle';
import { Menu } from '../../../components/Menu';
import { NextVehicleOnThisPoint } from './NextVehicleOnThisPoint';
import { styles } from './style';

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, setMyposition] = useState(null);
	const [busStops, setBusStops] = useState([]);
	const [loadError, setLoadError] = useState(false);

	const [realTimeVehicles, setRealTimeVehicles] = useState([]);
	const [vehiclesByFirestore, setVehiclesByFirestore] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [vehiclesOnThisPoint, setVehiclesOnThisPoint] = useState(false);

	const [timeToArriveVehicle, setTimeToArriveVehicle] = useState(0);

	const mapRegion = useMapRegion(navigation, user);
	const getMyPosition = useCallback(async () => {
		let status;
		try {
			({ status } = await Location.requestForegroundPermissionsAsync());
		} catch {
			Alert.alert('Erro ao acessar o GPS!');
			return;
		}

		if (status !== 'granted') {
			Alert.alert('Permissão de acesso a localização negado!');
		} else {
			await Location.getCurrentPositionAsync({})
				.then((retorno) => setMyposition(retorno.coords))
				.catch((error) => {
					console.log(`MapDriverPage - getMyPosition - ERROR = ${error}`);
					Alert.alert('Erro ao acessar o GPS!');
				});
		}
	}, []);

	const getVehiclesInfos = useCallback(async () => {
		try {
			const vehiclesFirestore = await getMyVehicles(user.uid);
			const stops = await getBusStopsLocalzations(vehiclesFirestore);
			setVehiclesByFirestore(vehiclesFirestore);
			setBusStops(stops.filter(hasCoordinates));
			setLoadError(false);
		} catch {
			setLoadError(true);
		}
	}, [user.uid]);

	useEffect(() => {
		const ref = firebase.database().ref('/real_time_database');
		const listener = (snapshot) => {
			setRealTimeVehicles(
				selectVehicleLocations(
					snapshot.val(),
					vehiclesByFirestore.map((vehicle) => vehicle.registration_plate)
				)
			);
		};
		ref.on('value', listener, () => {
			setRealTimeVehicles([]);
			setLoadError(true);
		});
		return () => ref.off('value', listener);
	}, [vehiclesByFirestore]);

	const getNextVehiclesInThisPoint = (busStop) => {
		setModalVisible(!modalVisible);

		const vehiclesInThisPoint = vehiclesByFirestore.find(
			(vehicle) => vehicle.registration_plate === busStop.vehicle_plate
		);

		const localizationVehicle = realTimeVehicles.find(
			(realTimeVehicle) => realTimeVehicle.registration_plate === busStop.vehicle_plate
		);

		let time = null;
		if (hasCoordinates(localizationVehicle)) {
			time = calculateTime(
				busStop.latitude,
				busStop.longitude,
				localizationVehicle.latitude,
				localizationVehicle.longitude
			);
		}

		setTimeToArriveVehicle(time);

		setVehiclesOnThisPoint(vehiclesInThisPoint || { name: 'Veículo indisponível' });
	};

	useLayoutEffect(() => {
		getVehiclesInfos();
		getMyPosition();
	}, [getMyPosition, getVehiclesInfos]);

	return (
		<Screen scroll={false}>
			<MapView
				style={styles.mapStyle}
				ref={mapRegion.mapRef}
				initialRegion={mapRegion.initialRegion}
				onPanDrag={mapRegion.onMapGesture}
				onTouchStart={mapRegion.onMapGesture}
			>
				{/* Lista paradas de onibus no mapa */}
				{busStops.map((busStop, key) => (
					<Marker
						onPress={() => getNextVehiclesInThisPoint(busStop)}
						key={key}
						coordinate={{ latitude: busStop.latitude, longitude: busStop.longitude }}
						title={'Parada de Ônibus'}
					>
						<Image source={bus_stop} style={styles.busStopIcon} />
					</Marker>
				))}

				{/* Lista veiculos no mapa */}
				{realTimeVehicles.map((vehicle, key) => (
					<Marker
						onPress={() =>
							navigation.navigate('ListVehicleInfosPassenger', {
								registrationPlate: vehicle.registration_plate,
								uid: user.uid,
								status: vehicle.status,
							})
						}
						key={key}
						coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
						title={'Veículo'}
					>
						<Image source={bus_icon} style={styles.busIcon} />
					</Marker>
				))}

				{/* Pega minha posição no mapa */}
				{myPosition ? (
					<Marker coordinate={myPosition} title={'Minha localização!'}>
						<Image source={passenger_marker} style={styles.passengerIcon} />
					</Marker>
				) : null}
			</MapView>

			{loadError ? (
				<>
					<Feedback>Não foi possível carregar os veículos.</Feedback>
					<WideButton textButton="Tentar novamente" onPress={getVehiclesInfos} />
				</>
			) : (
				vehiclesByFirestore.length === 0 && <Feedback>Nenhum veículo vinculado.</Feedback>
			)}
			<WideButton textButton="Centralizar mapa" onPress={mapRegion.recenter} />
			<Menu
				onPressFirstButton={() => navigation.navigate('AddNewPrivateVehicle', { uid: user.uid })}
				textFirstButton={'Adicionar veículo privado'}
				onPressSecondButton={() => navigation.navigate('SettingsPassenger')}
				textSecondButton={'Configurações'}
			/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<NextVehicleOnThisPoint
					openOnMap={() => setModalVisible(!modalVisible)}
					vehiclesOnThisPoint={vehiclesOnThisPoint}
					time={timeToArriveVehicle}
				/>
			</Modal>
		</Screen>
	);
}
