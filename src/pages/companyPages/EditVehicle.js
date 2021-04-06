import { Text, View, TextInput, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

import { purple, white, orange } from '../../styles/colors';
import { editVehicle, getVehicle, getVehicleFunction } from '../../backend/vehicles/Vehicle';
import { updatePlateVehicleCompany } from '../../backend/users/Company';

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

	const buttonColor = { false: '#343F4B', true: "#47525E" };

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

			console.log({vehicleFunctions})
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

const styles = StyleSheet.create({
	boxTitle: {
		width: "100%",
		backgroundColor: purple,
		height: "13%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: "6%"
	},
	title: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		paddingTop: "11%",
		fontSize: 25,
		paddingLeft: "13%",
		paddingRight: "13%"
	},
	body: {
		width: "92%",
		height: "83%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "5%",
		paddingLeft: "10%",
		paddingRight: "10%",
		marginLeft: "4%",
		marginRight: "4%"
	},
	inputName: {
		color: white,
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase",
		paddingBottom: "2%"
	},
	input: {
		width: "98%",
		height: "7%",
		backgroundColor: white,
		borderRadius: 30,
		paddingLeft: "8%",
		paddingRight: "8%",
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: "8%",
		borderWidth: 1,
		borderColor: orange
	},
	selectResources: {
		color: white,
		fontSize: 23,
		fontWeight: "bold",
		textTransform: "uppercase",
		textAlign: "center",
	},
	optionFuntionOfVehicle: {
		width: "100%",
		flexDirection: "row",
		paddingTop: "6%",
		display: "flex",
	},
	functionOfVehicle: {
		color: white,
		fontSize: 25,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	buttonListedVehicles: {
		alignSelf: "center",
		position: 'relative',
		marginLeft: 'auto'
	},
	updateButton: {
		borderRadius: 30,
		marginTop: "5%",
		backgroundColor: orange,
		width: "60%",
		height: "7%",
		alignItems: "center",
		alignSelf: "center",
		paddingTop: "2%"
	},
	textButton: {
		color: white,
		fontSize: 30,
		fontWeight: "bold"
	}
});
