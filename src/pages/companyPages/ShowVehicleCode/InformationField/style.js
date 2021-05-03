import { StyleSheet } from 'react-native';
import { grey, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '30%',
		paddingHorizontal: '10%',
	},
	fieldName: {
		fontSize: 16,
		color: white,
		fontWeight: 'bold',
	},
	fieldContainer: {
		height: '60%',
		backgroundColor: white,
		justifyContent: 'center',
		marginTop: '2%',
	},
	fieldInfo: {
		fontSize: 20,
		color: grey,
		fontWeight: 'bold',
		paddingLeft: '5%',
	},
});
