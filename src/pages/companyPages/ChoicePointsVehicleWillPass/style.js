import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '76%',
	},
	button: {
		height: '10%',
		width: '100%',
		shadowOpacity: 100,
	},
});
