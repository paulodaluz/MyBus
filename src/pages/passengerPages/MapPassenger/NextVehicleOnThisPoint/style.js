import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: '3%',
		paddingLeft: '8%',
		paddingRight: '8%',
	},
	containerTitle: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '90%',
	},
	iconTitle: {
		height: 35,
		width: 35,
		marginRight: '3%',
	},
	title: {
		fontSize: 19,
		fontWeight: 'bold',
		color: white,
		marginBottom: '8%',
		marginTop: '3%',
	},
	item: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		width: '100%',
	},
	containerVehicleTime: {
		flexDirection: 'row',
	},
	vehicleName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: white,
	},
	clockIcon: {
		height: 20,
		width: 20,
		marginRight: '8%',
	},
	timeVehicle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: white,
	},
	button: {
		minHeight: 48,
		width: '85%',
		alignSelf: 'center',
		marginTop: '8%',
	},
});
