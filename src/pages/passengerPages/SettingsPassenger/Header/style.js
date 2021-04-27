import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '18%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingTop: '18%',
		paddingHorizontal: '6%',
	},
	title: {
		fontSize: 45,
		color: white,
		fontWeight: 'bold',
	},
});
