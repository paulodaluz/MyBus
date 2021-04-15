import { Dimensions, StyleSheet } from 'react-native';
import { purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '90%',
	},
	menu: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '4%',
	},
	addVehicleButton: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingLeft: '3%',
	},
	configButton: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingRight: '3%',
	},
	buttonText: {
		color: white,
		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
	},
	containerTitleModal: {
		flexDirection: 'row',
	},
	containerModal: {
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
	titleModal: {
		fontSize: 19,
		fontWeight: 'bold',
		color: white,
		marginBottom: '8%',
		marginTop: '3%',
	},
	itemModal: {
		flexDirection: 'row',
		width: '100%',
	},
	textVehicleModal: {
		fontSize: 16,
		fontWeight: 'bold',
		color: white,
		marginRight: '2%',
	},
	divisor: {
		height: 1,
		backgroundColor: '#A39BBD',
		marginTop: '4%',
		marginBottom: '2%',
	},
	buttonModal: {
		height: '20%',
		width: '85%',
		alignSelf: 'center',
		marginTop: '8%',
	},
});
