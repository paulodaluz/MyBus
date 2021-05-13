import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingTop: '18%',
	},
	title: {
		color: white,
		fontSize: 42,
		fontWeight: 'bold',
		paddingLeft: '7%',
	},
});
