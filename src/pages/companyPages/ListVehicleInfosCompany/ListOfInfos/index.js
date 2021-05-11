import React from 'react';
import { Image, Text, View } from 'react-native';
import busIcon from '../../../../assets/icons/png/map/bus_icon.png';
import { styles } from './style';

const ListInfos = ({ name, status, idToPassangers, plateId, password }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={busIcon} style={styles.busIcon} />
				<Text style={styles.info}>{name}</Text>
			</View>

			<Text style={styles.infoName}>Situação Atual</Text>
			<Text style={styles.info}>{status}</Text>

			<Text style={styles.infoName}>Código do Veículo</Text>
			<Text style={styles.info}>{idToPassangers}</Text>

			<Text style={styles.infoName}>Usuário do Motorista</Text>
			<Text style={styles.info}>{plateId}</Text>

			<Text style={styles.infoName}>Senha do Motorista</Text>
			<Text style={styles.info}>{password}</Text>
		</View>
	);
};

export { ListInfos };

