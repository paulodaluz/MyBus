import { StyleSheet } from 'react-native';
import { grey } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
	header: {
		width: '100%',
	},
	body: {
		paddingTop: '2%',
		paddingRight: '10%',
		paddingLeft: '10%',
	},
	fieldName: {
		color: grey,
		fontSize: 16,
		paddingTop: '6%',
		paddingBottom: '1%',
	},
	inputButton: {
		minHeight: 48,
		width: '100%',
	},
	unmutableInput: {
		minHeight: 48,
		width: '100%',
		borderWidth: 1,
		borderColor: grey,
		backgroundColor: 'transparent',
		paddingLeft: '5%',
	},
	unmutableInputText: {
		paddingTop: '6%',
		fontSize: 17,
		color: grey,
	},
	updateButton: {
		minHeight: 48,
		marginTop: '10%',
	},
});
