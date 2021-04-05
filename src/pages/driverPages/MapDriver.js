import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { grey, purple, white } from '../../styles/colors';
import { sendLocalizationToFirebase } from '../../backend/map/DriverMap';
import { TouchableOpacity } from 'react-native-gesture-handler';
import bus_icon from '../../assets/images/png/bus_icon.png';

export default function MapDriver({ navigation, route }) {
	const { company, vehicle, vehicleFunctions } = route.params;

	const [modalVisible, setModalVisible] = useState(false);
	const [myPosition, setMyposition] = useState(null);
	const [sharingLocalization, setSharingLocalization] = useState(false);
	const [vehicleStatus, setVehicleStatus] = useState('Operando normalmente');

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.050,
		longitudeDelta: 0.050,
	})

	const sendMyLocalization = async () => {
		let accessDatabase = {companyUid: company.uid, vehiclePlate: vehicle.registration_plate};
		let infosVehicle = {latitude: myPosition.latitude, longitude: myPosition.longitude, status: vehicleStatus};

		sendLocalizationToFirebase(accessDatabase, infosVehicle);
		setSharingLocalization(true);
	}

	const stopSendMyLocalization = async () => {
		setSharingLocalization(false);
	}

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

	const listVehicleInformations = async () => {
		setModalVisible(true);
	}

	useEffect(() => {
		getMyPosition()
	}, [])

	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
				{
					sharingLocalization ?
					<View style={styles.sharingLocalization}>
						<Text style={styles.sharingLocalizationText}>Compartilhando a localização...</Text>
					</View>
					: null
				}
				{myPosition ?
				<Marker
						coordinate={myPosition}
						title={"Onde eu estou!"}
						// image={orangeMarkerImg}
					/>
					: null
				}
			</MapView>
			<View style={styles.menu}>
				<TouchableOpacity style={styles.button} onPress={() => sendMyLocalization()}>
					{/* <Image
						style={{ height: 60, width: 60 }}
						source={}
					/> */}
					<Text style={styles.buttonText}>Compartilhar localização</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.mainButton} onPress={() => console.log()}>
					<Image
						style={{ height: 60, width: 60 }}
						source={bus_icon}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettingsDriver', { uid: company.uid, registration_Plate: vehicle.registration_plate })}>
					<Text style={styles.buttonText}>Configurações</Text>
				</TouchableOpacity>
			</View>
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
	sharingLocalization: {
		backgroundColor: purple,
		width: '100%',
		height: '10%',
		resizeMode: 'cover',
	},
	sharingLocalizationText: {
		color: white,
		textAlign: 'center',
		paddingTop: '10%',
		fontWeight: "bold",
		fontSize: 20
	},
	menu: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: "row",
		alignItems: "center",
	},
	mainButton: {
		backgroundColor: '#9800FF',
		borderRadius: 100,
		width: '130%',
		height: '88%',
	},
	button: {
		width: '99%',
		marginLeft: '7%',
		marginRight: '7%'
	},
	buttonText: {
		color: '#47525E',
		fontWeight: "bold",
		fontSize: 12,
		textAlign: "center"
	}
})
