import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { purple, white, orange, black } from '../../../styles/colors';
import MyBusIcon from '../../../assets/icons/svg/my_bus_icon.svg';
import { getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { styles } from './style';

export default function ListVehicleInfosCompany({ navigation, route }) {
	const { registrationPlate, receivedVehicle } = route.params;

	const [name, setName] = useState("");
	const [status, setStatus] = useState("Operando normalmente");
	const [idToPassangers, setIdToPassangers] = useState("");
	const [plateId, setPlateId] = useState("");
	const [password, setPassword] = useState("");
	const [price, setPrice] = useState("");

	useEffect(() => {
		const getVehicleData = async () => {

			if(receivedVehicle) {
				setName(receivedVehicle.name);
				setIdToPassangers(receivedVehicle.id_to_passengers);
				setPlateId(receivedVehicle.id_to_share_localization);
				setPassword(receivedVehicle.password_to_share_localization);
				setPrice(receivedVehicle.price);
			}
			if(!receivedVehicle) {
				const [vehicle, vehicleFunctions] = await Promise.all([
					getVehicle({registrationPlate}),
					getVehicleFunction({registrationPlate})]);

				setName(vehicle.name);
				setIdToPassangers(vehicle.id_to_passengers);
				setPlateId(vehicle.id_to_share_localization);
				setPassword(vehicle.password_to_share_localization);

				setPrice(vehicleFunctions.price_transport);
			}
		}

		getVehicleData();
	}, [])

	return(
		<View>
			<View style={styles.header}>
				{/* <Image
						style={{width: 30, height: 30}}
						source={MyBusIcon}
					/> */}
				<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
				<Text style={styles.infoTitle}>{name}</Text>

			</View>

			<View style={styles.body}>

				<View style={{paddingLeft: "8%"}}>
					<Text style={styles.info}>{name}</Text>

					<Text style={styles.infoName}>Situação Atual</Text>
					<Text style={styles.info}>{status}</Text>

					<Text style={styles.infoName}>Código do Veículo</Text>
					<Text style={styles.info}>{idToPassangers}</Text>

					<Text style={styles.infoName}>Usuário do Motorista</Text>
					<Text style={styles.info}>{plateId}</Text>

					<Text style={styles.infoName}>Senha do Motorista</Text>
					<Text style={styles.info}>{password}</Text>

					<View style={styles.vehicleFunctions}>
						<Text style={styles.price}>{price}</Text>
					</View>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => console.log()}>
						<Text style={styles.textButton}>EDITAR</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
