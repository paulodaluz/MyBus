import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { saveAppFeedbackBackend } from "../../../backend/feedbacks/MyBusFeedbacks";
import { purple, white, grey } from "../../../styles/colors";
import MyBusIcon from '../../../assets/icons/svg/my_bus_icon.svg';
import { styles } from './style';

export default function LeaveYourOpinionCompany({ navigation, route }) {
	const { uid } = route.params;

	const [feedback, setFeedback] = useState("");

	const saveFeedbackApp = async () => {
		if(!feedback) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		await saveAppFeedbackBackend(uid, feedback);

		setFeedback("");
		return Alert.alert('Feedback registrado!');
	};

  return (
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>Deixe sua opinião</Text>
				<Text style={styles.subTitle}>Deixe-nos seu feedback!</Text>
			</View>

			<View style={styles.feedbackRecipient}>
				<View style={{...styles.buttonFeedbackApp, backgroundColor: white}}>

					{/* <Image
						style={{width: 30, height: 30}}
						source={MyBusIcon}
					/> */}
					<Text style={styles.textFeedbackApp}>Applicativo MyBus</Text>
				</View>
			</View>

			<View style={styles.body}>
				<Text style={styles.fieldName}>Feedback:</Text>
				<TextInput
					style={styles.inputButtonFeedback}
					placeholder="Digite seu feedback"
					textContentType='name'
					value={feedback}
					onChangeText={text => setFeedback(text)}
				/>

				<View style={styles.sendButton}>
					<Button
						onPress={() => saveFeedbackApp()}
						title="Enviar"
						color={white}
					/>
      	</View>

				<Text style={styles.message}>Agradecemos seu Feedback. Estamos em constantes melhorias!</Text>

			</View>
		</View>
	)
}
