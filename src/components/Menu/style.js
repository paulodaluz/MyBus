import { StyleSheet } from 'react-native';
import { purple, white } from '../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: '4%',
	},
	firstButton: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingLeft: '3%',
	},
	secondButton: {
		width: '50%',
		height: '100%',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingRight: '3%',
	},
	textButton: {
		color: white,
		fontWeight: 'bold',
		fontSize: 17,
		textAlign: 'center',
	},
});
