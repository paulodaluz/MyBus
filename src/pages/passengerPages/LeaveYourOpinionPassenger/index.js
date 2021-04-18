import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { saveCompanyFeedbackBackend } from '../../../backend/feedbacks/CompanyFeedbacks';
import { saveAppFeedbackBackend } from '../../../backend/feedbacks/MyBusFeedbacks';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { white } from '../../../styles/colors';
import { styles } from './style';

export default function LeaveYourOpinionPassenger({ navigation, route }) {
	const { uid, vehicleRegistration } = route.params;

	const [feedbackRecipient, setFeedbackRecipient] = useState('company');
	const [vehicleName, setVehicleName] = useState('');
	const [feedback, setFeedback] = useState('');
	const [vehicle, setVehicle] = useState();

	const saveFeedbackApp = async () => {
		if (!feedback) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		await saveAppFeedbackBackend(uid, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const saveFeedbackTransport = async () => {
		if (!feedback || !vehicleName) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		if (vehicleRegistration) {
			await saveCompanyFeedbackBackend(uid, vehicle, null, feedback);
			return Alert.alert('Feedback registrado!');
		}

		await saveCompanyFeedbackBackend(uid, null, vehicleName, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const cleanInputs = async () => {
		setFeedback('');
		setVehicleName('');
	};

	useEffect(() => {
		async function getInfosOfVehicle() {
			if (vehicleRegistration) {
				let vehicleFromDB = await getVehicle({ registrationPlate: vehicleRegistration });
				setVehicleName(vehicleFromDB.name);
				setVehicle(vehicleFromDB);
			}
		}

		getInfosOfVehicle();
	}, []);

	return (
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>Deixe sua opinião</Text>
				<Text style={styles.subTitle}>Escolha para quem é o seu feedback!</Text>
			</View>

			<View style={styles.feedbackRecipient}>
				<TouchableOpacity
					onPress={() => {
						setFeedbackRecipient('company'), cleanInputs();
					}}
					style={
						feedbackRecipient === 'company'
							? { ...styles.buttonFeedbackTransport, backgroundColor: '#E7E9ED' }
							: { ...styles.buttonFeedbackTransport, backgroundColor: white }
					}
				>
					{/* <Image
								style={{width: 30, height: 30}}
								source={MyBusIcon}
							/> */}
					<Text style={styles.textFeedbackTransport}>Transporte</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						setFeedbackRecipient('app'), cleanInputs();
					}}
					style={
						feedbackRecipient === 'app'
							? { ...styles.buttonFeedbackApp, backgroundColor: '#E7E9ED' }
							: { ...styles.buttonFeedbackApp, backgroundColor: white }
					}
				>
					{/* <Image
								style={{width: 30, height: 30}}
								source={TransportIcon}
							/> */}
					<Text style={styles.textFeedbackApp}>Applicativo MyBus</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.body}>
				{feedbackRecipient === 'company' && (
					<View style={styles.hideBusNameButton}>
						<Text style={styles.fieldName}>Nome do Veículo:</Text>
						<TextInput
							style={styles.inputButtonTransport}
							placeholder="Digite o nome do transporte"
							textContentType="name"
							value={vehicleName}
							onChangeText={(text) => setVehicleName(text)}
						/>
					</View>
				)}
				<Text style={styles.fieldName}>Feedback:</Text>
				<TextInput
					style={styles.inputButtonFeedback}
					placeholder="Digite seu feedback"
					textContentType="name"
					value={feedback}
					onChangeText={(text) => setFeedback(text)}
				/>

				<View style={styles.sendButton}>
					<Button
						onPress={feedbackRecipient === 'company' ? saveFeedbackTransport : saveFeedbackApp}
						title="Enviar"
						color={white}
					/>
				</View>

				<Text style={styles.message}>
					Agradecemos seu Feedback. Estamos em constantes melhorias!
				</Text>
			</View>
		</View>
	);
}
