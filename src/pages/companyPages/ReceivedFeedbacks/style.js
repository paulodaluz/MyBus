import { StyleSheet } from 'react-native';
import { black, purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
	boxTitle: {
		backgroundColor: purple,
		height: '17%',
		width: '100%',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		fontSize: 45,
		color: white,
		fontWeight: 'bold',
		paddingTop: '12%',
		paddingLeft: '10%',
	},
	secondTitle: {
		fontSize: 45,
		color: white,
		fontWeight: 'bold',
		paddingLeft: '28%',
	},
	dontHaveFeedback: {
		fontSize: 30,
		textAlign: 'center',
		paddingTop: '30%',
	},
	body: {
		height: '100%',
		alignItems: 'center',
	},
	boxOpinion: {
		backgroundColor: purple,
		width: '98%',
		borderRadius: 30,
		paddingTop: '10%',
		paddingBottom: '10%',
		marginTop: '14%',
	},
	titleNameOfVehiclee: {
		color: white,
		textAlign: 'center',
		fontSize: 40,
		fontWeight: 'bold',
	},
	nameOfItem: {
		color: black,
		fontWeight: 'bold',
		paddingLeft: '10%',
		paddingRight: '10%',
		paddingTop: '6%',
		fontSize: 15,
	},
	valueOfItem: {
		color: white,
		fontWeight: 'bold',
		paddingLeft: '10%',
		paddingRight: '10%',
		fontSize: 22,
	},
});
