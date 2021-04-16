import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const Menu = ({ onPressFirstButton, textFirstButton, onPressSecondButton, textSecondButton }) => (
	<View style={styles.container}>
		<TouchableOpacity onPress={onPressFirstButton} style={styles.firstButton}>
			<Text style={styles.textButton}>{textFirstButton}</Text>
		</TouchableOpacity>

		<TouchableOpacity onPress={onPressSecondButton} style={styles.secondButton}>
			<Text style={styles.textButton}>{textSecondButton}</Text>
		</TouchableOpacity>
	</View>
);

export { Menu };

