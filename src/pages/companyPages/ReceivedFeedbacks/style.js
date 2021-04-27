import { StyleSheet } from 'react-native';
import { white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
	},
	header: {
		height: '20%',
	},
	dontHaveFeedback: {
		fontSize: 30,
		color: white,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: '30%',
	},
	body: {
		height: '80%',
		alignItems: 'center',
	},
	list: {
		width: '90%',
	},
});
