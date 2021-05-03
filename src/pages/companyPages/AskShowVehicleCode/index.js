import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

export default function AskShowVehicleCode({ navigation, route }) {
	const { uid, vehicle } = route.params;

	return (
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>DIGITE AS INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.question}>DESEJA VISUALIZAR O CÓDIGO DO VEÍCULO?</Text>

				<View style={styles.buttons}>
					<View style={styles.button}>
						<TouchableOpacity
							onPress={() => navigation.navigate('ShowVehicleCode', { uid, vehicle })}
						>
							<Text style={styles.buttonText}>Sim</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.button}>
						<TouchableOpacity
							onPress={() => navigation.navigate('AskPointsVehicleWillPass', { uid, vehicle })}
						>
							<Text style={styles.buttonText}>Mais Tarde</Text>
						</TouchableOpacity>
					</View>
				</View>

				<Text style={styles.observation}>
					O código e senha do veículo são utilizados pelo motorista para logar no aplicativo e
					compartilhar sua localização
				</Text>
			</View>
		</View>
	);
}
