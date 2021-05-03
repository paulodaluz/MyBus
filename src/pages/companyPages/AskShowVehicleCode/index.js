import React from 'react';
import { Text, View } from 'react-native';
import { MiddleButton } from '../../../components/MiddleButton';
import { orange } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';

export default function AskShowVehicleCode({ navigation, route }) {
	const { uid, vehicle } = route.params;

	return (
		<View>
			<Header title={'DIGITE AS INFORMAÇÕES\nDO VEICULO'} />

			<View style={styles.body}>
				<Text style={styles.subtitle}>DESEJA VISUALIZAR O CÓDIGO DO VEÍCULO?</Text>

				<View style={styles.buttons}>
					<View style={styles.button}>
						<MiddleButton
							onPress={() => navigation.navigate('ShowVehicleCode', { uid, vehicle })}
							textButton={'Sim'}
							backgroundColor={orange}
						/>
					</View>

					<View style={styles.button}>
						<MiddleButton
							onPress={() => navigation.navigate('AskPointsVehicleWillPass', { uid, vehicle })}
							textButton={'Mais Tarde'}
							backgroundColor={orange}
						/>
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
