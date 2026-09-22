import { StyleSheet } from 'react-native';
import { grey, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
	},
	header: {},
	body: {
		paddingTop: '3%',
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
		minHeight: 48,
		width: '90%',
	},
	sendButton: {
		marginTop: '10%',
		minHeight: 48,
		width: '85%',
		marginBottom: '8%',
	},
	message: {
		color: grey,
		fontSize: 18,
		textAlign: 'center',
	},
});
