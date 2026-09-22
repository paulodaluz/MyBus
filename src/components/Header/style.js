import { StyleSheet } from 'react-native';
import { purple, white } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: 16,
		paddingVertical: 24,
		paddingHorizontal: '7.5%',
	},
	title: {
		color: white,
		fontSize: 32,
		fontWeight: 'bold',
		flexShrink: 1,
	},
	subtitle: {
		color: white,
		fontSize: 20,
		paddingTop: '5%',
	},
	singleTitle: {
		fontSize: 32,
		color: white,
		fontWeight: 'bold',
	},
});
