import { StyleSheet } from 'react-native';
import { grey, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		height: 110,
		marginTop: '4%',
	},
	dynamicButton: {
		height: '80%',
		width: '50%',
		alignItems: 'center',
		padding: '3%',
	},
	selectedButton: {
		backgroundColor: '#E7E9ED',
	},
	unSelectedButton: {
		backgroundColor: white,
	},
	iconByButton: {
		height: 40,
		width: 40,
		marginBottom: '2%',
	},
	textDynamicButton: {
		fontSize: 18,
		color: grey,
		fontWeight: 'bold',
	},
});
