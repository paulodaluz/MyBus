import React, { useLayoutEffect, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { getSession, removeSession } from '../../../backend/Login';
import { Header } from '../../../components/Header';
import { OptionConfig } from '../../../components/OptionConfig';
import { styles } from './style';

export default function SettingsCompany({ navigation }) {
	const [uid, setUid] = useState('');

	const logout = async () => {
		await removeSession();
		navigation.navigate('InitialPage');
	};

	const getSessionFromStorange = async () => {
		setUid(await getSession());
	};

	useLayoutEffect(() => {
		getSessionFromStorange();
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Configurações'} />
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.listOfOptions}>
					<View style={styles.groupedCategories}>
						<OptionConfig
							textButton={'Cadastrar novo veículo'}
							onPress={() => navigation.navigate('CreateNewVehicle', { uid })}
						/>

						<OptionConfig
							textButton={'Listar veículos'}
							onPress={() => navigation.navigate('ListMyLinkedVehicles', { uid })}
						/>
					</View>

					<View style={styles.groupedCategories}>
						<OptionConfig
							textButton={'Feedbacks recebidos'}
							onPress={() => navigation.navigate('ReceivedFeedbacks', { uid })}
						/>
					</View>

					<View style={styles.groupedCategories}>
						<OptionConfig
							textButton={'Editar perfil'}
							onPress={() => navigation.navigate('EditProfileCompany', { uid })}
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
			</ScrollView>
		</View>
	);
}
