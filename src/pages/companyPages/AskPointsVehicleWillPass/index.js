import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

export default function AskPointsVehicleWillPass({ navigation, route }) {
	const { uid, vehicle } = route.params;

	return (
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.question}>
					deseja selecionar os pontos por onde o veiculo ira passar?
				</Text>

				<View style={styles.buttons}>
					<View style={styles.button}>
						<TouchableOpacity
							onPress={() => navigation.navigate('ChoicePointsVehicleWillPass', { uid, vehicle })}
						>
							<Text style={styles.buttonText}>Sim</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.button}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('ListVehicleInfosCompany', { uid, receivedVehicle: vehicle })
							}
						>
							<Text style={styles.buttonText}>Mais Tarde</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}
