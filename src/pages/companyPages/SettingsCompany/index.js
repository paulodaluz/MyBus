import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { getSession, removeSession } from '../../../backend/Login';
import { styles } from './style';

export default function SettingsCompany({ navigation, route }) {
	const [uid, setUid] = useState('');

	const logout = async () => {
		await removeSession();
		navigation.navigate('InitialPage');
	};

	useLayoutEffect(() => {
		const getSessionFromStorange = async () => {
			setUid(await getSession());
		};

		getSessionFromStorange();
	});

	return (
		<View style={styles.container}>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>Configurações</Text>
			</View>

			<View style={styles.allConfigOptions}>
				<View style={styles.groupOfCategories}>
					<TouchableOpacity
						style={styles.configOption}
						onPress={() => navigation.navigate('CreateNewVehicle', { uid })}
					>
						<Text style={styles.nameOfConfig}>Cadastrar novo veículo</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.configOption}
						onPress={() => navigation.navigate('ListMyLinkedVehicles', { uid })}
					>
						<Text style={styles.nameOfConfig}>Deletar veículo</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.groupOfCategories}>
					<TouchableOpacity
						style={styles.configOption}
						onPress={() => navigation.navigate('ReceivedFeedbacks', { uid })}
					>
						<Text style={styles.nameOfConfig}>Feedbacks recebidos</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.groupOfCategories}>
					<TouchableOpacity
						style={styles.configOption}
						onPress={() => navigation.navigate('EditProfileCompany', { uid })}
					>
						<Text style={styles.nameOfConfig}>Editar perfil</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.groupOfCategories}>
					<TouchableOpacity
						style={styles.configOption}
						onPress={() => navigation.navigate('LeaveYourOpinionCompany', { uid })}
					>
						<Text style={styles.nameOfConfig}>Deixe sua opinião</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.configOption}
						onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=55540808')}
					>
						<Text style={styles.nameOfConfig}>Entre em contato conosco</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.groupOfCategories}>
					<TouchableOpacity style={styles.configOption} onPress={() => logout()}>
						<Text style={styles.nameOfConfig}>Sair da conta</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
