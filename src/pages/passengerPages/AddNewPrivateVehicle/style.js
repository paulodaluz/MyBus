import { StyleSheet } from 'react-native';
import { grey, lightGray } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: lightGray,
	},
	body: {},
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
		minHeight: 48,
	},
	inputText: {
		minHeight: 48,
		width: '88%',
		alignSelf: 'flex-start',
		marginBottom: '2%',
	},
	qrcode: {
		alignSelf: 'flex-start',
	},
	button: {
		marginLeft: '9%',
		minHeight: 48,
		width: '82%',
	},
});
