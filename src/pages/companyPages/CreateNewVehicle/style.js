import { StyleSheet } from "react-native";
import { orange, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	boxTitle: {
		width: "100%",
		backgroundColor: purple,
		height: "13%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: "6%"
	},
	title: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		paddingTop: "11%",
		fontSize: 25,
		paddingLeft: "13%",
		paddingRight: "13%"
	},
	body: {
		width: "92%",
		height: "83%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "5%",
		paddingLeft: "10%",
		paddingRight: "10%",
		marginLeft: "4%",
		marginRight: "4%"
	},
	inputName: {
		color: white,
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase",
		paddingBottom: "2%"
	},
	input: {
		width: "98%",
		height: "7%",
		backgroundColor: white,
		borderRadius: 30,
		paddingLeft: "8%",
		paddingRight: "8%",
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: "8%",
		borderWidth: 1,
		borderColor: orange
	},
	selectResources: {
		color: white,
		fontSize: 23,
		fontWeight: "bold",
		textTransform: "uppercase",
		textAlign: "center",
	},
	optionFuntionOfVehicle: {
		width: "100%",
		flexDirection: "row",
		paddingTop: "6%",
		display: "flex",
	},
	functionOfVehicle: {
		color: white,
		fontSize: 25,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	buttonListedVehicles: {
		alignSelf: "center",
		position: 'relative',
		marginLeft: 'auto'
	},
	registerButton: {
		borderRadius: 30,
		marginTop: "5%",
		backgroundColor: orange,
		width: "60%",
		height: "7%",
		alignItems: "center",
		alignSelf: "center",
		paddingTop: "2%"
	}
});
