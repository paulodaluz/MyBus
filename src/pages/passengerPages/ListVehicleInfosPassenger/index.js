import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { Divisor } from '../../../components/Divisor';
import { FunctionBarOfVehicle } from '../../../components/FunctionBarOfVehicle';
import { MiddleButton } from '../../../components/MiddleButton';
import { darkGrey, orange } from '../../../styles/colors';
import { Header } from './Header';
import { InfosVehicle } from './InfosVehicle';
import { styles } from './style';

export default function ListVehicleInfosPassenger({ navigation, route }) {
	const { registrationPlate, receivedVehicle, uid, status } = route.params;

	const [name, setName] = useState('');
	const [idToPassangers, setIdToPassangers] = useState('');
	const [price, setPrice] = useState('');

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);

	const [activateReminder, setActivateReminder] = useState(false);
	const toggleSwitchReminder = () => setActivateReminder((previousState) => !previousState);

	const [timeForVehicleToArrive, setTimeForVehicleToArrive] = useState(12);

	const getVehicleData = async () => {
		if (receivedVehicle) {
			setName(receivedVehicle.name);
			setIdToPassangers(receivedVehicle.id_to_passengers);
			setPrice(receivedVehicle.price);
		}
		if (!receivedVehicle) {
			const [vehicle, vehicleFunctions] = await Promise.all([
				getVehicle({ registrationPlate }),
				getVehicleFunction({ registrationPlate }),
			]);

			setName(vehicle.name);
			setIdToPassangers(vehicle.id_to_passengers);

			setPrice(vehicleFunctions.price_transport);
			setThereIsBathroom(vehicleFunctions.washrooms);
			setThereIsAirConditioning(vehicleFunctions.air_conditioning);
			setThereIsWifi(vehicleFunctions.wifi);
			setThereIsWheelchairSupport(vehicleFunctions.suport_wheelchair);
		}
	};

	const getStatusNotification = async () => {
		const activateReminderStorange = await AsyncStorage.getItem('@mybus:notification');

		if (activateReminderStorange) {
			setActivateReminder(true);
		}
	};

	const activateReminderVehicle = async () => {
		// const activateReminderStorange = await AsyncStorage.getItem('@mybus:notification');

		// if (activateReminder === true && activateReminderStorange !== 'true') {
		if (activateReminder === true) {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'Olá, seu veículo está chegando!',
					body: 'Seu veículo está chegando a estação! Cuidado para não parder ele!',
					sound: true,
					priority: Notifications.AndroidNotificationPriority.HIGH,
				},
				trigger: {
					seconds: timeForVehicleToArrive < 1 ? timeForVehicleToArrive * 60 : 60,
					repeats: false,
				},
			});

			// await AsyncStorage.setItem('@mybus:notification', JSON.stringify(true));
		}
	};

	useLayoutEffect(() => {
		getVehicleData();
		// getStatusNotification();
	}, []);

	useEffect(() => {
		activateReminderVehicle();
	}, [activateReminder]);

	return (
		<View>
			<Header name={name} />

			<View style={styles.bodyContainer}>
				<InfosVehicle
					name={name}
					status={status}
					idToPassangers={idToPassangers}
					valueReminder={activateReminder}
					onChangeValueReminder={toggleSwitchReminder}
				/>

				<FunctionBarOfVehicle
					thereIsWifi={thereIsWifi}
					thereIsWheelchairSupport={thereIsWheelchairSupport}
					thereIsBathroom={thereIsBathroom}
					thereIsAirConditioning={thereIsAirConditioning}
					price={price}
				/>

				<Divisor />

				<View style={styles.buttonsContainer}>
					<View style={styles.button}>
						<MiddleButton
							onPress={() =>
								navigation.navigate('LeaveYourOpinionPassenger', {
									uid,
									vehicleRegistration: registrationPlate,
								})
							}
							textButton={'Dar um feedback'}
							backgroundColor={darkGrey}
						/>
					</View>

					<View style={styles.button}>
						<MiddleButton
							onPress={() => navigation.goBack()}
							textButton={'Ver no mapa'}
							backgroundColor={orange}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}
