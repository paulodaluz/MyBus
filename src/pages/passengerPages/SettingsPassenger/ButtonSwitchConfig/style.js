import { StyleSheet } from 'react-native';
import { white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	button: {
		height: 58,
		borderColor: '#976DD0',
		borderWidth: 1,
		backgroundColor: white,
		paddingHorizontal: '5%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 25,
		alignSelf: 'center',
	},
	buttonListedVehicles: {
		alignSelf: 'center',
	},
});
