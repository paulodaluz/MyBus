import React from 'react';
import { Switch, Text, View } from 'react-native';
import { grey, lightGray } from '../../../../styles/colors';
import { styles } from './style';

const ButtonSwitchConfig = ({ value, onValueChange }) => {
	return (
		<View style={styles.button}>
			<Text style={styles.text}>Apenas veículos privados</Text>
			<Switch
				style={styles.buttonListedVehicles}
				trackColor={{ false: grey, true: grey }}
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

