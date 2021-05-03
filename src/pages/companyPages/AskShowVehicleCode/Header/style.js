import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: purple,
		height: '18%',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: '6%',
	},
	title: {
		color: white,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: '11%',
		fontSize: 25,
		paddingLeft: '13%',
		paddingRight: '13%',
	},
});
