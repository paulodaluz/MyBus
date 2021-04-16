import * as Location from 'expo-location';
import * as firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapImage from '../../../assets/icons/png/map.png';
import { getBusStopsLocalzations } from '../../../backend/map/PassengerMap';
import { getMyVehicles } from '../../../backend/vehicles/Vehicle';
import { Button } from '../../../components/Button';
import { darkGrey } from '../../../styles/colors';
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
		getMyPosition();
		getVehiclesInfos();
		getBusStops();
		getAllLocalizationVehicles();
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

			<View style={styles.menu}>
				<TouchableOpacity
					onPress={() => navigation.navigate('AddNewPrivateVehicle', { uid: user.uid })}
					style={styles.addVehicleButton}
				>
					<Text style={styles.buttonText}>Adicionar veículo privado</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => navigation.navigate('SettingsPassenger')}
					style={styles.configButton}
				>
					<Text style={styles.buttonText}>Configurações</Text>
				</TouchableOpacity>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.containerModal}>
					<View style={styles.containerTitleModal}>
						<Image style={{ height: 35, width: 35, marginRight: '3%' }} source={MapImage} />
						<Text style={styles.titleModal}>Próximos veículos neste ponto</Text>
					</View>
					<View style={styles.itemModal}>
						<Text style={styles.textVehicleModal}>L01 - Vera Cruz - São Cristóvão</Text>
						{/* <Image
							style={{ height: 35, width: 35, marginRight: '3%'}}
							source={icon_clock}
						/> */}
						<Text style={styles.textVehicleModal}>12 min</Text>
					</View>
					<View style={styles.divisor} />
					<View style={styles.itemModal}>
						<Text style={styles.textVehicleModal}>L12 - Santa Marta - São Cristóvão</Text>
						{/* <Image
							style={{ height: 35, width: 35, marginRight: '3%'}}
							source={icon_clock}
						/> */}
						<Text style={styles.textVehicleModal}>15 min</Text>
					</View>
					<View style={styles.divisor} />
					<View style={styles.itemModal}>
						<Text style={styles.textVehicleModal}>L04 - Jerônimo Coelho - IMED</Text>
						{/* <Image
							style={{ height: 35, width: 35, marginRight: '3%'}}
							source={icon_clock}
						/> */}
						<Text style={styles.textVehicleModal}>48 min</Text>
					</View>
					<View style={styles.divisor} />

					<View style={styles.buttonModal}>
						<Button
							onPress={() => setModalVisible(!modalVisible)}
							backgroundColor={darkGrey}
							textButton={'Acompanhar no mapa!'}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}
