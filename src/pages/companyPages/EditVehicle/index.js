import { Text, View, TextInput, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

import { purple, white, orange, darkGrey } from '../../../styles/colors';
import { editVehicle, getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { updatePlateVehicleCompany } from '../../../backend/users/Company';
import { styles } from './style';

export default function EditVehicle({ navigation, route }) {
	const { uid, registration_Plate, backPage, params } = route.params;

	const [vehicleId, setVehicleId] = useState("");
	const [vehicleFunctionsId, setVehicleFunctionsId] = useState("");

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);

	const [name, setName] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [price, setPrice] = useState("");
	const [registrationPlate, setRegistrationPlate] = useState("");
	const [oldregistrationPlate, setOldRegistrationPlate] = useState("");

	const toggleSwitchBathroom = () => setThereIsBathroom(previousState => !previousState);
	const toggleSwitchAirC = () => setThereIsAirConditioning(previousState => !previousState);
	const toggleSwitchWifi = () => setThereIsWifi(previousState => !previousState);
	const toggleSwitchWheelchairSup = () => setThereIsWheelchairSupport(previousState => !previousState);
	const toggleSwitchIsPublic = () => setIsPublic(previousState => !previousState);

	const buttonColor = { false: darkGrey, true: darkGrey };

	const updateVehicle = async () => {
		const errors = await verifyInputs();

		if(errors) return;

		let vehicleInfos = {
			registrationPlate,
			name,
			isPublic
		}

		let functionsVehicle = {
			thereIsWifi,
			thereIsAirConditioning,
			thereIsBathroom,
			thereIsWheelchairSupport,
			price,
			registrationPlate
		}

		const [updatedVehicle, ] = await Promise.all([
			editVehicle(vehicleId, vehicleInfos, vehicleFunctionsId, functionsVehicle),
			updatePlateVehicleCompany(uid, oldregistrationPlate, registrationPlate)]);

		if((updatedVehicle && updatedVehicle.error)) {
			return Alert.alert('Erro ao atualizar usuário.')
		}
		if(backPage) {
			const vehicleFunctions = await getVehicleFunction({registrationPlate});
			return navigation.navigate(backPage, { ...params, vehicleFunctions });
		}
		return navigation.navigate('ListVehicleInfosCompany', { registrationPlate: updatedVehicle.registration_plate });
	}

	const verifyInputs = async () => {
		if(!name || !price || !registrationPlate) {
			Alert.alert('Dados inválidos, verifique os campos e tente novamente!')
			return 'Campos não preenchidos!';
		}
		return;
	}

	useLayoutEffect(() => {
		const getVehicleData = async () => {
			const [vehicle, vehicleFunctions] = await Promise.all([getVehicle({registrationPlate: registration_Plate}),
				getVehicleFunction({registrationPlate: registration_Plate})]);

			setName(vehicle.name);
			setVehicleId(vehicle.id);
			setIsPublic(vehicle.is_public);
			setRegistrationPlate(vehicle.registration_plate);
			setOldRegistrationPlate(vehicle.registration_plate);

			setPrice(vehicleFunctions.price_transport);
			setVehicleFunctionsId(vehicleFunctions.id);
			setThereIsWheelchairSupport(vehicleFunctions.suport_wheelchair);
			setThereIsWifi(vehicleFunctions.wifi);
			setThereIsAirConditioning(vehicleFunctions.air_conditioning);
			setThereIsBathroom(vehicleFunctions.washrooms);
		}

		getVehicleData();
	}, [])

	return(
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>DIGITE AS INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.inputName}>Nome do veiculo</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setName(text)}
					value={name}
					placeholder="Digite o nome"
					keyboardType="default"
      	/>

				<Text style={styles.inputName}>Valor do transporte</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setPrice(text)}
					value={price}
					placeholder="Digite o valor"
					keyboardType="numeric"
      	/>

				<Text style={styles.inputName}>Placa do Veículo</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setRegistrationPlate(text)}
					value={registrationPlate}
					placeholder="Digite a placa"
					keyboardType="default"
      	/>

				<View>
					<Text style={styles.selectResources}>Selecione os recursos disponíveis</Text>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>Banheiro</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor='#E5E9F2'
							onValueChange={toggleSwitchBathroom}
							value={thereIsBathroom}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>ar condicionado</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchAirC}
							value={thereIsAirConditioning}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>internet</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchWifi}
							value={thereIsWifi}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>suporte para cadeirantes</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchWheelchairSup}
							value={thereIsWheelchairSupport}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>veiculo público</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchIsPublic}
							value={isPublic}
							tex
						/>
					</View>

				</View>
				<TouchableOpacity style={styles.updateButton} onPress={() => updateVehicle()}>
						<Text style={styles.textButton}>Atualizar</Text>
				</TouchableOpacity>

			</View>
		</View>
	)
}
