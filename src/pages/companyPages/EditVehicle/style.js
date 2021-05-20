import { StyleSheet } from 'react-native';
import { orange, purple, white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	body: {
		width: '92%',
		height: '83%',
		borderRadius: 30,
		paddingTop: '5%',
		paddingHorizontal: '10%',
		marginHorizontal: '4%',
		backgroundColor: purple,
		marginTop: '6%',
	},
	inputName: {
		fontSize: 20,
		color: white,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		paddingBottom: '2%',
	},
	input: {
		width: '98%',
		height: '7%',
		fontSize: 25,
		fontWeight: 'bold',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: orange,
		paddingHorizontal: '8%',
		marginBottom: '8%',
		backgroundColor: white,
	},
	text: {
		fontSize: 23,
		color: white,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		textAlign: 'center',
	},
	switch: {
		paddingTop: '6%',
	},
	updateButton: {
		width: '60%',
		height: '15%',
		alignSelf: 'center',
		marginTop: '6%',
	},
});
