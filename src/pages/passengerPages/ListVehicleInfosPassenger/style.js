import { StyleSheet } from 'react-native';
import { purple } from '../../../styles/colors';

export const styles = StyleSheet.create({
	bodyContainer: {
		backgroundColor: purple,
		borderRadius: 30,
		marginTop: '10%',
		paddingTop: '8%',
		width: '95%',
		alignSelf: 'center',
	},
	buttonsContainer: {
		alignItems: 'center',
	},
	button: {
		minHeight: 48,
		width: '54%',
		margin: '2%',
	},
});
