import { StyleSheet } from 'react-native';
import { white } from '../../styles/colors';

export const styles = StyleSheet.create({
	button: {
		flex: 1,
		justifyContent: 'center',
		borderRadius: 30,
		width: '100%',
		marginTop: '3%',
		alignSelf: 'center',
	},
	text: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: white,
		fontSize: 20,
	},
});
