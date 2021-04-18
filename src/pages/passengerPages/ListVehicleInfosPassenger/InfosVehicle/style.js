import { StyleSheet } from 'react-native';
import { black, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		paddingLeft: '8%',
	},
	nameVehicles: {
		flexDirection: 'row',
	},
	busIcon: {
		width: 30,
		height: 30,
	},
	nameOfVehicle: {
		marginLeft: '2%',
		color: white,
		fontSize: 28,
		fontWeight: 'bold',
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
});
