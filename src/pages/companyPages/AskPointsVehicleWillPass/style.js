import { StyleSheet } from "react-native";
import { orange, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	boxTitle: {
		width: "100%",
		backgroundColor: purple,
		height: "18%",
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
		height: "40%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "10%",
		paddingBottom: "10%",
		marginLeft: "4%",
		marginRight: "4%",
		marginTop: "40%"
	},
	question: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		fontSize: 24,
		paddingLeft: "8%",
		paddingRight: "8%",
		marginBottom: "2%"
	},
	buttons: {
		flexDirection: "row",
		marginLeft: "5%",
		height: "50%",
		width: "100%",
		marginBottom: "1%"
	},
	button: {
		borderRadius: 30,
		backgroundColor: orange,
		width: "35%",
		height: "50%",
		alignItems: "center",
		alignSelf: "center",
		marginLeft: "7%",
		paddingTop: "1%",
	},
	buttonText: {
		color: white,
		fontSize: 22,
		fontWeight: "bold",
		paddingTop: "5%",
	},
	observation: {
		color: white,
		fontSize: 16,
		textAlign: "center",
		paddingRight: "5%",
		paddingLeft: "5%",
		fontWeight: "bold"
	}
});
