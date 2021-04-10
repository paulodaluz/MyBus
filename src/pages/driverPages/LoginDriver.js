import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { getVehicleFunction } from '../../backend/vehicles/Vehicle';
import { driverLoginIsValid } from '../../backend/Login';
import { getAllVehicles } from '../../service/VehicleService';
import { getCompanyByRegistrationPlate } from '../../backend/users/Company';

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
            color="#FFFFFF"
            title="Entrar"
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center'
  },
  welcomeBox: {
    height: "38%",
    width: "100%",
    backgroundColor: "#8257E6",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 40
  },
  inputButton: {
    height: "8%",
    width: '85%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#8492A6',
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
  },
  centerTitle: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
    paddingTop: "30%",
    paddingLeft: 30,
    paddingRight: 90,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "8%",
    width: '85%',
    paddingTop: "4%",
    marginBottom: "3%"
  }
});