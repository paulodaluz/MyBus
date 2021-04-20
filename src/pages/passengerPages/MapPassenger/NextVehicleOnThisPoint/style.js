import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '92%',
		height: '34%',
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: '3%',
		paddingLeft: '8%',
		paddingRight: '8%',
		marginTop: '40%',
		marginLeft: '4%',
		marginRight: '4%',
	},
	containerTitle: {
		flexDirection: 'row',
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
		height: '20%',
		width: '85%',
		alignSelf: 'center',
		marginTop: '8%',
	},
});
