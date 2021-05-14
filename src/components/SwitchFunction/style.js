import { StyleSheet } from 'react-native';
import { white } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		display: 'flex',
	},
	switchName: {
		fontSize: 25,
		color: white,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	switchButton: {
		alignSelf: 'center',
		marginLeft: 'auto',
	},
});
