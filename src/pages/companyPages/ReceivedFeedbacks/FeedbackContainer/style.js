import { StyleSheet } from 'react-native';
import { black, purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: purple,
		borderRadius: 30,
		height: 350,
		width: '100%',
		marginTop: '7%',
		marginBottom: '7%',
		padding: '8%',
	},
	title: {
		fontSize: 40,
		color: white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	nameOfItem: {
		fontSize: 15,
		color: black,
		fontWeight: 'bold',
		paddingTop: '5%',
	},
	valueOfItem: {
		fontSize: 22,
		color: white,
		fontWeight: 'bold',
	},
});
