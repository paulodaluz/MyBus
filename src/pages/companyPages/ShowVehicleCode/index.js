import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Clipboard from 'expo-clipboard';
import { styles } from './style';

export default function ShowVehicleCode({ navigation, route }) {
	const { uid, vehicle } = route.params;

	const copyToClipboard = (text) => {
		Clipboard.setString(text);
	};

	return (
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

				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('AskPointsVehicleWillPass', { uid, vehicle })}
				>
					<Text style={styles.buttonText}>Continuar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
