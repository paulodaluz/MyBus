import { StyleSheet } from "react-native";
import { grey, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		alignItems: 'center',
		height: "100%"
	},
	titleBox: {
		height: "38%",
		width: "100%",
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: 40,
		paddingTop: "8%"
	},
	title: {
		color: white,
		fontSize: 42,
		paddingTop: 50,
		paddingLeft: 30,
		paddingRight: 90,
		fontWeight: "bold",
	},
	typeOfVehicle: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: "6%",
	},
	publicButton: {
		width: "50%",
		alignItems: "center",
	},
	textPublicButton: {
		height: "100%",
		color: grey,
		fontSize: 19,
		paddingTop: "6%"
	},
	privateButton: {
		width: "50%",
		alignItems: "center",
	},
	textPrivateButton: {
		height: "100%",
		color: grey,
		fontSize: 19,
		paddingTop: "6%"
	},
	subtitle: {
		fontSize: 18,
		color: grey,
		textAlign: "center",
		paddingTop: "5%",
		paddingBottom: "5%",
		paddingLeft: "10%",
		paddingRight: "10%",
	},
	privateContainer: {
		width: "100%",
		alignItems: "center"
	},
	containerVehicleCode: {
		borderWidth: 1,
		borderColor: '#8492A6',
		backgroundColor: "transparent",
		width: "80%",
		height: 60,
	},
	inputVehicleCode: {
		height: "100%",
		paddingLeft: "2%"
	},
	arroundScanQrCode: {
		marginTop: "2%",
		flexDirection: "row",
		width: "80%",
	},
	qrCodePng: {
		display: "flex",
		width: 15,
		height: 15,
		maxWidth: 15,
		marginRight: "1%"
	},
	scanQrCode: {
		textDecorationLine: "underline",
		fontWeight: "bold",
		color: "#969FAA",
	},
	continueButton: {
		backgroundColor: purple,
		borderRadius: 14,
		height: "8%",
		width: '85%',
		padding: "4%",
		marginBottom: "3%"
	},
	observation: {
		color: "#969FAA",
		textAlign: "center",
		fontSize: 15,
		paddingTop: "2%",
		paddingLeft: "19%",
		paddingRight: "19%"
	},
	emphasisWord: {
		textDecorationLine: "underline",
		fontWeight: "bold"
	}
});
