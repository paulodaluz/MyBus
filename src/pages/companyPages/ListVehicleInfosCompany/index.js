import React, { useEffect, useState } from 'react';
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
	const { registrationPlate, receivedVehicle, status = 'Operando normalmente' } = route.params;

	const [name, setName] = useState('');
	const [idToPassangers, setIdToPassangers] = useState('');
	const [plateId, setPlateId] = useState('');
	const [password, setPassword] = useState('');
	const [price, setPrice] = useState('');

	const getVehicleData = async () => {
		if (receivedVehicle) {
			setName(receivedVehicle.name);
			setIdToPassangers(receivedVehicle.id_to_passengers);
			setPlateId(receivedVehicle.id_to_share_localization);
			setPassword(receivedVehicle.password_to_share_localization);
			setPrice(receivedVehicle.price);

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

		setPrice(vehicleFunctions.price_transport);
	};

	useEffect(() => {
		getVehicleData();
	}, []);

	// TODOS:
	/*
		Refatorar a função acima
		Ajustar o component FunctionBarOfVehicle que está tudo fixo
		Botar o icone do Ônibus do lado do titulo de ListInfos
		Botar o icone do Ônibus do lado do titulo desta página(achar um verdinho como no MVApp)
		Ajustar botão editar
	*/
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
						thereIsWifi={true}
						thereIsWheelchairSupport={true}
						thereIsBathroom={true}
						thereIsAirConditioning={true}
						price={price}
					/>

					<Divisor />
				</View>

				<View style={styles.button}>
					<MiddleButton
						onPress={() => console.log()}
						textButton={'EDITAR'}
						backgroundColor={orange}
					/>
				</View>
			</View>
		</View>
	);
}
