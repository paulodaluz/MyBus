import { StyleSheet } from 'react-native';
import { grey } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '6%',
		flexDirection: 'row',
	},
	button: {
		width: '50%',
		alignItems: 'center',
	},
	textButton: {
		fontSize: 19,
		color: grey,
		paddingTop: '6%',
	},
});
