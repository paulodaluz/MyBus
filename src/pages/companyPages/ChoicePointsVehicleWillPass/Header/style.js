import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '14%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		shadowOpacity: 100,
	},
	title: {
		color: white,
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center',
		paddingTop: '12%',
	},
});
