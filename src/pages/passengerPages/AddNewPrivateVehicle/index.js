import { Text, View, Button, TextInput, StyleSheet, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { addNewPrivateVehicle } from '../../../backend/users/Passenger';
import QRCodePng from '../../../assets/images/png/qr-code.png';
import { grey, purple, white } from '../../../styles/colors';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { styles } from './style';

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
						color={white}
						title="Continuar"
					/>
				</View>

				<Text style={styles.observation}>Para visualizar o novo veículo você deve listar os veículos privados!</Text>
			</View>

		</View>
	)
}
