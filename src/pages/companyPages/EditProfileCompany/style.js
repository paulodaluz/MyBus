import { StyleSheet } from "react-native";
import { darkGrey, grey, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
	container: {
		display: "flex"
	},
	boxTitle: {
		backgroundColor: purple,
		height: "17%",
		width: "100%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30
	},
	title: {
		paddingTop: "15%",
		paddingLeft: "8%",
		fontWeight: "bold",
		color: white,
		fontSize: 50
	},
	body: {
		paddingTop: "8%",
		paddingRight: "10%",
		paddingLeft: "10%"
	},
	nameOfInput: {
		color: grey,
		fontSize: 16,
		paddingTop: "6%"
	},
	inputButton: {
    height: "10%",
    width: '100%',
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
    fontSize: 16,
	},
	unmutableInput: {
		paddingTop: "7%",
		fontSize: 17,
		color: grey
	},
  updateButton: {
    marginTop: 40,
    backgroundColor: darkGrey,
    borderRadius: 14,
    height: "11%",
    width: '100%',
    paddingTop: "4%",
    marginBottom: "3%"
  },
});
