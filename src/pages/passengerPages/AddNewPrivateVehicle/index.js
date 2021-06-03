import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { addNewPrivateVehicle } from '../../../backend/users/Passenger';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { Input } from '../../../components/Input';
import { QRCode } from '../../../components/QRCode';
import { WideButton } from '../../../components/WideButton';
import { purple } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';

export default function AddNewPrivateVehicle({ route }) {
	const { uid } = route.params;
	const [vehicleCode, setVehicleCode] = useState('');

	const addNewVehicle = async () => {
		const vehicle = await getVehicle({ idToPassengers: vehicleCode });
		if (!vehicle || vehicle.is_public === true) {
			return Alert.alert('Código do veículo inálido!');
		}
		await addNewPrivateVehicle(uid, vehicle.registration_plate);

		Alert.alert('Veículo adicionado com sucesso! Para visualizar volte ao mapa!');
		return cleanInputs();
	};

	const cleanInputs = async () => {
		setVehicleCode('');
	};

	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.body}>
				<Text style={styles.message}>
					Veículos Privados, que necessitam de um códdigo de acesso
				</Text>

				<View style={styles.containerInputCode}>
					<View style={styles.inputText}>
						<Input
							placeholder="Código de seu Veículo"
							value={vehicleCode}
							onChangeText={(text) => setVehicleCode(text)}
						/>
					</View>

					<View style={styles.qrcode}>
						<QRCode />
					</View>
				</View>

				<View style={styles.button}>
					<WideButton onPress={addNewVehicle} textButton={'Continuar'} backgroundColor={purple} />
				</View>

				<Text style={styles.message}>
					Para visualizar o novo veículo você deve listar os veículos privados!
				</Text>
			</View>
		</View>
	);
}
