import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { removeSession } from '../../../backend/Login';
import { purple, white } from '../../../styles/colors';

export default function SettingsDriver({ navigation, route }) {
	const { uid, registration_Plate } = route.params;

	const logout = async () => {
		await removeSession();
		navigation.navigate('InitialPage');
	}

	return(
			<View style={styles.container}>
					<View style={styles.boxTitle}>
							<Text style={styles.title}>Configurações</Text>
					</View>

					<View style={styles.allConfigOptions}>

							<View style={styles.groupOfCategories}>
									<TouchableOpacity style={styles.configOption}
											onPress={() => navigation.navigate('ReceivedFeedbacks', { uid })}>
													<Text style={styles.nameOfConfig}>Feedbacks recebidos</Text>
									</TouchableOpacity>
							</View>

							<View style={styles.groupOfCategories}>
								<TouchableOpacity style={styles.configOption}
											onPress={() => navigation.navigate('EditVehicle', { uid, registration_Plate, backPage: 'SettingsDriver', params: { uid, registration_Plate } })}>
												<Text style={styles.nameOfConfig}>Editar informações do veículo</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.groupOfCategories}>
									<TouchableOpacity style={styles.configOption}
											onPress={() => navigation.navigate('LeaveYourOpinionCompany', { uid })}>
													<Text style={styles.nameOfConfig}>Deixe sua opinião</Text>
									</TouchableOpacity>

									<TouchableOpacity style={styles.configOption}
											onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=55540808`)}>
													<Text style={styles.nameOfConfig}>Entre em contato conosco</Text>
									</TouchableOpacity>
							</View>

							<View style={styles.groupOfCategories}>
									<TouchableOpacity style={styles.configOption}
											onPress={() => logout()}>
													<Text style={styles.nameOfConfig}>Sair da conta</Text>
									</TouchableOpacity>
							</View>

					</View>

			</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(200, 200, 200, 0.4)",
		height: "100%"
	},
	boxTitle: {
		height: "18%",
		width: "100%",
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingTop: "18%",
		paddingLeft: "6%",
	},
	title: {
		fontSize: 45,
		color: white,
		fontWeight: "bold",
	},
	allConfigOptions: {
		width: "100%",
		marginTop: "12%"
	},
	configOption: {
		backgroundColor: white,
		borderWidth: 1,
		borderColor: "#976DD0",
		paddingLeft: "5%",
		height: 58,
		flexDirection: "row"
	},
	nameOfConfig: {
		fontSize: 25,
		paddingTop: "3%"
	},
	buttonListedVehicles: {
		marginTop: "3%",
		marginLeft: "8%"
	},
	groupOfCategories: {
		marginBottom: "12%",
	}
});
