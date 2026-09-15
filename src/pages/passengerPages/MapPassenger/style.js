import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '90%',
	},
	busStopIcon: {
		height: 40,
		width: 40,
	},
	busIcon: {
		height: 30,
		width: 30,
	},
	passengerIcon: {
		height: 50,
		width: 50,
	},
});
