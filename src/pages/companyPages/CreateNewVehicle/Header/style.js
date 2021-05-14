import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '13%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		fontSize: 25,
		color: white,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: '11%',
	},
});
