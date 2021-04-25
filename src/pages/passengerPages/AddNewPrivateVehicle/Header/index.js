import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const Header = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Adicionar novo Veículo</Text>
			<Text style={styles.subTitle}>
				Adicione o código de um novo{'\n'}veículo para ver suas informações
			</Text>
		</View>
	);
};

export { Header };

