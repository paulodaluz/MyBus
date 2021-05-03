import { StyleSheet } from 'react-native';
import { purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	body: {
		width: '92%',
		height: 310,
		backgroundColor: purple,
		borderRadius: 30,
		paddingVertical: '8%',
		marginHorizontal: '4%',
		marginTop: '40%',
		paddingHorizontal: '8%',
	},
	subtitle: {
		fontSize: 24,
		color: white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttons: {
		height: '50%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		width: '40%',
		height: '70%',
		alignSelf: 'center',
	},
	observation: {
		fontSize: 16,
		color: white,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: '3%',
	},
});
