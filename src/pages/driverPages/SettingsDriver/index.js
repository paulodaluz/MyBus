import React from 'react';
import { Linking, View } from 'react-native';
import { removeSession } from '../../../backend/Login';
import { Header } from '../../../components/Header';
import { OptionConfig } from '../../../components/OptionConfig';
import { styles } from './style';

export default function SettingsDriver({ navigation, route }) {
	const { uid, registration_Plate } = route.params;

	const logout = async () => {
		await removeSession();
		navigation.navigate('InitialPage');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Configurações'} />
			</View>

			<View style={styles.listOfOptions}>
				<View style={styles.groupedCategories}>
					<OptionConfig
						textButton={'Feedbacks recebidos'}
						onPress={() => navigation.navigate('ReceivedFeedbacks', { uid })}
					/>
				</View>

				<View style={styles.groupedCategories}>
					<OptionConfig
						textButton={'Editar informações do veículo'}
						onPress={() =>
							navigation.navigate('EditVehicle', {
								uid,
								registration_Plate,
								backPage: 'SettingsDriver',
								params: { uid, registration_Plate },
							})
						}
					/>
				</View>

				<View style={styles.groupedCategories}>
					<OptionConfig
						textButton={'Deixe sua opinião'}
						onPress={() => navigation.navigate('LeaveYourOpinionCompany', { uid })}
					/>

					<OptionConfig
						textButton={'Entre em contato conosco'}
						onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=55540808')}
					/>
				</View>

				<View style={styles.groupedCategories}>
					<OptionConfig textButton={'Sair da conta'} onPress={() => logout()} />
				</View>
			</View>
		</View>
	);
}
