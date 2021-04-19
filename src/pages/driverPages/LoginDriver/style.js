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
		height: '38%',
		marginBottom: '10%',
	},
	input: {
		height: '8%',
		width: '85%',
		marginTop: '4%',
	},
	button: {
		marginTop: '5%',
		height: '9%',
		width: '85%',
		paddingTop: '4%',
	},
});
