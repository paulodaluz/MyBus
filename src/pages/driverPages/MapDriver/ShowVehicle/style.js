import { StyleSheet } from 'react-native';
import { black, purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '92%',
		height: '64%',
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: '3%',
		paddingLeft: '8%',
		paddingRight: '8%',
		marginTop: '16%',
		marginLeft: '4%',
		marginRight: '4%',
	},
	closeButtonContainer: {
		alignSelf: 'flex-end',
		marginBottom: '3%',
	},
	icon: {
		height: 35,
		width: 35,
		marginRight: '3%',
	},
	title: {
		display: 'flex',
		flexDirection: 'row',
	},
	typeOfInfo: {
		color: black,
		fontWeight: 'bold',
		fontSize: 13,
		paddingTop: '5%',
	},
	info: {
		color: white,
		fontSize: 28,
		fontWeight: 'bold',
	},
	button: {
		height: '18%',
		width: '54%',
		alignSelf: 'center',
	},
});
