import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { getUserOnFirebase } from '../../../backend/Login';
import { Header } from '../../../components/Header';
import { WideButton } from '../../../components/WideButton';
import { registerAppFeedback, registerVehicleFeedback } from '../../../service/FeedbackService';
import { purple } from '../../../styles/colors';
import { DynamicButton } from './DynamicButton';
import { DynamicInputs } from './DynamicInputs';
import { styles } from './style';

export default function LeaveYourOpinionPassenger({ navigation, route }) {
	const { uid, vehicle = '', vehicleRegistration } = route.params;

	const [feedbackRecipient, setFeedbackRecipient] = useState('company');
	const [vehicleName, setVehicleName] = useState(vehicle);
	const [feedback, setFeedback] = useState('');

	const saveFeedbackApp = async () => {
		if (!feedback) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		const user = await getUserOnFirebase(uid);

		await registerAppFeedback(user.name, user.email, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const saveFeedbackVehicle = async () => {
		if (!feedback || !vehicleName) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		const user = await getPassenger(uid);

		await registerVehicleFeedback(user.name, user.email, feedback, vehicleName, vehicleRegistration)

		cleanInputs();

		return Alert.alert('Feedback registrado!');
	};

	const cleanInputs = () => {
		setFeedback('');
		setVehicleName('');
	};

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
						onPress={feedbackRecipient === 'company' ? saveFeedbackVehicle : saveFeedbackApp}
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
