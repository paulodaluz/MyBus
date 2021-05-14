import React from 'react';
import { Switch, Text, View } from 'react-native';
import { darkGrey } from '../../styles/colors';
import { styles } from './style';

const buttonColor = { false: darkGrey, true: darkGrey };

const SwitchFunction = ({ text, value, onValueChange }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.switchName}>{text}</Text>
			<Switch
				style={styles.switchButton}
				trackColor={buttonColor}
				ios_backgroundColor="#E5E9F2"
				onValueChange={onValueChange}
				value={value}
			/>
		</View>
	);
};

export { SwitchFunction };

