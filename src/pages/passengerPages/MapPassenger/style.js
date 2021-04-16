import { Dimensions, StyleSheet } from 'react-native';
import { white } from '../../../styles/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '90%',
	},
});
