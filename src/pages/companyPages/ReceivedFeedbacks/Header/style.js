import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: purple,
		height: '100%',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		fontSize: 45,
		color: white,
		fontWeight: 'bold',
		paddingTop: '12%',
		paddingLeft: '10%',
		paddingRight: '10%',
	},
	secondTitle: {
		fontSize: 45,
		color: white,
		fontWeight: 'bold',
		paddingLeft: '28%',
	},
});
