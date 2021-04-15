import { StyleSheet } from "react-native";
import { purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(200, 200, 200, 0.4)",
		height: "100%"
	},
	boxTitle: {
		height: "18%",
		width: "100%",
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingTop: "18%",
		paddingLeft: "6%",
	},
	title: {
		fontSize: 45,
		color: white,
		fontWeight: "bold",
	},
	allConfigOptions: {
		width: "100%",
		marginTop: "12%"
	},
	configOption: {
		backgroundColor: white,
		borderWidth: 1,
		borderColor: "#976DD0",
		paddingLeft: "5%",
		height: 58,
		flexDirection: "row"
	},
	nameOfConfig: {
		fontSize: 25,
		paddingTop: "3%"
	},
	buttonListedVehicles: {
		marginTop: "3%",
		marginLeft: "8%"
	},
	groupOfCategories: {
		marginBottom: "12%",
	}
});
