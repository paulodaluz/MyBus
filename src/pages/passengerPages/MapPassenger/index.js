import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapImage from '../../../assets/icons/png/map.png';
import { getVehiclesLocalization } from '../../../backend/map/CompanyMap';
import { getBusStopsLocalzations } from '../../../backend/map/PassengerMap';
import { getMyVehicles } from '../../../backend/vehicles/Vehicle';
import { Button } from '../../../components/Button';
import { darkGrey } from '../../../styles/colors';
import { styles } from './style';

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, setMyposition] = useState(null);
	const [busStops, setBusStops] = useState([]);
	const [completeVehiclesInfos, setCompleteVehiclesInfos] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.05,
		longitudeDelta: 0.05,
	});

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
		const myVehicles = await getMyVehicles(user.uid);
		const vehicleLocalizations = await getVehiclesLocalization(user.codes_private_vehicles);
		joinVehicleInfos(myVehicles, vehicleLocalizations);
	};

	const joinVehicleInfos = (vehicles, vehiclesLocalizations) => {
		let completeVehiclesInfosUser = [];

		vehiclesLocalizations.forEach((vehicleLocalization) => {
			let localization = vehicles.find(
				(vehicle) => vehicle.registration_plate === vehicleLocalization.registration_plate
			);
			const userVehicle = Object.assign(localization, vehicleLocalization);
			completeVehiclesInfosUser.push(userVehicle);
		});

		setCompleteVehiclesInfos(completeVehiclesInfosUser);
	};

	const getBusStops = async () => {
		setBusStops(await getBusStopsLocalzations(completeVehiclesInfos));
	};

	useEffect(() => {
		getMyPosition();
		getVehiclesInfos();
		getBusStops();
	}, []);

	return (
		<View style={styles.container}>
			<MapView
				onPress={(e) => {
					console.log(e.nativeEvent.coordinate);
				}}
				style={styles.mapStyle}
				initialRegion={localicaoAtual}
				region={localicaoAtual}
			>
				{completeVehiclesInfos.map((vehicle, key) => (
					<Marker
						onPress={() =>
							navigation.navigate('ListVehicleInfosPassenger', {
								registrationPlate: vehicle.registration_plate,
								uid: user.uid,
							})
						}
						key={key}
						coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
						title={vehicle.name}
						// image={}
					/>
				))}
				{busStops.map((busStop, key) => (
					<Marker
						onPress={() => setModalVisible(!modalVisible)}
						key={key}
						coordinate={{ latitude: busStop.latitude, longitude: busStop.longitude }}
						title={'Parada de Ônibus'}
						// image={}
					/>
				))}

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
