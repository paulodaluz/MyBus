import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const Header = ({ title, subtitle }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>

			<Text style={styles.subtitle}>{subtitle}</Text>
		</View>
	);
};

export { Header };

