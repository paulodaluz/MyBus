import { StyleSheet } from 'react-native';
import { black, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
	},
	header: {},
	dontHaveFeedback: {
		fontSize: 30,
		color: black,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: '30%',
	},
	body: {
		flex: 1,
		alignItems: 'center',
	},
	list: {
		width: '90%',
	},
});
