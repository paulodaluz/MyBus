import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { purple, white } from '../styles/colors';

export default function Map({ navigation, route }) {
	const typeUserPage = 'passenger'; // company passenger
	const [myPosition, seMyposition] = useState(null)
	const [localizacoes, setLocalizacoes] = useState([])

	const [localicaoAtual, setLocalicaoAtual] = useState({
			latitude: -28.2612,
			longitude: -52.4083,
			latitudeDelta: 0.050,
			longitudeDelta: 0.050,
	})

	const getMyPosition = async () => {
		let { status } = await Location.requestPermissionsAsync()

		if (status !== "granted") {
				Alert.alert("Permissão de acesso a localização negado!")
		} else {
				await Location.getCurrentPositionAsync({})
					.then(retorno => seMyposition(retorno.coords))
					.catch(error => Alert.alert("Erro ao acessar o GPS!"))
		}
	}
		useEffect(() => {
			getMyPosition()
		}, [])

    return (
			<View style={styles.container}>
				<MapView onPress={(e) => {console.log(e.nativeEvent.coordinate)}} style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
					{
						localizacoes.map((item, key) => <Marker
									key={key}
									coordinate={item}
									title={item.nome}
							/>)
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

					<TouchableOpacity onPress={() => typeUserPage === 'passenger' ? navigation.navigate('SettingsPassenger') : navigation.navigate('SettingsCompany')}
						style={styles.configButton}>
							<Text style={styles.buttonText}>CONFIGURAÇÕES</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => typeUserPage === 'passenger' ? navigation.navigate('AddNewPrivateVehicle') : navigation.navigate('CreateNewVehicle')}
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
