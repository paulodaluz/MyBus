import { StyleSheet } from 'react-native';
import { lightGray, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightGray,
		alignItems: 'center',
	},
	header: {
		height: '38%',
		width: '100%',
	},
	input: {
		height: '8%',
		width: '85%',
		marginTop: '18%',
	},
	centerTitle: {
		color: white,
		fontSize: 50,
		fontWeight: 'bold',
		paddingTop: '20%',
		paddingLeft: '7%',
		paddingRight: '10%',
	},
	forgotPasswordButton: {
		marginTop: '14%',
		height: '8%',
		width: '85%',
		marginBottom: '3%',
	},
});
