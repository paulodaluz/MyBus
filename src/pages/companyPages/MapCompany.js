import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { purple, white } from '../../styles/colors';
import bus_icon from '../../assets/images/png/bus_icon.png';
import { getVehiclesInfos, getVehiclesLocalization } from '../../backend/map/CompanyMap';

export default function MapCompany({ navigation, route }) {
	const { user } = route.params;

	const [completeVehicles, setCompleteVehicles] = useState([]);
	const [vehiclesWithoutlocalization, setVehiclesWithoutlocalization] = useState([]);

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -18.2612,
		longitude: -50.4083,
		latitudeDelta: 25,
		longitudeDelta: 25,
	})

	async function getLocalizationRealTime() {
		let localizationWithVehicle = await getVehiclesLocalization(user.uid, vehiclesWithoutlocalization)
		setCompleteVehicles(localizationWithVehicle);
		// setTimeout(
		// 	function() {
		// 		getLocalizationRealTime()
		// 	}, 35000);
	}

	useEffect(() => {

		async function getData() {
			let vehicleInfos = await getVehiclesInfos(user.linked_vehicles);
			setVehiclesWithoutlocalization(vehicleInfos)
			await getLocalizationRealTime();
		}

		getData();

	}, [])

	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
				{
					completeVehicles.map((item) =>
						<Marker
							key={item.registration_plate}
							coordinate={item.coordinate}
							title={item.name}
							// image={bus_icon}
						/>
					)
				}
			</MapView>
			<View style={styles.buttons}>

				<TouchableOpacity onPress={() => navigation.navigate('SettingsCompany')}
					style={styles.configButton}>
						<Text style={styles.buttonText}>CONFIGURAÇÕES</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('CreateNewVehicle', { uid: user.uid })}
					style={styles.addVehicleButton}>
						<Text style={styles.buttonText}>CADASTRAR NOVO VEÍCULO</Text>
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
