import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { addNewVehicleInCompany } from '../../../backend/users/Company';
import { addFunctionsToVehicle, createNewVehicle } from '../../../backend/vehicles/Vehicle';
import { MiddleButton } from '../../../components/MiddleButton';
import { SwitchFunction } from '../../../components/SwitchFunction';
import { getAllFunctionsVehicles } from '../../../service/VehicleFunctionsService';
import { orange } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';

export default function CreateNewVehicle({ navigation, route }) {
	const { uid } = route.params;

	const [name, setName] = useState('');
	const [isPublic, setIsPublic] = useState(false);
	const [price, setPrice] = useState('');
	const [registrationPlate, setRegistrationPlate] = useState('');

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);

	const toggleSwitchBathroom = () => setThereIsBathroom((previousState) => !previousState);
	const toggleSwitchWifi = () => setThereIsWifi((previousState) => !previousState);
	const toggleSwitchIsPublic = () => setIsPublic((previousState) => !previousState);
	const toggleSwitchAirConditioning = () =>
		setThereIsAirConditioning((previousState) => !previousState);
	const toggleSwitchWheelchairSup = () =>
		setThereIsWheelchairSupport((previousState) => !previousState);

	const createVehicle = async () => {
		const errors = await verifyInputs();

		if (errors === 'Usuário já existe') {
			return;
		}

		let vehicle = {
			registrationPlate,
			name,
			isPublic,
		};

		let functionsVehicle = {
			thereIsWifi,
			thereIsAirConditioning,
			thereIsBathroom,
			thereIsWheelchairSupport,
			price,
			registrationPlate,
		};
		const [createdVehicle, vehicleFunctionsAdded, vehicleAddedInCompany] = await Promise.all([
			createNewVehicle(vehicle),
			addFunctionsToVehicle(functionsVehicle),
			addNewVehicleInCompany(uid, registrationPlate),
		]);

		if (
			(createVehicle && createdVehicle.error) ||
			(vehicleFunctionsAdded && vehicleFunctionsAdded.error) ||
			(vehicleAddedInCompany && vehicleAddedInCompany.error)
		) {
			return Alert.alert('Erro ao criar usuário.');
		}

		navigation.navigate('AskShowVehicleCode', { uid, vehicle: createdVehicle.response });
	};

	const verifyInputs = async () => {
		if (!name || !price || !registrationPlate) {
			Alert.alert('Dados inválidos, verifique os campos e tente novamente!');
			return 'Campos não preenchidos!';
		}

		const allFunctionsVehicles = await getAllFunctionsVehicles().catch((error) => {
			return { error };
		});

		const alreadyExists = allFunctionsVehicles.find(
			(vehicleFunctions) => vehicleFunctions.registration_plate === registrationPlate.toUpperCase()
		);

		if (alreadyExists) {
			Alert.alert('Usuário já existe');
			return 'Usuário já existe';
		}
	};

	return (
		<View>
			<Header title={'DIGITE AS INFORMAÇÕES\nDO VEICULO'} />

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
					<Text style={styles.text}>Selecione os recursos disponíveis</Text>

					<View style={styles.switch}>
						<SwitchFunction
							text={'Banheiro'}
							value={thereIsBathroom}
							onValueChange={toggleSwitchBathroom}
						/>
					</View>

					<View style={styles.switch}>
						<SwitchFunction
							text={'ar condicionado'}
							value={thereIsAirConditioning}
							onValueChange={toggleSwitchAirConditioning}
						/>
					</View>

					<View style={styles.switch}>
						<SwitchFunction
							text={'internet'}
							value={thereIsWifi}
							onValueChange={toggleSwitchWifi}
						/>
					</View>

					<View style={styles.switch}>
						<SwitchFunction
							text={'suporte para cadeirantes'}
							value={thereIsWheelchairSupport}
							onValueChange={toggleSwitchWheelchairSup}
						/>
					</View>

					<View style={styles.switch}>
						<SwitchFunction
							text={'veículo público'}
							value={isPublic}
							onValueChange={toggleSwitchIsPublic}
						/>
					</View>
				</View>

				<View style={styles.registerButton}>
					<MiddleButton
						onPress={() => createVehicle()}
						textButton="Cadastrar"
						backgroundColor={orange}
					/>
				</View>
			</View>
		</View>
	);
}
