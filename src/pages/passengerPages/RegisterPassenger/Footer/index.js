import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const Footer = ({ onPress }) => {
	return (
		<View>
			<Text style={styles.text}>
				Criando sua conta você concorda com {'\n'} nossos{' '}
				<Text style={styles.spotlightText}>Termos de Uso</Text>
			</Text>

			<Text style={styles.text}>
				Você já tem uma conta?{' '}
				<TouchableOpacity onPress={onPress}>
					<Text style={styles.spotlightText}>Entrar</Text>
				</TouchableOpacity>
			</Text>
		</View>
	);
};

export { Footer };

