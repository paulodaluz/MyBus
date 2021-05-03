import { StyleSheet } from 'react-native';
import { purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	body: {
		width: '92%',
		height: 400,
		backgroundColor: purple,
		borderRadius: 30,
		paddingVertical: '8%',
		marginHorizontal: '4%',
		marginTop: '30%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	subTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: white,
		textAlign: 'center',
	},
	button: {
		marginTop: '4%',
		height: '22%',
		width: '85%',
	},
});
