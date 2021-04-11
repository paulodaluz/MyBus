import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style'

const Button = ({
	onPress,
	textButton,
	backgroundColor,
	textColor
}) => (
	<TouchableOpacity onPress={onPress} style={{...styles.button, backgroundColor}}>
		<Text style={{ ...styles.text, color: textColor }}>{textButton}</Text>
	</TouchableOpacity>
)

export { Button };
