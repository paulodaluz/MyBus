import { StyleSheet, Dimensions } from "react-native";
import { purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: "90%"
	},
	menu: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: '4%'
  },
	addVehicleButton: {
		width: "50%",
		height: "100%",
		alignItems: "center",
		flex: 1,
		justifyContent: 'center',
		paddingLeft: '3%'
	},
	configButton: {
		width: "50%",
		height: "100%",
		alignItems: "center",
		flex: 1,
		justifyContent: 'center',
		paddingRight: '3%'
	},
	buttonText: {
		color: white,
		fontWeight: "bold",
		fontSize: 17,
		textAlign: 'center'
	}
});
