import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { purple, white } from '../../../styles/colors';
import bus_icon from '../../../assets/images/png/bus_icon.png';
import { getVehiclesInfos, getVehiclesLocalization } from '../../../backend/map/CompanyMap';

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
		let localizationWithVehicle = await getVehiclesLocalization(vehiclesWithoutlocalization)
		setCompleteVehicles(localizationWithVehicle);
		// setTimeout(
		// 	function() {
		// 		getLocalizationRealTime()
		// 	}, 35000);
	}

	useEffect(() => {

		async function getData() {
			let vehicleInfos = await getVehiclesInfos(user.linked_vehicles);
			setVehiclesWithoutlocalization(vehicleInfos);
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
			<View style={styles.menu}>

			<TouchableOpacity onPress={() => navigation.navigate('CreateNewVehicle', { uid: user.uid })}
					style={styles.addVehicleButton}>
						<Text style={styles.buttonText}>CADASTRAR NOVO VEÍCULO</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('SettingsCompany')}
					style={styles.configButton}>
						<Text style={styles.buttonText}>CONFIGURAÇÕES</Text>
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
