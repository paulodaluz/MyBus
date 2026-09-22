import { StyleSheet } from 'react-native';
import { lightGray } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightGray,
		alignItems: 'center',
	},
	header: {
		width: '100%',
		marginBottom: '5%',
	},
	input: {
		minHeight: 48,
		width: '80%',
		marginTop: '3.8%',
	},
	button: {
		marginTop: '7%',
		minHeight: 48,
		width: '85%',
	},
});
