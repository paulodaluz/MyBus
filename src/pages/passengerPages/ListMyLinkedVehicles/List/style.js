import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

const styles = StyleSheet.create({
	box: {
		backgroundColor: purple,
		height: 300,
		borderRadius: 35,
		padding: '5%',
		marginBottom: '2%',
		marginTop: '8%',
	},
	infoName: {
		paddingTop: '5%',
		color: white,
		fontWeight: 'bold',
		fontSize: 15,
	},
	info: {
		color: white,
		fontWeight: 'bold',
		fontSize: 28,
	},
	button: {
		height: '24%',
	},
});

export { styles };

