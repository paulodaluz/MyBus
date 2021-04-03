import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { purple, white } from '../../styles/colors';
import { sendLocalizationToFirebase } from '../../backend/map/DriverMap';

export default function MapDriver({ navigation, route }) {
	const { company, vehicle, vehicleFunctions } = route.params;

	const [myPosition, seMyposition] = useState(null);
	const [status, setStatus] = useState('Operando normalmente');

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.050,
		longitudeDelta: 0.050,
	})

	const sendMyLocalization = async () => {
		let accessDatabase = {companyUid: company.uid, vehiclePlate: vehicle.registration_plate};
		let infosVehicle = {latitude: myPosition.latitude, longitude: myPosition.longitude, status};

		sendLocalizationToFirebase(accessDatabase, infosVehicle);
	}

	const getMyPosition = async () => {
		let { status } = await Location.requestPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permissão de acesso a localização negado!");
		} else {
			await Location.getCurrentPositionAsync({})
				.then(retorno => seMyposition(retorno.coords))
				.catch(error => Alert.alert("Erro ao acessar o GPS!"));
		}
	}

	useEffect(() => {
		getMyPosition()
	}, [])

	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
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
				<Button
					onPress={sendMyLocalization}
					color="black"
					title="Compartilhar localização"
				/>
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

	}
})
