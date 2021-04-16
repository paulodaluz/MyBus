import * as Location from 'expo-location';
import * as firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getBusStopsLocalzations } from '../../../backend/map/PassengerMap';
import { getMyVehicles } from '../../../backend/vehicles/Vehicle';
import { Menu } from '../../../components/Menu';
import { NextVehicleOnThisPoint } from './NextVehicleOnThisPoint';
import { styles } from './style';

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, setMyposition] = useState(null);
	const [busStops, setBusStops] = useState([]);

	const [realTimeVehicles, setRealTimeVehicles] = useState([]);
	const [vehiclesByFirestore, setVehiclesByFirestore] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);

	const initialLocalization = {
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.05,
		longitudeDelta: 0.05,
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

	const getVehiclesInfos = async () => {
		const vehiclesFirestore = await getMyVehicles(user.uid);
		setVehiclesByFirestore(vehiclesFirestore);
	};

	const getBusStops = async () => {
		const busStopsLocalzations = await getBusStopsLocalzations(vehiclesByFirestore);
		setBusStops(busStopsLocalzations);
	};

	const getAllLocalizationVehicles = async () => {
		firebase
			.database()
			.ref('/real_time_database')
			.on('value', (snapchot) => {
				let allLocalizations = snapchot.val();
				if (allLocalizations) {
					buildDadosVehicles(allLocalizations, user.codes_private_vehicles);
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

	useEffect(() => {
		getVehiclesInfos();
		getBusStops();
		getAllLocalizationVehicles();
		getMyPosition();
	}, []);

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
						onPress={() => setModalVisible(!modalVisible)}
						key={key}
						coordinate={{ latitude: busStop.latitude, longitude: busStop.longitude }}
						title={'Parada de Ônibus'}
						// image={}
					/>
				))}

				{/* Lista veiculos no mapa */}
				{realTimeVehicles.map((vehicle, key) => (
					<Marker
						onPress={() =>
							navigation.navigate('ListVehicleInfosPassenger', {
								registrationPlate: vehicle.registration_plate,
								uid: user.uid,
							})
						}
						key={key}
						coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
						title={vehicle.registration_plate}
						// image={}
					/>
				))}

				{/* Pega minha posição no mapa */}
				{myPosition ? (
					<Marker
						coordinate={myPosition}
						title={'Onde eu estou!'}
						// image={}
					/>
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
				<NextVehicleOnThisPoint openOnMap={() => setModalVisible(!modalVisible)} />
			</Modal>
		</View>
	);
}
