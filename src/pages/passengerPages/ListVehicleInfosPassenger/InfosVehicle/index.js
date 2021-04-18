import React from 'react';
import { Image, Text, View } from 'react-native';
import bus_icon from '../../../../assets/icons/png/map/bus_icon.png';
import { styles } from './style';

const InfosVehicle = ({ name, status, idToPassangers }) => {
	return (
		<View style={styles.container}>
			<View style={styles.nameVehicles}>
				<Image style={styles.busIcon} source={bus_icon} />
				<Text style={styles.nameOfVehicle}>{name}</Text>
			</View>

			<Text style={styles.infoName}>Situação Atual</Text>
			<Text style={styles.info}>{status}</Text>

			<Text style={styles.infoName}>Código do Veículo</Text>
			<Text style={styles.info}>{idToPassangers}</Text>
		</View>
	);
};

export { InfosVehicle };

