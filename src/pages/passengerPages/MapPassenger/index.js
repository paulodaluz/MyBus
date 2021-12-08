import * as Location from 'expo-location';
import * as firebase from 'firebase';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Modal, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import bus_icon from '../../../assets/icons/png/map/bus_icon.png';
import bus_stop from '../../../assets/icons/png/map/bus_stop.png';
import passenger_marker from '../../../assets/icons/png/map/passenger_marker.png';
import { calculateTime } from '../../../backend/utils/Utils';
import { Menu } from '../../../components/Menu';
import { getVehiclesInfos } from '../../../service/VehicleService';
import { NextVehicleOnThisPoint } from './NextVehicleOnThisPoint';
import { styles } from './style';

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, setMyposition] = useState(null);
	const [busStops, setBusStops] = useState([]);

	const [realTimeVehicles, setRealTimeVehicles] = useState([]);
	const [vehiclesFromUser, setVehiclesFromUser] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [vehiclesOnThisPoint, setVehiclesOnThisPoint] = useState(false);

	const [timeToArriveVehicle, setTimeToArriveVehicle] = useState(0);

	const initialLocalization = {
		latitude: -28.266279824325082,
		longitude: -52.416200595066597,
		latitudeDelta: 0.02,
		longitudeDelta: 0.02,
	};

	const getMyPosition = async () => {
		let { status } = await Location.requestPermissionsAsync();

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
	};

	const getVehiclesData = async () => {
		const vehicles = await getVehiclesInfos(user.linkedVehicles);
		setVehiclesFromUser(vehicles);

		const busStations = [];

		vehicles.forEach((vehicle) => {
			vehicle.busStations.forEach((station) => {
				Object.assign(station, { registrationPlate: vehicle.registrationPlate });
				busStations.push(station);
			});
		});
		setBusStops(busStations);
	};

	const getRealtimeLocalizationVehicles = async () => {
		firebase
			.database()
			.ref('/real_time_database')
			.on('value', (snapchot) => {
				let allLocalizations = snapchot.val();
				if (allLocalizations) {
					buildDadosVehicles(allLocalizations, user.linkedVehicles);
				}
			});
	};

	const buildDadosVehicles = async (allLocalizations, vehiclesPlate) => {
		const myVehicles = [];

		vehiclesPlate.forEach((vehiclePlate) => {
			for (let index in allLocalizations) {
				if (allLocalizations[index][vehiclePlate]) {
					let vehicle = {
						registration_plate: vehiclePlate,
						...allLocalizations[index][vehiclePlate],
					};
					myVehicles.push(vehicle);
				}
			}
		});
		setRealTimeVehicles(myVehicles);
	};

	const getNextVehiclesInThisPoint = (busStop) => {
		setModalVisible(!modalVisible);

		const vehiclesInThisPoint = vehiclesFromUser.find(
			(vehicle) => vehicle.registrationPlate === busStop.registrationPlate
		);

		const localizationVehicle = realTimeVehicles.find(
			(realTimeVehicle) => realTimeVehicle.registration_plate === busStop.vehicle_plate
		);

		if (localizationVehicle) {
			const time = calculateTime(
				busStop.latitude,
				busStop.longitude,
				localizationVehicle.latitude,
				localizationVehicle.longitude
			);

			setTimeToArriveVehicle(time);
		}

		if (!localizationVehicle) {
			setTimeToArriveVehicle(0);
		}

		setVehiclesOnThisPoint(vehiclesInThisPoint);
	};

	useLayoutEffect(() => {
		getVehiclesData();
		getRealtimeLocalizationVehicles();
		getMyPosition();
	}, []);

	useEffect(() => {}, [myPosition, busStops]);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				initialRegion={initialLocalization}
				region={initialLocalization}
			>
				{/* Lista paradas de onibus no mapa */}
				{busStops.map((busStop, key) => (
					<Marker
						onPress={() => getNextVehiclesInThisPoint(busStop)}
						key={key}
						coordinate={{ latitude: busStop.latitude, longitude: busStop.longitude }}
						title={'Parada de Ônibus'}
					>
						<Image source={bus_stop} style={{ height: 40, width: 40 }} />
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
						<Image source={bus_icon} style={{ height: 30, width: 30 }} />
					</Marker>
				))}

				{/* Pega minha posição no mapa */}
				{myPosition ? (
					<Marker coordinate={myPosition} title={'Minha localização!'}>
						<Image source={passenger_marker} style={{ height: 50, width: 50 }} />
					</Marker>
				) : null}
			</MapView>

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
		</View>
	);
}
