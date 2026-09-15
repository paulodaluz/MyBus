import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '90%',
	},
	busIcon: {
		height: 20,
		width: 20,
	},
});
