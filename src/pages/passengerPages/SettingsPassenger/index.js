import { Screen } from '../../../components/commonComponents/Screen';
import { useLogout } from '../../../hooks/useLogout';
import { useLayoutEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { getSession } from '../../../backend/Login';
import { Header } from '../../../components/Header';
import { OptionConfig } from '../../../components/OptionConfig';
import { ButtonSwitchConfig } from './ButtonSwitchConfig';
import { styles } from './style';

export default function SettingsPassenger({ navigation }) {
	const [uid, setUid] = useState('');

	const [isEnabled, setIsEnabled] = useState(true);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const logout = useLogout(navigation);
	const getSessionFromStorange = async () => {
		setUid(await getSession());
	};

	useLayoutEffect(() => {
		getSessionFromStorange();
	}, []);

	return (
		<Screen>
			<View style={styles.header}>
				<Header title={'Configurações'} />
			</View>

			<View>
				<View style={styles.listOfOptions}>
					<View style={styles.groupedCategories}>
						<ButtonSwitchConfig value={isEnabled} onValueChange={toggleSwitch} />

						<OptionConfig
							textButton={'Adicionar novo veículo privado'}
							onPress={() => navigation.navigate('AddNewPrivateVehicle', { uid })}
						/>

						<OptionConfig
							textButton={'Listar meus veículos privados'}
							onPress={() => navigation.navigate('ListMyLinkedVehicles', { uid })}
						/>
					</View>

					<View style={styles.groupedCategories}>
						<OptionConfig
							textButton={'Editar perfil'}
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
			</View>
		</Screen>
	);
}
