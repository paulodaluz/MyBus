import { StyleSheet } from 'react-native';
import { black, orange, purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: '17%',
		backgroundColor: purple,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		paddingTop: '14%',
		paddingLeft: '6%',
	},
	infoNameTitle: {
		color: white,
		fontWeight: 'bold',
		fontSize: 12,
	},
	infoTitle: {
		color: white,
		fontSize: 28,
		fontWeight: 'bold',
	},
	body: {
		backgroundColor: purple,
		borderRadius: 30,
		marginTop: '10%',
		height: '65%',
		paddingTop: '8%',
		paddingBottom: '8%',

		width: '95%',
		alignSelf: 'center',
	},
	infoName: {
		color: black,
		fontWeight: 'bold',
		fontSize: 12,
		paddingTop: '5%',
	},
	info: {
		color: white,
		fontSize: 28,
		fontWeight: 'bold',
	},
	price: {
		color: white,
		fontWeight: 'bold',
	},
	vehicleFunctions: {},
	button: {
		backgroundColor: orange,
		borderRadius: 30,
		height: '16%',
		width: '50%',
		alignItems: 'center',
		alignSelf: 'center',
	},
	textButton: {
		color: white,
		fontWeight: 'bold',
		paddingTop: '6%',
		fontSize: 36,
	},
});
