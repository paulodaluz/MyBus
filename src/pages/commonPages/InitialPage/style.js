import { StyleSheet } from 'react-native';
import { darkGrey, grey, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
	},
	header: {
		paddingTop: '10%',
		width: '100%',
		height: '32%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titles: {
		flexDirection: 'row',
		paddingLeft: '4%',
	},
	mainTitle: {
		color: '#343F4B',
		fontWeight: 'bold',
		fontSize: 80,
	},
	subTitle: {
		color: darkGrey,
		paddingTop: '13%',
		paddingLeft: '2%',
		fontSize: 24,
	},
	loginButton: {
		marginTop: '5%',
		height: '10%',
		width: '85%',
	},
	registerButton: {
		marginTop: '5%',
		height: '10%',
		width: '85%',
	},
	driverLogin: {
		marginTop: '5%',
		height: '10%',
		width: '85%',
	},
	message: {
		fontSize: 18,
		color: grey,
		textAlign: 'center',
		paddingTop: '8%',
		paddingBottom: '5%',
		paddingLeft: '15%',
		paddingRight: '10%',
	},
	bodyPage: {
		height: '70%',
		alignItems: 'center',
	},
	containerDivider: {
		paddingVertical: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	divider: {
		width: '100%',
		height: 5,
		backgroundColor: '#dfdfdf',
	},
	activeDivider: {
		height: '100%',
		backgroundColor: grey,
		borderRadius: 5,
	},
	imageHeader: {
		resizeMode: 'contain',
	},
	gestureContainer: {
		width: '100%',
		height: '90%',
		display: 'flex',
		alignItems: 'center',
	},
	loginDriver: {
		height: '90%',
	},
});
