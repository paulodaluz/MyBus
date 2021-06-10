import { StyleSheet } from 'react-native';
import { white } from '../../styles/colors';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: white,
		borderWidth: 1,
		borderColor: '#976DD0',
		paddingHorizontal: '5%',
		height: 64,
		flexDirection: 'row',
	},
	text: {
		fontSize: 25,
		alignSelf: 'center',
	},
});
