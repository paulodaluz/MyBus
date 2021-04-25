import { StyleSheet } from 'react-native';
import { grey } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	qrCodeIcon: {
		width: 15,
		height: 15,
		marginRight: 4,
	},
	text: {
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		color: grey,
	},
});
