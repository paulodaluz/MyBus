import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { purple, white } from '../../styles/colors';
import { getVehiclesLocalization } from '../../backend/map/CompanyMap';
import { getMyVehicles } from '../../backend/vehicles/Vehicle';

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, seMyposition] = useState(null);
	const [completeVehiclesInfos, setCompleteVehiclesInfos] = useState([]);

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
				.then(retorno => seMyposition(retorno.coords))
				.catch(error => {
					console.log(`MapDriverPage - getMyPosition - ERROR = ${error}`)
					Alert.alert("Erro ao acessar o GPS!")
				});
		}
	}

	const getData = async () => {
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

	useEffect(() => {
		getMyPosition();
		getData();
	}, [])

	return (
		<View style={styles.container}>
			<MapView onPress={(e) => {console.log(e.nativeEvent.coordinate)}} style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
				{
					completeVehiclesInfos.map((vehicle, key) =>
						<Marker
						onPress={() => navigation.navigate('ListVehicleInfosPassenger', { registrationPlate: vehicle.vehicle.registration_plate, uid: user.uid })}
							key={key}
							coordinate={{latitude: vehicle.latitude, longitude: vehicle.longitude}}
							title={vehicle.name}
						/>
					)
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
			<View style={styles.buttons}>

				<TouchableOpacity onPress={() => navigation.navigate('SettingsPassenger')}
					style={styles.configButton}>
						<Text style={styles.buttonText}>Configurações</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('AddNewPrivateVehicle', { uid: user.uid })}
					style={styles.addVehicleButton}>
						<Text style={styles.buttonText}>Adicionar veiculo privado</Text>
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
	buttons: {
		flexDirection: "row",
    width: '100%',
		height: "7%"
  },
	addVehicleButton: {
		marginRight: "10%",
		width: "60%",
		height: "60%",
		paddingTop: "2%",
		alignItems: "center",
		borderRadius: 30,
		backgroundColor: purple,
	},
	configButton: {
		width: "40%",
		height: "60%",
		alignItems: "center",
		paddingTop: "2%",
		borderRadius: 30,
		backgroundColor: purple,
	},
	buttonText: {
		color: white,
		fontWeight: "bold",
		fontSize: 17
	}
})
