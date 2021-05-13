import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { white } from '../../../../styles/colors';
import { styles } from './style';

const SwitchCase = ({ typeOfVehicleToList, onPressFirstSwitch, onPressSecondSwitch }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onPressFirstSwitch}
				style={
					typeOfVehicleToList === 'public'
						? { ...styles.button, backgroundColor: '#E7E9ED' }
						: { ...styles.button, backgroundColor: white }
				}
			>
				<Text style={styles.textButton}>Público</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPressSecondSwitch}
				style={
					typeOfVehicleToList === 'private'
						? { ...styles.button, backgroundColor: '#E7E9ED' }
						: { ...styles.button, backgroundColor: white }
				}
			>
				<Text style={styles.textButton}>Privado</Text>
			</TouchableOpacity>
		</View>
	);
};

export { SwitchCase };

