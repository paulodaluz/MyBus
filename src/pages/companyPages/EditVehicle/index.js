import React, { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { updatePlateVehicleCompany } from '../../../backend/users/Company';
import { editVehicle, getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { MiddleButton } from '../../../components/MiddleButton';
import { SwitchFunction } from '../../../components/SwitchFunction';
import { orange } from '../../../styles/colors';
import { Header } from './Header';
import { styles } from './style';

export default function EditVehicle({ navigation, route }) {
	const { uid, registration_Plate, backPage, params } = route.params;

	const [vehicleId, setVehicleId] = useState('');
	const [vehicleFunctionsId, setVehicleFunctionsId] = useState('');

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);

	const [name, setName] = useState('');
	const [isPublic, setIsPublic] = useState(false);
	const [price, setPrice] = useState('');
	const [registrationPlate, setRegistrationPlate] = useState('');
	const [oldregistrationPlate, setOldRegistrationPlate] = useState('');

	const toggleSwitchBathroom = () => setThereIsBathroom((previousState) => !previousState);
	const toggleSwitchWifi = () => setThereIsWifi((previousState) => !previousState);
	const toggleSwitchIsPublic = () => setIsPublic((previousState) => !previousState);
	const toggleSwitchWheelchairSup = () =>
		setThereIsWheelchairSupport((previousState) => !previousState);
	const toggleSwitchAirConditioning = () =>
		setThereIsAirConditioning((previousState) => !previousState);

	const updateVehicle = async () => {
		const errors = await verifyInputs();

		if (errors) {
			return;
		}

		let vehicleInfos = {
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

		const [updatedVehicle, updatedVehiclePlate] = await Promise.all([
			editVehicle(vehicleId, vehicleInfos, vehicleFunctionsId, functionsVehicle),
			updatePlateVehicleCompany(uid, oldregistrationPlate, registrationPlate),
		]);

		if (updatedVehiclePlate && updatedVehiclePlate.error) {
			return Alert.alert('Erro ao atualizar usuário.');
		}
		if (backPage) {
			const vehicleFunctions = await getVehicleFunction({ registrationPlate });
			return navigation.navigate(backPage, { ...params, vehicleFunctions });
		}
		return navigation.navigate('ListVehicleInfosCompany', {
			uid,
			registrationPlate: updatedVehicle.response.registration_plate,
		});
	};

	const verifyInputs = async () => {
		if (!name || !price || !registrationPlate) {
			Alert.alert('Dados inválidos, verifique os campos e tente novamente!');
			return 'Campos não preenchidos!';
		}
	};

	const getVehicleData = async () => {
		const [vehicle, vehicleFunctions] = await Promise.all([
			getVehicle({ registrationPlate: registration_Plate }),
			getVehicleFunction({ registrationPlate: registration_Plate }),
		]);

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
	};

	useLayoutEffect(() => {
		getVehicleData();
	}, []);

	return (
		<View>
			<Header title={'DIGITE AS INFORMAÇÕES\nDO VEÍCULO'} />

			<View style={styles.body}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={styles.inputName}>Nome do veículo</Text>
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

						{/* <View style={styles.switch}>
							<SwitchFunction
								text={'veículo público'}
								value={isPublic}
								onValueChange={toggleSwitchIsPublic}
							/>
						</View> */}
					</View>

					<View style={styles.updateButton}>
						<MiddleButton
							onPress={() => updateVehicle()}
							textButton="Atualizar"
							backgroundColor={orange}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
}
