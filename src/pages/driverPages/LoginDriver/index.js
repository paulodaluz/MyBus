import React, { useLayoutEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { driverLoginIsValid } from '../../../backend/Login';
import { getCompanyByRegistrationPlate } from '../../../backend/users/Company';
import { getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { getAllVehicles } from '../../../service/VehicleService';
import { darkGrey, white } from '../../../styles/colors';
import { styles } from './style';

export default function LoginDriver({ navigation }) {
	const [registrationPlate, setRegistrationPlate] = useState('IBMC2789');
	const [password, setPassword] = useState('3P01HX90J');

	const [allVehicles, setAllVehicles] = useState([]);

	const login = async () => {
		if (!registrationPlate || !password) {
			return Alert.alert('Usuário ou senha inválida!');
		}

		const loggedDriver = driverLoginIsValid(registrationPlate, password, allVehicles);

		if (loggedDriver) {
			const myVehicle = getMyVehicle(allVehicles, registrationPlate);
			const [myCompany, vehicleFunctions] = await Promise.all([
				getCompanyByRegistrationPlate({ registrationPlate }),
				getVehicleFunction({ registrationPlate }),
			]);

			return navigation.navigate('MapDriver', {
				company: myCompany,
				vehicle: myVehicle,
				vehicleFunctions,
			});
		}

		return Alert.alert('Dados inválidos!');
	};

	const getMyVehicle = (vehicles, myRegistrationPlate) => {
		return vehicles.find((vehicle) => vehicle.registration_plate === myRegistrationPlate);
	};

	const getAllVehiclesData = async () => {
		const allVehiclesFromDatabase = await getAllVehicles();

		setAllVehicles(allVehiclesFromDatabase);
	};

	useLayoutEffect(() => {
		getAllVehiclesData();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Bem-vindo\nde volta!'} subtitle={'Faça seu login para começar'} />
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Placa do veículo"
					value={registrationPlate}
					onChangeText={(text) => setRegistrationPlate(text)}
				/>
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Senha"
					textContentType="password"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>

			<View style={styles.button}>
				<WideButton
					onPress={login}
					color={white}
					backgroundColor={darkGrey}
					textButton={'Entrar'}
				/>
			</View>
		</View>
	);
}
