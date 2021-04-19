import { StyleSheet } from 'react-native';
import { black, grey, lightGray, purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightGray,
		alignItems: 'center',
	},
	welcomeBox: {
		height: '38%',
		width: '100%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	inputButton: {
		height: '8%',
		width: '85%',
		marginTop: '20%',
		borderWidth: 1,
		borderColor: grey,
		backgroundColor: 'transparent',
		paddingHorizontal: 40,
		paddingLeft: '5%',
	},
	centerTitle: {
		color: white,
		fontSize: 50,
		fontWeight: 'bold',
		paddingTop: '20%',
		paddingLeft: '7%',
		paddingRight: '10%',
	},
	subTitle: {
		color: white,
		fontSize: 20,
		maxWidth: '90%',
		paddingHorizontal: '7.4%',
		paddingTop: 20,
	},
	forgotPasswordButton: {
		marginTop: '14%',
		height: '8%',
		width: '85%',
		marginBottom: '3%',
	},
	proceedToLoginText: {
		color: '#8492A6',
		marginTop: '2%',
	},
	proceedLogin: {
		color: black,
		textDecorationLine: 'underline',
	},
});
