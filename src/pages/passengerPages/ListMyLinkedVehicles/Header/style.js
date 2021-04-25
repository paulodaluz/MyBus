import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

const styles = StyleSheet.create({
	header: {
		backgroundColor: purple,
		height: '23%',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		color: white,
		fontWeight: 'bold',
		fontSize: 50,
		paddingTop: '12%',
		textAlign: 'center',
	},
});

export { styles };

