import { StyleSheet } from 'react-native';
import { purple, white } from '../../../../styles/colors';

export const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: '17%',
		backgroundColor: purple,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		paddingTop: '14%',
		paddingLeft: '6%',
		paddingRight: '6%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	infoNameTitle: {
		color: white,
		fontWeight: 'bold',
		fontSize: 12,
	},
	infoTitle: {
		color: white,
		fontSize: 28,
		fontWeight: 'bold',
	},
	clockIcon: { height: 40, width: 40 },
});
