import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const Header = ({ title, subtitle = '' }) => {
	if (subtitle) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>

				<Text style={styles.subtitle}>{subtitle}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.singleTitle}>{title}</Text>
		</View>
	);
};

export { Header };

