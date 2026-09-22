import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	button: {
		flex: 1,
		padding: 8,
	},
	containerIcon: {
		alignItems: 'center',
	},
	icon: {
		height: 40,
		width: 40,
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
		minWidth: 64,
		minHeight: 48,
		alignItems: 'center',
	},
	mainIcon: {
		alignItems: 'center',
		paddingTop: '8%',
	},
	busIconMenu: {
		height: 40,
		width: 40,
	},
});
