import { StyleSheet } from 'react-native';
import { grey, lightGray } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: lightGray,
	},
	body: {
		height: '100%',
	},
	message: {
		padding: '12%',
		textAlign: 'center',
		fontSize: 20,
		color: grey,
	},
	containerInputCode: {
		width: '100%',
		alignItems: 'center',
		paddingLeft: '10%',
		height: '14%',
	},
	inputText: {
		height: '42%',
		width: '88%',
		alignSelf: 'flex-start',
		marginBottom: '2%',
	},
	qrcode: {
		alignSelf: 'flex-start',
	},
	button: {
		marginLeft: '9%',
		height: '6%',
		width: '82%',
	},
});
