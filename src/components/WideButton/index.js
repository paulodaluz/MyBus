import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

const WideButton = ({ onPress, textButton, backgroundColor }) => (
	<TouchableOpacity onPress={onPress} style={{ ...styles.button, backgroundColor }}>
		<Text style={{ ...styles.text }}>{textButton}</Text>
	</TouchableOpacity>
);

export { WideButton };

