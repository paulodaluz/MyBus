import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { purple } from '../../../styles/colors';
import { RangeAppMyBus } from './RangeAppMyBus';
import { styles } from './style';

export default function LeaveYourOpinionCompany({ route }) {
	const { uid } = route.params;

	const [feedback, setFeedback] = useState('');

	const saveFeedbackApp = async () => {
		if (!feedback) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		const user = await getUserOnFirebase(uid);

		await registerAppFeedback(user.name, user.email, feedback);

		setFeedback('');

		return Alert.alert('Feedback registrado!');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Deixe sua\nopinião'} subtitle={'Deixe-nos seu feedback!'} />
			</View>

			<RangeAppMyBus />

			<View style={styles.body}>
				<Text style={styles.fieldName}>Feedback:</Text>

				<View style={styles.inputButtonFeedback}>
					<Input
						placeholder="Digite seu feedback"
						textContentType="name"
						value={feedback}
						onChangeText={(text) => setFeedback(text)}
					/>
				</View>

				<View style={styles.sendButton}>
					<WideButton
						onPress={() => saveFeedbackApp()}
						textButton={'Enviar'}
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
