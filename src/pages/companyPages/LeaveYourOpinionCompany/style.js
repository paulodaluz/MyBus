import { StyleSheet } from 'react-native';
import { grey, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
	},
	header: {
		height: '29%',
	},
	body: {
		paddingTop: '3%',
		height: '60%',
		alignItems: 'center',
	},
	fieldName: {
		color: grey,
		alignSelf: 'flex-start',
		paddingLeft: '5%',
		paddingTop: '8%',
		fontWeight: 'bold',
	},
	inputButtonFeedback: {
		height: '30%',
		width: '90%',
	},
	sendButton: {
		marginTop: '10%',
		height: '12%',
		width: '85%',
		marginBottom: '8%',
	},
	message: {
		color: grey,
		fontSize: 18,
		textAlign: 'center',
	},
});
