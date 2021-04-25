import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const Header = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>Meus Veículos Privados</Text>
		</View>
	);
};

export { Header };

