import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

const OptionConfig = ({ textButton, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.text}>{textButton}</Text>
		</TouchableOpacity>
	);
};

export { OptionConfig };

