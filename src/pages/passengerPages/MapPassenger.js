import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, TouchableOpacity, Modal, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { darkGrey, purple, white } from '../../styles/colors';
import { getVehiclesLocalization } from '../../backend/map/CompanyMap';
import { getMyVehicles } from '../../backend/vehicles/Vehicle';
import { getBusStopsLocalzations } from '../../backend/map/PassengerMap';
import { Button } from '../../components/Button';
import MapImage from '../../assets/icons/png/map.png'

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, setMyposition] = useState(null);
	const [busStops, setBusStops] = useState([]);
	const [completeVehiclesInfos, setCompleteVehiclesInfos] = useState([]);
	const [modalVisible, setModalVisible] = useState(true);

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.050,
		longitudeDelta: 0.050,
	})

	const getMyPosition = async () => {
		let { status } = await Location.requestPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permissão de acesso a localização negado!");
		} else {
			await Location.getCurrentPositionAsync({})
				.then(retorno => setMyposition(retorno.coords))
				.catch(error => {
					console.log(`MapDriverPage - getMyPosition - ERROR = ${error}`)
					Alert.alert("Erro ao acessar o GPS!")
				});
		}
	}

	const getVehiclesInfos = async () => {
		const myVehicles = await getMyVehicles(user.uid);
		const vehicleLocalizations = await getVehiclesLocalization(user.codes_private_vehicles);
		joinVehicleInfos(myVehicles, vehicleLocalizations);
	}

	const joinVehicleInfos = (vehicles, vehiclesLocalizations) => {
		let completeVehiclesInfosUser = [];

		vehiclesLocalizations.forEach(vehicleLocalization => {
			let localization = vehicles.find(vehicle => vehicle.registration_plate === vehicleLocalization.registration_plate)
			const userVehicle = Object.assign(localization, vehicleLocalization);
			completeVehiclesInfosUser.push(userVehicle)
		})

		setCompleteVehiclesInfos(completeVehiclesInfosUser);
	}

	const getBusStops = async () => {
		setBusStops(await getBusStopsLocalzations(completeVehiclesInfos));
	}

	useEffect(() => {
		getMyPosition();
		getVehiclesInfos();
		getBusStops();
	}, [])

	return (
		<View style={styles.container}>
			<MapView onPress={(e) => {console.log(e.nativeEvent.coordinate)}} style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
				{
					completeVehiclesInfos.map((vehicle, key) =>
						<Marker
							onPress={() => navigation.navigate('ListVehicleInfosPassenger', { registrationPlate: vehicle.registration_plate, uid: user.uid })}
							key={key}
							coordinate={{latitude: vehicle.latitude, longitude: vehicle.longitude}}
							title={vehicle.name}
							// image={}
						/>
					)
				}
				{
					busStops.map((busStop, key) =>
						<Marker
							onPress={() => setModalVisible(!modalVisible)}
							key={key}
							coordinate={{latitude: busStop.latitude, longitude: busStop.longitude}}
							title={'Parada de Ônibus'}
							// image={}
						/>
					)
				}

				{myPosition ?
				<Marker
						coordinate={myPosition}
						title={"Onde eu estou!"}
						// image={}
					/>

					: null
				}
			</MapView>
			<View style={styles.menu}>

				<TouchableOpacity onPress={() => navigation.navigate('AddNewPrivateVehicle', { uid: user.uid })}
					style={styles.addVehicleButton}>
						<Text style={styles.buttonText}>Adicionar veículo privado</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('SettingsPassenger')}
					style={styles.configButton}>
						<Text style={styles.buttonText}>Configurações</Text>
				</TouchableOpacity>

			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.containerModal}>
					<View style={styles.containerTitleModal}>
						<Image
							style={{ height: 35, width: 35, marginRight: '3%'}}
							source={MapImage}
						/>
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
					<View style={styles.divisor}></View>
					<View style={styles.itemModal}>
						<Text style={styles.textVehicleModal}>L12 - Santa Marta - São Cristóvão</Text>
						{/* <Image
							style={{ height: 35, width: 35, marginRight: '3%'}}
							source={icon_clock}
						/> */}
						<Text style={styles.textVehicleModal}>15 min</Text>
					</View>
					<View style={styles.divisor}></View>
					<View style={styles.itemModal}>
						<Text style={styles.textVehicleModal}>L04 - Jerônimo Coelho - IMED</Text>
						{/* <Image
							style={{ height: 35, width: 35, marginRight: '3%'}}
							source={icon_clock}
						/> */}
						<Text style={styles.textVehicleModal}>48 min</Text>
					</View>
					<View style={styles.divisor}></View>

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: "90%"
	},
	menu: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: '4%'
  },
	addVehicleButton: {
		width: "50%",
		height: "100%",
		alignItems: "center",
		flex: 1,
		justifyContent: 'center',
		paddingLeft: '3%'
	},
	configButton: {
		width: "50%",
		height: "100%",
		alignItems: "center",
		flex: 1,
		justifyContent: 'center',
		paddingRight: '3%'
	},
	buttonText: {
		color: white,
		fontWeight: "bold",
		fontSize: 17,
		textAlign: 'center'
	},
	containerTitleModal: {
		flexDirection: 'row'
	},
	containerModal: {
		width: "92%",
		height: "34%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: '3%',
		paddingLeft: "8%",
		paddingRight: "8%",
		marginTop: '40%',
		marginLeft: "4%",
		marginRight: "4%",
	},
	titleModal: {
		fontSize: 19,
		fontWeight: 'bold',
		color: white,
		marginBottom: '8%',
		marginTop: '3%'
	},
	itemModal: {
		flexDirection: 'row',
		width: "100%",
	},
	textVehicleModal: {
		fontSize: 16,
		fontWeight: 'bold',
		color: white,
		marginRight: '2%'
	},
	divisor: {
    height: 1,
    backgroundColor: '#A39BBD',
		marginTop: '4%',
		marginBottom: '2%',
	},
	buttonModal: {
		height: '20%',
		width: '85%',
		alignSelf: 'center',
		marginTop: '8%'
	},

})
