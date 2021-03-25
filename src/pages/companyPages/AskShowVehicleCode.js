import { Text, View, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { purple, white, orange, grey, black } from '../../styles/colors';

export default function AskShowVehicleCode({ navigation, route }) {
	// const { uid } = route.params;

	return(
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>DIGITE AS INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.question}>DESEJA VISUALIZAR O CÓDIGO DO VEÍCULO?</Text>

				<View style={styles.buttons}>
					<View style={styles.button}>
						<TouchableOpacity onPress={() => navigation.navigate("ShowVehicleCode")}>
							<Text style={styles.buttonText}>Sim</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.button}>
						<TouchableOpacity onPress={() => navigation.navigate("AskPointsVehicleWillPass")}>
							<Text style={styles.buttonText}>Mais Tarde</Text>
							</TouchableOpacity>
					</View>
				</View>

				<Text style={styles.observation}>O código e senha do veículo são utilizados pelo motorista para logar no aplicativo e compartilhar sua localização</Text>

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
		paddingTop: "11%",
		fontSize: 25,
		paddingLeft: "13%",
		paddingRight: "13%"
	},
	body: {
		width: "92%",
		height: "40%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "10%",
		paddingBottom: "10%",
		marginLeft: "4%",
		marginRight: "4%",
		marginTop: "40%"
	},
	question: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		fontSize: 24,
		paddingLeft: "8%",
		paddingRight: "8%",
		marginBottom: "2%"
	},
	buttons: {
		flexDirection: "row",
		marginLeft: "5%",
		height: "50%",
		width: "100%",
		marginBottom: "1%"
	},
	button: {
		borderRadius: 30,
		backgroundColor: orange,
		width: "35%",
		height: "50%",
		alignItems: "center",
		alignSelf: "center",
		marginLeft: "7%",
		paddingTop: "1%",
	},
	buttonText: {
		color: white,
		fontSize: 22,
		fontWeight: "bold",
		paddingTop: "5%",
	},
	observation: {
		color: white,
		fontSize: 16,
		textAlign: "center",
		paddingRight: "5%",
		paddingLeft: "5%",
		fontWeight: "bold"
	}
});
