import { StyleSheet } from 'react-native';
import { grey } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		height: '12%',
		paddingTop: '6%',
	},
	buttonFeedbackApp: {
		width: '100%',
		padding: '3%',
		alignItems: 'center',
	},
	iconByButton: {
		width: 50,
		height: 50,
	},
	textFeedbackApp: {
		fontSize: 18,
		fontWeight: 'bold',
		color: grey,
		paddingTop: '2%',
	},
});
