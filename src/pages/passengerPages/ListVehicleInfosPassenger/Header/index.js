import React from 'react';
import { Image, Text, View } from 'react-native';
import clock_icon from '../../../../assets/icons/png/clock_icon.png';
import { styles } from './style';

const Header = ({ name, time }) => {
	return (
		<View style={styles.header}>
			<View>
				<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
				<Text style={styles.infoTitle}>{name}</Text>
			</View>
			<View>
				<Image style={styles.clockIcon} source={clock_icon} />
				<Text style={styles.infoNameTitle}>12 min</Text>
			</View>
		</View>
	);
};

export { Header };

