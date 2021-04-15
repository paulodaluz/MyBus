import { StyleSheet, Dimensions } from 'react-native';
import { black, darkGrey, orange, purple, white } from '../../../styles/colors';

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
	sharingLocalization: {
		backgroundColor: purple,
		width: '100%',
		height: '10%',
		resizeMode: 'cover',
	},
	sharingLocalizationText: {
		color: white,
		textAlign: 'center',
		paddingTop: '10%',
		fontWeight: 'bold',
		fontSize: 20,
	},
	menu: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: 'row',
		alignItems: 'center',
	},
	mainButton: {
		backgroundColor: '#9800FF',
		borderRadius: 100,
		width: '18%',
		height: '88%',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	mainIcon: {
		alignItems: 'center',
		paddingTop: '8%',
	},
	busIconMenu: {
		height: 60,
		width: 60,
	},
	button: {
		width: '33%',
		marginLeft: '2%',
		marginRight: '7%',
	},
	shareLocalizationButton: {
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	configButton: {
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	buttonText: {
		color: darkGrey,
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'center',
	},
	bodyModal: {
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
	titleModal: {
		display: 'flex',
		flexDirection: 'row',
	},
	infoNameModal: {
		color: black,
		fontWeight: 'bold',
		fontSize: 13,
		paddingTop: '5%',
	},
	infoModal: {
		color: white,
		fontSize: 28,
		fontWeight: 'bold',
	},
	vehicleFunctionsModal: {
		flexDirection: 'row-reverse',
		marginTop: '10%',
	},
	priceModal: {
		display: 'flex',
		flexDirection: 'row',
	},
	priceImg: {
		height: 35,
		width: 35,
		marginRight: '2%',
	},
	priceTextModal: {
		color: white,
		fontWeight: 'bold',
		fontSize: 28,
	},
	airConditioningImg: {
		height: 40,
		width: 40,
		marginRight: '2%',
	},
	toiletPaperImg: {
		height: 40,
		width: 40,
		marginRight: '2%',
	},
	wheelchairImg: {
		height: 40,
		width: 40,
		marginRight: '2%',
	},
	wifiImg: {
		height: 40,
		width: 40,
		marginRight: '2%',
	},
	buttonEditVehicleModal: {
		backgroundColor: orange,
		borderRadius: 30,
		height: '10%',
		width: '50%',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: '10%',
	},
	textButtonEditVehicleModal: {
		color: white,
		fontWeight: 'bold',
		paddingTop: '5%',
		fontSize: 34,
	},
});
