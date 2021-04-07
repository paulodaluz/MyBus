import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Clipboard from 'expo-clipboard';

import { purple, white, grey } from '../../styles/colors';

export default function ShowVehicleCode({ navigation, route }) {
	const { uid, vehicle } = route.params;

	const copyToClipboard = (text) => {
    Clipboard.setString(text);
  }

	return(
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.subTitle}>DADOS PARA CONTROLE DO VEÍCULO</Text>

				<TouchableOpacity style={styles.input} onPress={() => copyToClipboard(vehicle.plateId)}>
					<Text style={styles.inputText}>{vehicle.plateId}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.input} onPress={() => copyToClipboard(vehicle.password)}>
					<Text style={styles.inputText}>{vehicle.password}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AskPointsVehicleWillPass', { uid, vehicle })}>
					<Text style={styles.buttonText}>Continuar</Text>
				</TouchableOpacity>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	boxTitle: {
		width: "100%",
		backgroundColor: purple,
		height: "18%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: "6%"
	},
	title: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		paddingTop: "13%",
		fontSize: 25,
		paddingLeft: "13%",
		paddingRight: "13%"
	},
	body: {
		width: "92%",
		height: "50%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "10%",
		paddingBottom: "10%",
		marginLeft: "4%",
		marginRight: "4%",
		marginTop: "30%",
		alignItems: "center"
	},
	subTitle: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		fontSize: 24,
		paddingLeft: "8%",
		paddingRight: "8%",
	},
	input: {
		backgroundColor: white,
		width: "82%",
		height: "20%",
		marginTop: "6%"
	},
	inputText: {
		color: grey,
		fontSize: 20,
		paddingLeft: "5%",
		fontWeight: "bold",
		paddingTop: "6%",
	},
	buttonText: {
		color: white,
		fontSize: 22,
		fontWeight: "bold",
		paddingTop: "6%",
	},
	button: {
		marginTop: "5%",
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "22%",
    width: '85%',
    alignItems: 'center',
	},
});
