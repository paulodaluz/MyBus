import Clipboard from 'expo-clipboard';
import React from 'react';
import { Text, View } from 'react-native';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { Header } from './Header';
import { InformationField } from './InformationField';
import { styles } from './style';

export default function ShowVehicleCode({ navigation, route }) {
	const { uid, vehicle } = route.params;

	const copyToClipboard = (text) => {
		Clipboard.setString(text);
	};

	return (
		<View>
			<Header title={'INFORMAÇÕES DO\nVEICULO'} />

			<View style={styles.body}>
				<Text style={styles.subTitle}>DADOS PARA CONTROLE DO VEÍCULO</Text>

				<InformationField
					fieldName={'LOGIN:'}
					info={vehicle.registration_plate}
					onPress={() => copyToClipboard(vehicle.registration_plate)}
				/>

				<InformationField
					fieldName={'SENHA:'}
					info={vehicle.password_to_share_localization}
					onPress={() => copyToClipboard(vehicle.password_to_share_localization)}
				/>

				<View style={styles.button}>
					<WideButton
						onPress={() => navigation.navigate('AskPointsVehicleWillPass', { uid, vehicle })}
						textButton={'Continuar'}
						backgroundColor={darkGrey}
					/>
				</View>
			</View>
		</View>
	);
}
