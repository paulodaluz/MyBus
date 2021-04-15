import { StyleSheet } from "react-native";
import { purple, red, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	header: {
		backgroundColor: purple,
		height: "23%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: "10%",
	},
	title: {
		color: white,
		fontWeight: "bold",
		fontSize: 50,
		paddingTop: "12%",
		textAlign: "center"
	},
	body: {
		width: "90%",
		alignSelf: "center",
		height: "70%"
	},
	box: {
		backgroundColor: purple,
		height: "64%",
		borderRadius: 35,
		paddingLeft: "5%",
		paddingRight: "5%",
	},
	infoName: {
		paddingTop: "5%",
		color: white,
		fontWeight: "bold",
		fontSize: 15
	},
	info: {
		color: white,
		fontWeight: "bold",
		fontSize: 28
	},
  containerDivider: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: '#A39BBD'
  },
	removeButton: {
		backgroundColor: red,
		borderRadius: 50,
		height: "17%",
		width: "50%",
		alignSelf: "center"
	},
	buttonText: {
		color: white,
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		paddingTop: "6%"
	}
});
