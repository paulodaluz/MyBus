import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { saveCompanyFeedbackBackend } from '../../../backend/feedbacks/CompanyFeedbacks';
import { saveAppFeedbackBackend } from '../../../backend/feedbacks/MyBusFeedbacks';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { purple } from '../../../styles/colors';
import { DynamicButton } from './DynamicButton';
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

	useEffect(() => {
		cleanInputs();
	}, [feedbackRecipient]);

	return (
		<View>
			<View style={styles.header}>
				<Header title={'Deixe sua opinião'} subtitle={'Escolha para quem é o seu feedback!'} />
			</View>

			<DynamicButton
				onPressFirstButton={() => {
					setFeedbackRecipient('company');
				}}
				onPressSecondButton={() => {
					setFeedbackRecipient('app');
				}}
				feedbackRecipient={feedbackRecipient}
			/>

			<View style={styles.body}>
				{feedbackRecipient === 'company' && (
					<View style={styles.hideBusNameButton}>
						<Text style={styles.fieldName}>Nome do Veículo:</Text>
						<View style={styles.inputButtonTransport}>
							<Input
								placeholder="Digite o nome do transporte"
								textContentType="name"
								value={vehicleName}
								onChangeText={(text) => setVehicleName(text)}
							/>
						</View>
					</View>
				)}

				<Text style={styles.fieldName}>Feedback:</Text>
				<View style={styles.inputButtonFeedback}>
					<Input
						placeholder="Digite seu feedback"
						textContentType="name"
						value={feedback}
						onChangeText={(text) => setFeedback(text)}
					/>
				</View>

				{/* <DynamicInputs
					vehicleNameValue={vehicleName}
					onChangeTextVehicleName={(text) => setVehicleName(text)}
					feedbackValue={feedback}
					onChangeTextFeedback={(text) => setFeedback(text)}
					feedbackRecipient={feedbackRecipient}
				/> */}

				<View style={styles.button}>
					<WideButton
						onPress={feedbackRecipient === 'company' ? saveFeedbackTransport : saveFeedbackApp}
						textButton="Enviar"
						backgroundColor={purple}
					/>
				</View>

				<Text style={styles.message}>
					Agradecemos seu Feedback. Estamos em constantes melhorias!
				</Text>
			</View>
		</View>
	);
}
