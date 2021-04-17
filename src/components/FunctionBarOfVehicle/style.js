import { StyleSheet } from 'react-native';
import { white } from '../../styles/colors';

export const styles = StyleSheet.create({
	vehicleFunctionsContainer: {
		flexDirection: 'row-reverse',
		marginTop: '10%',
		paddingLeft: '5%',
		paddingRight: '5%',
	},
	standardIconStyle: {
		height: 40,
		width: 40,
		marginRight: '2%',
	},
	priceContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	priceIcon: {
		height: 35,
		width: 35,
		marginRight: '2%',
	},
	priceText: {
		color: white,
		fontWeight: 'bold',
		fontSize: 28,
	},
});
