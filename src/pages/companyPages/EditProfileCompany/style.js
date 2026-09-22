import { StyleSheet } from 'react-native';
import { grey } from '../../../styles/colors';

export const styles = StyleSheet.create({
	header: {
		width: '100%',
	},
	body: {
		paddingTop: '8%',
		paddingHorizontal: '10%',
	},
	inputName: {
		color: grey,
		fontSize: 16,
		paddingTop: '6%',
	},
	inputButton: {
		minHeight: 48,
		fontSize: 16,
		borderWidth: 1,
		borderColor: grey,
		paddingLeft: '5%',
	},
	input: {
		minHeight: 48,
	},
	button: {
		minHeight: 48,
		width: '100%',
		marginTop: '18%',
	},
});
