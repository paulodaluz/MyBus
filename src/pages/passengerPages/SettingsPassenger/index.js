import React, { useLayoutEffect, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { getSession, removeSession } from '../../../backend/Login';
import { Header } from '../../../components/Header';
import { OptionConfig } from '../../../components/OptionConfig';
import { ButtonSwitchConfig } from './ButtonSwitchConfig';
import { styles } from './style';

export default function SettingsPassenger({ navigation }) {
	const [uid, setUid] = useState('');

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
						<ButtonSwitchConfig value={isEnabled} onValueChange={toggleSwitch} />

						<OptionConfig
							textButton={'Adicionar novo veículo privado'}
							onPress={() => navigation.navigate('AddNewPrivateVehicle', { uid })}
						/>

						<OptionConfig
							textButton={'Remover veículo privado'}
							onPress={() => navigation.navigate('ListMyLinkedVehicles', { uid })}
						/>
					</View>

					<View style={styles.groupedCategories}>
						<OptionConfig
							textButton={'Editar Perfil'}
							onPress={() => navigation.navigate('EditProfilePassenger', { uid })}
						/>
					</View>

					<View style={styles.groupedCategories}>
						<OptionConfig
							textButton={'Deixe sua opinião'}
							onPress={() => navigation.navigate('LeaveYourOpinionPassenger', { uid })}
						/>
					</View>

					<View style={styles.groupedCategories}>
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
