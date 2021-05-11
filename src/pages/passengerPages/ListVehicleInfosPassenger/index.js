import React, { useLayoutEffect, useState } from 'react';
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

	useLayoutEffect(() => {
		getVehicleData();
	}, []);

	return (
		<View>
			<Header name={name} />

			<View style={styles.bodyContainer}>
				<InfosVehicle name={name} status={status} idToPassangers={idToPassangers} />

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
