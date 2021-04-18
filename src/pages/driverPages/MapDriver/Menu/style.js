import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		width: '33%',
		marginLeft: '2%',
		marginRight: '7%',
	},
	containerIcon: {
		alignItems: 'center',
	},
	icon: {
		height: 60,
		width: 60,
	},
	buttonText: {
		color: white,
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'center',
	},
	mainButton: {
		backgroundColor: '#9800FF',
		borderRadius: 100,
		width: '18%',
		height: '88%',
		alignItems: 'center',
	},
	mainIcon: {
		alignItems: 'center',
		paddingTop: '8%',
	},
	busIconMenu: {
		height: 60,
		width: 60,
	},
});
