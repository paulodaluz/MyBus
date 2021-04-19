import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './style';

const Input = ({ value, onChangeText, placeholder, textContentType, secureTextEntry = false }) => {
	return (
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			value={value}
			textContentType={textContentType}
			secureTextEntry={secureTextEntry}
			onChangeText={onChangeText}
		/>
	);
};

export { Input };

