import { StyleSheet } from 'react-native';
import { grey } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	header: {
		height: '29%',
	},
	body: {
		paddingTop: '2%',
		height: '60%',
		alignItems: 'center',
	},
	hideBusNameButton: {
		height: '20%',
		width: '100%',
	},
	fieldName: {
		color: grey,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		paddingLeft: '5%',
		paddingTop: '2%',
	},
	inputButtonTransport: {
		height: '45%',
		width: '90%',
		marginLeft: '5%',
	},
	inputButtonFeedback: {
		height: '30%',
		width: '90%',
		fontSize: 20,
	},
	button: {
		marginTop: '8%',
		height: 60,
		width: '85%',
		marginBottom: '3%',
	},
	message: {
		fontSize: 18,
		color: grey,
		textAlign: 'center',
	},
});
