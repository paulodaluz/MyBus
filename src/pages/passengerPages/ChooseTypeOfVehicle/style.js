import { StyleSheet } from 'react-native';
import { grey, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		alignItems: 'center',
		height: '100%',
	},
	header: {
		height: '38%',
		width: '100%',
		marginBottom: 40,
	},
	description: {
		fontSize: 18,
		color: grey,
		textAlign: 'center',
		paddingVertical: '5%',
		paddingHorizontal: '10%',
	},
	privateContainer: {
		width: '100%',
		alignItems: 'center',
	},
	containerInput: {
		width: '80%',
		height: 60,
		borderColor: grey,
		borderWidth: 1,
	},
	inputVehicleCode: {
		height: '100%',
		textAlign: 'center',
	},
	containerScanQRCode: {
		width: '80%',
		marginTop: '2%',
		flexDirection: 'row',
	},
	QRCodeIcon: {
		width: 15,
		height: 15,
	},
	QRCodeText: {
		color: grey,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		marginLeft: '1%',
	},
	message: {
		fontSize: 15,
		color: grey,
		textAlign: 'center',
	},
	spotlightWord: {
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
	button: {
		height: '8%',
		width: '85%',
		margin: '10%',
	},
});
