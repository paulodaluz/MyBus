import { StyleSheet } from "react-native";
import { black, darkGrey, orange, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "17%",
		backgroundColor: purple,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		paddingTop: "14%",
		paddingLeft: "6%"
	},
	infoNameTitle: {
		color: white,
		fontWeight: "bold",
		fontSize: 12
	},
	infoTitle: {
		color: white,
		fontSize: 28,
		fontWeight: "bold"
	},
	body: {
		backgroundColor: purple,
		borderRadius: 30,
		marginTop: "10%",
		height: "72%",
		paddingTop: "8%",
		paddingBottom: "8%",

		width: "95%",
		alignSelf: "center",
	},
	infoName: {
		color: black,
		fontWeight: "bold",
		fontSize: 12,
		paddingTop: "5%"
	},
	info: {
		color: white,
		fontSize: 28,
		fontWeight: "bold"
	},
	price: {
		color: white,
		fontWeight: "bold"
	},
	vehicleFunctions: {

	},
	buttonGiveFeedback: {
		marginTop: '6%',
		backgroundColor: darkGrey,
		borderRadius: 30,
		height: "10%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
	},
	buttonSeeOnMap: {
		marginTop: '5%',
		backgroundColor: orange,
		borderRadius: 30,
		height: "10%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
	},
	textButton: {
		color: white,
		fontWeight: "bold",
		paddingTop: "6%",
		fontSize: 20
	},
	vehicleFunctionsModal: {
		flexDirection: 'row-reverse',
		marginTop: '10%'
	},
	priceModal: {
		display: 'flex',
		flexDirection: 'row'
	},
	priceImg: {
		height: 35,
		width: 35,
		marginRight: '2%'
	},
	priceTextModal: {
		color: white,
		fontWeight: "bold",
		fontSize: 28
	},
	airConditioningImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	toiletPaperImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	wheelchairImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	wifiImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	buttonEditVehicleModal: {
		backgroundColor: orange,
		borderRadius: 30,
		height: "10%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
		marginTop: '10%'
	},
	textButtonEditVehicleModal: {
		color: white,
		fontWeight: "bold",
		paddingTop: "5%",
		fontSize: 34
	},
});
