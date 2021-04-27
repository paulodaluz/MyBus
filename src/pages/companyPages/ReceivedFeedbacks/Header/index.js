import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const Header = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Feedbacks</Text>
			<Text style={styles.secondTitle}>Recebidos</Text>
		</View>
	);
};

export { Header };

