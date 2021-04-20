import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

const Footer = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Text style={styles.text}>
				Deseja fazer o login? <Text style={styles.spotlightText}>Entrar</Text>
			</Text>
		</TouchableOpacity>
	);
};

export { Footer };

