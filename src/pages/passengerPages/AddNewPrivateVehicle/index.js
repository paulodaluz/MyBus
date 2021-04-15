import { Text, View, Button, TextInput, StyleSheet, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { addNewPrivateVehicle } from '../../../backend/users/Passenger';
import QRCodePng from '../../../assets/images/png/qr-code.png';
import { grey, purple, white } from '../../../styles/colors';
import { getVehicle } from '../../../backend/vehicles/Vehicle';

export default function AddNewPrivateVehicle({ navigation, route }) {
	const { uid } = route.params;
	const [ vehicleCode, setVehicleCode ] = useState("");

	const addNewVehicle = async () => {
		const vehicle = await getVehicle({idToPassengers: vehicleCode});
		if(!vehicle || vehicle.is_public === true) {
			return Alert.alert('Código do veículo inálido!');
		}
		await addNewPrivateVehicle(uid, vehicleCode);

		Alert.alert('Veículo adicionado com sucesso! Para visualizar volte ao mapa!');
		return cleanInputs();
	}

	const cleanInputs = async () => {
		setVehicleCode("");
	};

	return(
		<View style={styles.container}>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>Adicionar novo Veículo</Text>
				<Text style={styles.subTitle}>Adicione o código de um novo veículo para ver suas informações</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.paragraph}>Veículos Privados, que necessitam de um códdigo de acesso</Text>

				<View style={styles.inputVehicleCodeCountainer}>
					<View style={styles.containerVehicleCode}>
								<TextInput
										placeholder="Código de seu Veículo"
										style={vehicleCode.length > 0 ? {...styles.inputVehicleCode, fontSize: 40, textAlign: "center"} : {...styles.inputVehicleCode, fontSize: 18} }
										value={vehicleCode}
										onChangeText={text => setVehicleCode(text)}
								/>
						</View>

						<View style={styles.arroundScanQrCode}>
								<Image
										style={styles.qrCodePng}
										source={QRCodePng}
								/>
								<Text style={styles.scanQrCode}>Escanear QR-CODE</Text>
						</View>
				</View>

				<View style={styles.continueButton}>
					<Button
						onPress={addNewVehicle}
						color="#FFFFFF"
						title="Continuar"
					/>
				</View>

				<Text style={styles.observation}>Para visualizar o novo veículo você deve listar os veículos privados!</Text>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: white
	},
	boxTitle: {
		height: "26%",
		width: "100%",
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		color: white,
		fontWeight: "bold",
		fontSize: 44,
		paddingTop: "15%",
		paddingLeft: "6%"
	},
	subTitle: {
		color: white,
		fontSize: 20,
		paddingLeft: "6%",
		paddingRight: "40%",
		paddingTop: "2%"
	},
	body: {
		height: "100%",
		paddingTop: "13%"
	},
	paragraph: {
		fontSize: 20,
		color: grey,
		textAlign: "center"
	},
	inputVehicleCodeCountainer: {
		width: "100%",
		alignItems: "center",
		marginTop: "10%"
	},
	containerVehicleCode: {
		borderWidth: 1,
		borderColor: '#8492A6',
		backgroundColor: "transparent",
		width: "90%",
		height: 60,
	},
	inputVehicleCode: {
		height: "100%",
		paddingLeft: "2%"
	},
	arroundScanQrCode: {
		marginTop: "2%",
		flexDirection: "row",
		width: "90%",
	},
	qrCodePng: {
		display: "flex",
		width: 15,
		height: 15,
		maxWidth: 15,
		marginRight: "1%"
	},
	scanQrCode: {
		textDecorationLine: "underline",
		fontWeight: "bold",
		color: "#969FAA",
	},
	continueButton: {
		alignItems: "center",
		backgroundColor: purple,
		borderRadius: 14,
		width: '82%',
		height: "6%",
		paddingTop: "3%",
		marginTop: "16%",
		marginLeft: "9%",
		marginBottom: "3%"
	},
	observation: {
		paddingTop: "15%",
		paddingLeft: "13%",
		paddingRight: "13%",
		textAlign: "center",
		fontSize: 20,
		color: '#969FAA',
	},
});
