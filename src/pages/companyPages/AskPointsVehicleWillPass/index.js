import React from 'react';
import { Text, View } from 'react-native';
import { MiddleButton } from '../../../components/MiddleButton';
import { orange } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';

export default function AskPointsVehicleWillPass({ navigation, route }) {
	const { uid, vehicle } = route.params;

	return (
		<View>
			<Header title={'INFORMAÇÕES DO\nVEÍCULO'} />

			<View style={styles.body}>
				<Text style={styles.subtitle}>DESEJA SELECIONAR ONDE O VEÍCULO IRÁ PASSAR?</Text>

				<View style={styles.buttons}>
					<View style={styles.button}>
						<MiddleButton
							onPress={() => navigation.navigate('ChoicePointsVehicleWillPass', { uid, vehicle })}
							textButton={'Sim'}
							backgroundColor={orange}
						/>
					</View>

					<View style={styles.button}>
						<MiddleButton
							onPress={() =>
								navigation.navigate('ListVehicleInfosCompany', { uid, receivedVehicle: vehicle })
							}
							textButton={'Mais Tarde'}
							backgroundColor={orange}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}
