import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Alert, Image } from "react-native";
import { saveCompanyFeedbackBackend } from "../../backend/feedbacks/CompanyFeedbacks";
import { saveAppFeedbackBackend } from "../../backend/feedbacks/MyBusFeedbacks";
import { purple, white, grey } from "../../styles/colors";
import MyBusIcon from '../../assets/icons/svg/my_bus_icon.svg'
import TransportIcon from '../../assets/icons/svg/transport_icon.svg'
import { getVehicle } from "../../backend/vehicles/Vehicle";

export default function LeaveYourOpinion({ navigation, route }) {
	const { uid } = route.params;
	const { vehicleRegistration } = route.params;

	const [feedbackRecipient, setFeedbackRecipient] = useState("company");
	const [vehicleName, setVehicleName] = useState("");
	const [feedback, setFeedback] = useState("");
	const [vehicle, setVehicle] = useState()

	const saveFeedbackApp = async () => {
		if(!feedback) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		await saveAppFeedbackBackend(uid, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const saveFeedbackTransport = async () => {
		if(!feedback || !vehicleName) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		if(vehicleRegistration) {
			await saveCompanyFeedbackBackend(uid, vehicle, null, feedback);
			return Alert.alert('Feedback registrado!');
		}

		await saveCompanyFeedbackBackend(uid, null, vehicleName, feedback);

		cleanInputs();
		return Alert.alert('Feedback registrado!');
	};

	const cleanInputs = async () => {
		setFeedback("");
		setVehicleName("");
	};

	useEffect(() => {

		async function getInfosOfVehicle() {
			if(vehicleRegistration) {
				const vehicle = await getVehicle({registrationPlate: vehicleRegistration});
				setVehicleName(vehicle.name);
				setVehicle(vehicle);
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
						onPress={() => {setFeedbackRecipient('company'), cleanInputs()}}
						style={ feedbackRecipient === 'company' ? {...styles.buttonFeedbackTransport, backgroundColor:'#E7E9ED'} : {...styles.buttonFeedbackTransport, backgroundColor: "#FFFFFF"} }>
							{/* <Image
								style={{width: 30, height: 30}}
								source={MyBusIcon}
							/> */}
							<Text style={styles.textFeedbackTransport}>Transporte</Text>
				</TouchableOpacity>

				<TouchableOpacity
						onPress={() => {setFeedbackRecipient('app'), cleanInputs()}}
						style={ feedbackRecipient === 'app' ? {...styles.buttonFeedbackApp, backgroundColor:'#E7E9ED'} : {...styles.buttonFeedbackApp, backgroundColor: "#FFFFFF"}}>
							{/* <Image
								style={{width: 30, height: 30}}
								source={TransportIcon}
							/> */}
							<Text style={styles.textFeedbackApp}>Applicativo MyBus</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.body}>
			{
				feedbackRecipient === "company" &&
				<View style={styles.hideBusNameButton}>
					<Text style={styles.fieldName}>Nome do Veículo:</Text>
					<TextInput
						style={styles.inputButtonTransport}
						placeholder="Digite o nome do transporte"
						textContentType='name'
						value={vehicleName}
						onChangeText={vehicleName => setVehicleName(vehicleName)}
					/>
				</View>
			}
				<Text style={styles.fieldName}>Feedback:</Text>
				<TextInput
					style={styles.inputButtonFeedback}
					placeholder="Digite seu feedback"
					textContentType='name'
					value={feedback}
					onChangeText={feedback => setFeedback(feedback)}
				/>

				<View style={styles.sendButton}>
					<Button
						onPress={feedbackRecipient === 'company' ? saveFeedbackTransport : saveFeedbackApp }
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
		height: "25%",
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
	buttonFeedbackTransport: {
		height: "100%",
		width: "50%"
	},
	textFeedbackTransport: {
		fontSize: 18,
		textAlign: "center",
		color: "#8190A5",
		paddingTop: "6%"
	},
	buttonFeedbackApp: {
		height: "100%",
		width: "50%"
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