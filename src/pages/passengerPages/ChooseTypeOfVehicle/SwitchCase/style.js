import { StyleSheet } from 'react-native';
import { grey, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	button: {
		width: '50%',
		alignItems: 'center',
	},
	selectedButton: {
		backgroundColor: '#E7E9ED',
	},
	unselectedButton: {
		backgroundColor: white,
	},
	textButton: {
		fontSize: 19,
		color: grey,
		paddingTop: '6%',
	},
});
