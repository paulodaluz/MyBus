import { StyleSheet } from 'react-native';
import { darkGrey, grey, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
	},
	header: {
		width: '100%',
		height: '32%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '10%',
	},
	titles: {
		flexDirection: 'row',
		paddingLeft: '4%',
	},
	mainTitle: {
		fontSize: 80,
		color: '#343F4B',
		fontWeight: 'bold',
	},
	subTitle: {
		fontSize: 24,
		color: darkGrey,
		paddingTop: '13%',
		paddingLeft: '2%',
	},
	message: {
		fontSize: 18,
		color: grey,
		textAlign: 'center',
		paddingVertical: '6%',
	},
	button: {
		marginTop: '5%',
		height: '10%',
		width: '85%',
	},
	body: {
		height: '70%',
	},
	containerDivider: {
		paddingVertical: 10,
		display: 'flex',
	},
	divider: {
		height: 5,
		backgroundColor: '#dfdfdf',
	},
	activeDivider: {
		height: '100%',
		backgroundColor: grey,
		borderRadius: 5,
	},
	imageHeader: {
		width: '94%',
		resizeMode: 'contain',
	},
	gestureContainer: {
		width: '100%',
		height: '90%',
		display: 'flex',
		alignItems: 'center',
	},
});
