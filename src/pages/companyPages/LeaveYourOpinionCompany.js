import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, Image } from "react-native";
import { saveAppFeedbackBackend } from "../../backend/feedbacks/MyBusFeedbacks";
import { purple, white, grey } from "../../styles/colors";
import MyBusIcon from '../../assets/icons/svg/my_bus_icon.svg'

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
				<View style={{...styles.buttonFeedbackApp, backgroundColor:'#FFFFFF'}}>

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

const styles = StyleSheet.create({
	boxTitle: {
		height: "23%",
		width: "100%",
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingTop: "16%",
		paddingLeft: "8%",
	},
	title: {
		fontSize: 38,
		color: white,
		fontWeight: "bold"
	},
	subTitle: {
		fontSize: 20,
		color: white,
		paddingTop: "2%",
		paddingRight: "15%"
	},
	feedbackRecipient: {
		flexDirection: "row",
		width: "100%",
		height: "12%",
		paddingTop: "8%"
	},
	buttonFeedbackApp: {
		height: "100%",
		width: "100%"
	},
	textFeedbackApp: {
		fontSize: 18,
		textAlign: "center",
		color: "#8190A5",
		paddingTop: "6%"
	},
	body: {
		paddingTop: "3%",
		height: "60%",
		alignItems: "center",
	},
	hideBusNameButton: {
		height: "20%",
		width: "100%"
	},
	fieldName: {
		color: grey,
		alignSelf: "flex-start",
		paddingLeft: "5%",
		paddingTop: "8%"
	},
	inputButtonTransport: {
		height: "45%",
		width: "90%",
		borderWidth: 1,
		borderColor: grey,
		alignContent: "center",
		fontSize: 20,
		marginLeft: "5%",
		paddingLeft: "2%"
	},
	inputButtonFeedback: {
		height: "30%",
		width: "90%",
		borderWidth: 1,
		borderColor: grey,
		fontSize: 20,
		paddingLeft: "2%",
		paddingBottom: "26%"
	},
	sendButton: {
		backgroundColor: purple,
		marginTop: "14%",
    borderRadius: 14,
    height: "12%",
    width: '85%',
    marginBottom: "3%",
		padding: "2%",
	},
	message: {
		color: grey,
		fontSize: 18,
		textAlign: "center",
		paddingTop: "5%",
		paddingLeft: "10%",
		paddingRight: "10%"
	}

});
