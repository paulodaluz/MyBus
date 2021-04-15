import React, { useState, useLayoutEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { removePrivateVehicle } from '../../../backend/users/Passenger';
import { getMyVehicles } from '../../../backend/vehicles/Vehicle';
import { purple, white, red } from "../../../styles/colors";
import { styles } from './style';

export default function ListMyLinkedVehicles({ navigation, route }) {
	const { uid } = route.params;

	const [vehicles, setVehicles] = useState([]);

	const removeVehicle = async (item) => {
		await removePrivateVehicle(uid, item.id_to_passengers, item.registration_plate);
		await getVehicleData();
	}

	const getVehicleData = async () => {
		setVehicles(await getMyVehicles(uid));
	}

	useLayoutEffect(() => {
		getVehicleData();
	}, [])

	const renderVehicle = ({ item }) => (
		<View style={styles.box}>
			<Text style={styles.infoName}>Nome do Veículo:</Text>
			<Text style={styles.info}>{item.name}</Text>
			<Text style={styles.infoName}>Código para Passageiros:</Text>
			<Text style={styles.info}>{item.id_to_passengers}</Text>
			<Text style={styles.infoName}>Situação Atual:</Text>
			<Text style={styles.info}>{"Operando Normalmente"}</Text>

			<View style={styles.vehicleFunctions}>
				<Text style={styles.price}></Text>
			</View>
			<View style={styles.containerDivider}>
        <View style={styles.divider}/>
      </View>

			<TouchableOpacity onPress={() => removeVehicle(item)}
				style={styles.removeButton}>
					<Text style={styles.buttonText}>Remover</Text>
			</TouchableOpacity>

		</View>
  );

	return (
		<View>
			<View style={styles.header}>
				<Text style={styles.title}>Meus Veículos Privados</Text>
			</View>
			<View style={styles.body}>
				<FlatList
					data={vehicles}
					renderItem={renderVehicle}
					keyExtractor={item => item.id}
				/>
			</View>
		</View>
	)
}
