import React from 'react';
import { Image, Switch, Text, View } from 'react-native';
import bus_icon from '../../../../assets/icons/png/map/bus_icon.png';
import { darkGrey } from '../../../../styles/colors';
import { styles } from './style';

const buttonColor = { false: 'black', true: darkGrey };

const InfosVehicle = ({ name, status, idToPassangers, valueReminder, onChangeValueReminder }) => {
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

			<View style={styles.reminderContainer}>
				<Switch
					style={styles.switchButton}
					trackColor={buttonColor}
					ios_backgroundColor="#E5E9F2"
					value={valueReminder}
					onValueChange={onChangeValueReminder}
				/>

				<Text style={styles.textReminder}>Adicionar Lembrete</Text>
			</View>
		</View>
	);
};

export { InfosVehicle };

