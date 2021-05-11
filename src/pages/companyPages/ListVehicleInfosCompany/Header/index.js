import React from 'react';
import { Image, Text, View } from 'react-native';
import GreenBusIcon from '../../../../assets/icons/png/green_bus_icon.png';
import { styles } from './style';

const Header = ({ vehicleName }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
				<Text style={styles.infoTitle}>{vehicleName}</Text>
			</View>

			<Image style={styles.busIcon} source={GreenBusIcon} />
		</View>
	);
};

export { Header };

