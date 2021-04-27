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
		height: '60%',
		alignItems: 'center',
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
		marginTop: '2%',
		textAlign: 'center',
	},
});
