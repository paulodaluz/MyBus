import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { purple, white } from '../../styles/colors';
import { getVehiclesLocalization } from '../../backend/map/CompanyMap';
import { getMyVehicles } from '../../backend/vehicles/Vehicle';
import { getBusStopsLocalzations } from '../../backend/map/PassengerMap';

export default function MapPassenger({ navigation, route }) {
	const { user } = route.params;

	const [myPosition, setMyposition] = useState(null);
	const [busStops, setBusStops] = useState([]);
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
						onPress={() => navigation.navigate('ListVehicleInfosPassenger', { registrationPlate: vehicle.vehicle.registration_plate, uid: user.uid })}
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
	}
})
