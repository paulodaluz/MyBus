import { Screen } from '../../../components/commonComponents/Screen';
import { useVehicleReminder } from '../../../hooks/useVehicleReminder';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, View } from 'react-native';
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

	const getVehicleData = useCallback(async () => {
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
	}, [receivedVehicle, registrationPlate]);

	useLayoutEffect(() => {
		getVehicleData();
	}, [getVehicleData]);

	const reminderError = useCallback(() => {
		setActivateReminder(false);
		Alert.alert(
			'Não foi possível configurar o lembrete. Verifique as permissões e tente novamente.'
		);
	}, []);
	useVehicleReminder(activateReminder, reminderError);

	return (
		<Screen>
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
							textButton={'Voltar ao mapa'}
							backgroundColor={orange}
						/>
					</View>
				</View>
			</View>
		</Screen>
	);
}
