import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './style';

const Input = ({
	value,
	onChangeText,
	placeholder,
	textContentType,
	keyboardType = 'default',
	secureTextEntry = false,
}) => {
	return (
		<TextInput
			style={styles.input}
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
			textContentType={textContentType}
			keyboardType={keyboardType}
			secureTextEntry={secureTextEntry}
		/>
	);
};

export { Input };

