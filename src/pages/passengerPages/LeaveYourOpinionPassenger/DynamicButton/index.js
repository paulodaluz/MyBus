import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../../assets/icons/png/appIcon.png';
import MyBusIcon from '../../../../assets/icons/png/map/bus_icon.png';
import { styles } from './style';

const DynamicButton = ({ onPressFirstButton, onPressSecondButton, feedbackRecipient }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onPressFirstButton}
				style={
					feedbackRecipient === 'company'
						? { ...styles.dynamicButton, ...styles.selectedButton }
						: { ...styles.dynamicButton, ...styles.unSelectedButton }
				}
			>
				<Image style={styles.iconByButton} source={MyBusIcon} />

				<Text style={styles.textDynamicButton}>Transporte</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPressSecondButton}
				style={
					feedbackRecipient === 'app'
						? { ...styles.dynamicButton, ...styles.selectedButton }
						: { ...styles.dynamicButton, ...styles.unSelectedButton }
				}
			>
				<Image style={styles.iconByButton} source={AppIcon} />

				<Text style={styles.textDynamicButton}>Aplicativo MyBus</Text>
			</TouchableOpacity>
		</View>
	);
};

export { DynamicButton };

