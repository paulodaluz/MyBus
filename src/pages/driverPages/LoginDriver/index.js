import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { driverLoginIsValid } from '../../../backend/Login';
import { getAllVehicles } from '../../../service/VehicleService';
import { getCompanyByRegistrationPlate } from '../../../backend/users/Company';
import { Button } from '../../../components/Button';
import { darkGrey, lightGray, purple, white } from '../../../styles/colors';
import { styles } from './style';

export default function LoginDriver({ navigation }) {
  const [registrationPlate, setRegistrationPlate] = useState("ISA6529");
  const [password, setPassword] = useState("N2Q6H6MJI");

	const [allVehicles, setAllVehicles] = useState([]);

  const login = async () => {
    if(!registrationPlate || !password) {
      return Alert.alert('Usuário ou senha inválida!');
    }

		const loggedDriver = driverLoginIsValid(registrationPlate, password, allVehicles);

		if(loggedDriver) {
			const myVehicle = getMyVehicle(allVehicles, registrationPlate);
			const [myCompany, vehicleFunctions] = await Promise.all([getMyCompany(registrationPlate), getFunctionsFromVehicle(registrationPlate)]);

			return navigation.navigate('MapDriver', { company: myCompany, vehicle: myVehicle, vehicleFunctions });
		}
		return Alert.alert('Dados inválidos!');
  }

	const getMyVehicle = (vehicles, myRegistrationPlate) => {
		return vehicles.find(vehicle => vehicle.registration_plate === myRegistrationPlate);
	}

	const getMyCompany = async (myRegistrationPlate) => {
		return await getCompanyByRegistrationPlate({registrationPlate: myRegistrationPlate})
	}

	const getFunctionsFromVehicle = async (myRegistrationPlate) => {
		return await getVehicleFunction({registrationPlate: myRegistrationPlate})
	}

	useEffect(() => {

		async function getAllVehiclesData() {
			await setAllVehicles(await getAllVehicles());
		}

		getAllVehiclesData();

  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.welcomeBox}>
        <Text
          style={styles.centerTitle}
          >Bem-vindo de volta!
        </Text>

        <Text style={styles.subTitle}>Faça seu login para começar</Text>
      </View>

      <TextInput
          style={styles.inputButton}
          placeholder="Placa do veículo"
          value={registrationPlate}
          onChangeText={text => setRegistrationPlate(text)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

      <View style={styles.loginButton}>
        <Button
            onPress={login}
            color={white}
            backgroundColor={darkGrey}
            textButton={'Entrar'}
          />
      </View>

    </View>
  );
}
