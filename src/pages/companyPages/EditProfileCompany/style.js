import { StyleSheet } from 'react-native';
import { grey } from '../../../styles/colors';

export const styles = StyleSheet.create({
	header: {
		height: '18%',
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
		height: '10%',
		fontSize: 16,
		borderWidth: 1,
		borderColor: grey,
		paddingLeft: '5%',
	},
	input: {
		height: '10%',
	},
	button: {
		height: '11%',
		width: '100%',
		marginTop: '18%',
	},
});
