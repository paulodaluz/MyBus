import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '90%',
	},
	warning: {
		height: '12%',
	},
	modal: {
		maxHeight: 10,
	},
	placeholderIcon: {
		height: 40,
		width: 40,
	},
});
