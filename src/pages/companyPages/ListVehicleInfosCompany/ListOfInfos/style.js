import { StyleSheet } from 'react-native';
import { black, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: '8%',
	},
	header: {
		flexDirection: 'row',
	},
	busIcon: {
		width: 34,
		height: 34,
		marginRight: 5,
	},
	info: {
		fontSize: 28,
		color: white,
		fontWeight: 'bold',
	},
	infoName: {
		fontSize: 12,
		color: black,
		fontWeight: 'bold',
		paddingTop: '5%',
	},
});
