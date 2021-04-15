import { StyleSheet } from "react-native";
import { grey, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
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
		color: grey,
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
