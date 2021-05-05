import { StyleSheet } from 'react-native';
import { purple } from '../../../styles/colors';

export const styles = StyleSheet.create({
	closeButtonContainer: {
		alignSelf: 'flex-end',
		marginBottom: '3%',
	},
	body: {
		backgroundColor: purple,
		borderRadius: 30,
		marginTop: '14%',
		height: 560,
		paddingTop: '2%',
		width: '95%',
		alignSelf: 'center',
	},
	crossIcon: {
		height: 35,
		width: 35,
		marginRight: '4%',
		marginTop: '1%',
	},
	button: {
		height: '16%',
		width: '50%',
		alignSelf: 'center',
	},
});
