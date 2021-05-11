import React, { useLayoutEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import cross_button from '../../../assets/icons/png/cross_button.png';
import { getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { Divisor } from '../../../components/Divisor';
import { FunctionBarOfVehicle } from '../../../components/FunctionBarOfVehicle';
import { MiddleButton } from '../../../components/MiddleButton';
import { orange } from '../../../styles/colors';
import { Header } from './Header';
import { ListInfos } from './ListOfInfos';
import { styles } from './style';

export default function ListVehicleInfosCompany({ navigation, route }) {
	const { uid, registrationPlate, receivedVehicle, status = 'Operando normalmente' } = route.params;

	const [name, setName] = useState('');
	const [idToPassangers, setIdToPassangers] = useState('');
	const [plateId, setPlateId] = useState('');
	const [password, setPassword] = useState('');

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);
	const [price, setPrice] = useState('');

	const getVehicleData = async () => {
		if (receivedVehicle) {
			setName(receivedVehicle.name);
			setIdToPassangers(receivedVehicle.id_to_passengers);
			setPlateId(receivedVehicle.id_to_share_localization);
			setPassword(receivedVehicle.password_to_share_localization);

			let receivedVehicleFunctions = await getVehicleFunction({
				registrationPlate: receivedVehicle.registration_plate,
			});

			setThereIsBathroom(receivedVehicleFunctions.washrooms);
			setThereIsAirConditioning(receivedVehicleFunctions.air_conditioning);
			setThereIsWifi(receivedVehicleFunctions.wifi);
			setThereIsWheelchairSupport(receivedVehicleFunctions.suport_wheelchair);
			setPrice(receivedVehicleFunctions.price_transport);

			return;
		}

		const [vehicle, vehicleFunctions] = await Promise.all([
			getVehicle({ registrationPlate }),
			getVehicleFunction({ registrationPlate }),
		]);

		setName(vehicle.name);
		setIdToPassangers(vehicle.id_to_passengers);
		setPlateId(vehicle.id_to_share_localization);
		setPassword(vehicle.password_to_share_localization);

		setThereIsBathroom(vehicleFunctions.washrooms);
		setThereIsAirConditioning(vehicleFunctions.air_conditioning);
		setThereIsWifi(vehicleFunctions.wifi);
		setThereIsWheelchairSupport(vehicleFunctions.suport_wheelchair);
		setPrice(vehicleFunctions.price_transport);
	};

	useLayoutEffect(() => {
		getVehicleData();
	}, []);

	return (
		<View>
			<Header vehicleName={name} />

			<View style={styles.body}>
				<TouchableOpacity
					style={styles.closeButtonContainer}
					onPress={() => navigation.navigate('MapCompany')}
				>
					<Image style={styles.crossIcon} source={cross_button} />
				</TouchableOpacity>

				<View>
					<ListInfos
						name={name}
						status={status}
						idToPassangers={idToPassangers}
						plateId={plateId}
						password={password}
					/>

					<FunctionBarOfVehicle
						thereIsWifi={thereIsWifi}
						thereIsWheelchairSupport={thereIsWheelchairSupport}
						thereIsBathroom={thereIsBathroom}
						thereIsAirConditioning={thereIsAirConditioning}
						price={price}
					/>

					<Divisor />
				</View>

				<View style={styles.button}>
					<MiddleButton
						onPress={() =>
							navigation.navigate('EditVehicle', {
								uid,
								registration_Plate: registrationPlate,
							})
						}
						textButton={'EDITAR'}
						backgroundColor={orange}
					/>
				</View>
			</View>
		</View>
	);
}
