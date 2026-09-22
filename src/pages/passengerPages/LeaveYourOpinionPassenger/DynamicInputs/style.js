import { StyleSheet } from 'react-native';
import { grey } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
	},
	hideBusNameInput: {
		minHeight: 48,
		width: '100%',
		alignItems: 'center',
	},
	fieldName: {
		color: grey,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		marginLeft: '5%',
		marginBottom: '1%',
	},
	inputTransportName: {
		minHeight: 48,
		width: '90%',
	},
	inputSpacing: {
		marginTop: '3%',
	},
	inputFeedback: {
		minHeight: 48,
		width: '90%',
	},
});
