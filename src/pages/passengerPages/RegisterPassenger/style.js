import { StyleSheet } from 'react-native';
import { white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
	},
	header: {
		height: '28%',
		marginBottom: '10%',
		width: '100%',
	},
	inputButton: {
		height: '8%',
		width: '85%',
		marginTop: '4%',
	},
	registerButton: {
		marginTop: '5%',
		height: '8%',
		width: '85%',
	},
});
