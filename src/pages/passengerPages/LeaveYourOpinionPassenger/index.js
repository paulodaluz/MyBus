import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { saveCompanyFeedbackBackend } from '../../../backend/feedbacks/CompanyFeedbacks';
import { getUserOnFirebase } from '../../../backend/Login';
import { getVehicle } from '../../../backend/vehicles/Vehicle';
import { Header } from '../../../components/Header';
import { WideButton } from '../../../components/WideButton';
import { registerAppFeedback } from '../../../service/FeedbackService';
import { purple } from '../../../styles/colors';
import { DynamicButton } from './DynamicButton';
import { DynamicInputs } from './DynamicInputs';
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

		const user = await getUserOnFirebase(uid);

		await registerAppFeedback(user.name, user.email, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const saveFeedbackTransport = async () => {
		if (!feedback || !vehicleName) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		if (vehicleRegistration) {
			await saveCompanyFeedbackBackend(uid, vehicle, null, feedback);
			cleanInputs();
			return Alert.alert('Feedback registrado!');
		}

		await saveCompanyFeedbackBackend(uid, null, vehicleName, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const cleanInputs = () => {
		setFeedback('');
		setVehicleName('');
	};

	const getInfosOfVehicle = async () => {
		if (vehicleRegistration) {
			let vehicleFromDB = await getVehicle({ registrationPlate: vehicleRegistration });
			setVehicleName(vehicleFromDB.name);
			setVehicle(vehicleFromDB);
		}
	};

	useLayoutEffect(() => {
		getInfosOfVehicle();
	}, []);

	useEffect(() => {
		cleanInputs();
	}, [feedbackRecipient]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Deixe sua\nopinião'} subtitle={'Escolha para quem é o seu feedback!'} />
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
				<DynamicInputs
					vehicleNameValue={vehicleName}
					onChangeTextVehicleName={(text) => setVehicleName(text)}
					feedbackValue={feedback}
					onChangeTextFeedback={(text) => setFeedback(text)}
					feedbackRecipient={feedbackRecipient}
				/>

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
