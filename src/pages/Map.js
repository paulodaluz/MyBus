import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function Map({ navigation, route }) {
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
				<MapView style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
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
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
})
