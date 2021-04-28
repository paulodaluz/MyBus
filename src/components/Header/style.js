import { StyleSheet } from 'react-native';
import { purple, white } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: '10%',
		paddingTop: '18%',
		paddingHorizontal: '7.5%',
	},
	title: {
		color: white,
		fontSize: 50,
		fontWeight: 'bold',
		paddingRight: '18%',
	},
	subtitle: {
		color: white,
		fontSize: 20,
		paddingTop: '5%',
	},
	singleTitle: {
		fontSize: 45,
		color: white,
		fontWeight: 'bold',
	},
});
