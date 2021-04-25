import React from 'react';
import { Text, View } from 'react-native';
import { Divisor } from '../../../../components/Divisor';
import { MiddleButton } from '../../../../components/MiddleButton';
import { red } from '../../../../styles/colors';
import { styles } from './style';

const BoxWithInfoVehicles = ({ item, onPress }) => {
	return (
		<View style={styles.box}>
			<Text style={styles.infoName}>Nome do Veículo:</Text>
			<Text style={styles.info}>{item.name}</Text>
			<Text style={styles.infoName}>Código do Veículo:</Text>
			<Text style={styles.info}>{item.id_to_passengers}</Text>
			<Text style={styles.infoName}>Situação Atual:</Text>

			<Divisor />

			<View style={styles.button}>
				<MiddleButton onPress={onPress} textButton={'Remover'} backgroundColor={red} />
			</View>
		</View>
	);
};

export { BoxWithInfoVehicles };

