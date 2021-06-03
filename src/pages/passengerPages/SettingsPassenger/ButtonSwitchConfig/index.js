import React from 'react';
import { Switch, Text, View } from 'react-native';
import { darkGrey, lightGray } from '../../../../styles/colors';
import { styles } from './style';

const ButtonSwitchConfig = ({ value, onValueChange }) => {
	return (
		<View style={styles.button}>
			<Text style={styles.text}>Apenas veículos privados</Text>
			<Switch
				style={styles.buttonListedVehicles}
				trackColor={{ false: darkGrey, true: darkGrey }}
				thumbColor="#13E36F"
				ios_backgroundColor={lightGray}
				onValueChange={onValueChange}
				value={value}
				tex
			/>
		</View>
	);
};

export { ButtonSwitchConfig };

