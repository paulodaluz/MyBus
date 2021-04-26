import { StyleSheet } from 'react-native';
import { grey } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '46%',
		alignItems: 'center',
	},
	hideBusNameInput: {
		height: '30%',
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
		height: '65%',
		width: '90%',
	},
	inputSpacing: {
		marginTop: '3%',
	},
	inputFeedback: {
		height: '55%',
		width: '90%',
	},
});
