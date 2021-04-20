import { StyleSheet } from 'react-native';
import { grey, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
	},
	header: {
		height: '28%',
		marginBottom: '10%',
		width: '100%',
	},
	inputButton: {
		height: '8%',
		width: '85%',
		marginTop: '4%',
	},
	registerButton: {
		marginTop: '5%',
		height: '8%',
		width: '85%',
	},
	messagesToUser: {
		paddingLeft: '15%',
		paddingRight: '15%',
		marginTop: '3%',
	},
	messageCreatingYourAccount: {
		color: grey,
		textAlign: 'center',
	},
	doYouHaveAccount: {
		color: grey,
		textAlign: 'center',
		marginTop: '5%',
	},
	termsOfUse: {
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
	getIn: {
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
});
