import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: purple,
		resizeMode: 'cover',
	},
	text: {
		color: white,
		textAlign: 'center',
		paddingTop: '12%',
		fontWeight: 'bold',
		fontSize: 20,
	},
});
