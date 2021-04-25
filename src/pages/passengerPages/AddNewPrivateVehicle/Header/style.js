import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '24%',
		width: '100%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingLeft: '8%',
	},
	title: {
		fontSize: 44,
		color: white,
		paddingTop: '14%',
		fontWeight: 'bold',
	},
	subTitle: {
		fontSize: 20,
		color: white,
		paddingTop: '4%',
	},
});
