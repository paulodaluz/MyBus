import { StyleSheet } from "react-native";
import { grey, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white
	},
	boxTitle: {
		height: "26%",
		width: "100%",
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		color: white,
		fontWeight: "bold",
		fontSize: 44,
		paddingTop: "15%",
		paddingLeft: "6%"
	},
	subTitle: {
		color: white,
		fontSize: 20,
		paddingLeft: "6%",
		paddingRight: "40%",
		paddingTop: "2%"
	},
	body: {
		height: "100%",
		paddingTop: "13%"
	},
	paragraph: {
		fontSize: 20,
		color: grey,
		textAlign: "center"
	},
	inputVehicleCodeCountainer: {
		width: "100%",
		alignItems: "center",
		marginTop: "10%"
	},
	containerVehicleCode: {
		borderWidth: 1,
		borderColor: '#8492A6',
		backgroundColor: "transparent",
		width: "90%",
		height: 60,
	},
	inputVehicleCode: {
		height: "100%",
		paddingLeft: "2%"
	},
	arroundScanQrCode: {
		marginTop: "2%",
		flexDirection: "row",
		width: "90%",
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
		alignItems: "center",
		backgroundColor: purple,
		borderRadius: 14,
		width: '82%',
		height: "6%",
		paddingTop: "3%",
		marginTop: "16%",
		marginLeft: "9%",
		marginBottom: "3%"
	},
	observation: {
		paddingTop: "15%",
		paddingLeft: "13%",
		paddingRight: "13%",
		textAlign: "center",
		fontSize: 20,
		color: '#969FAA',
	},
});
