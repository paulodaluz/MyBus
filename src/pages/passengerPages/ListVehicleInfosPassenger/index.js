import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import air_conditioner from '../../../assets/icons/png/air_conditioner.png';
import priceImg from '../../../assets/icons/png/price.png';
import toilet_paper from '../../../assets/icons/png/toilet_paper.png';
import wheelchair from '../../../assets/icons/png/wheelchair.png';
import wifi from '../../../assets/icons/png/wifi.png';
import { getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';
import { styles } from './style';

export default function ListVehicleInfosPassenger({ navigation, route }) {
	const { registrationPlate, receivedVehicle, uid } = route.params;

	const [name, setName] = useState('');
	const [status, setStatus] = useState('Operando normalmente');
	const [idToPassangers, setIdToPassangers] = useState('');
	const [plateId, setPlateId] = useState('');
	const [password, setPassword] = useState('');
	const [price, setPrice] = useState('');

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);

	useEffect(() => {
		const getVehicleData = async () => {
			if (receivedVehicle) {
				setName(receivedVehicle.name);
				setIdToPassangers(receivedVehicle.id_to_passengers);
				setPlateId(receivedVehicle.id_to_share_localization);
				setPassword(receivedVehicle.password_to_share_localization);
				setPrice(receivedVehicle.price);
			}
			if (!receivedVehicle) {
				const [vehicle, vehicleFunctions] = await Promise.all([
					getVehicle({ registrationPlate }),
					getVehicleFunction({ registrationPlate }),
				]);

				setName(vehicle.name);
				setIdToPassangers(vehicle.id_to_passengers);
				setPlateId(vehicle.id_to_share_localization);
				setPassword(vehicle.password_to_share_localization);

				setPrice(vehicleFunctions.price_transport);
				setThereIsBathroom(vehicleFunctions.washrooms);
				setThereIsAirConditioning(vehicleFunctions.air_conditioning);
				setThereIsWifi(vehicleFunctions.wifi);
				setThereIsWheelchairSupport(vehicleFunctions.suport_wheelchair);
			}
		};

		getVehicleData();
	}, []);

	return (
		<View>
			<View style={styles.header}>
				{/* <Image
						style={{width: 30, height: 30}}
						source={MyBusIcon}
					/> */}
				<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
				<Text style={styles.infoTitle}>{name}</Text>
			</View>

			<View style={styles.body}>
				<View style={{ paddingLeft: '8%' }}>
					<Text style={styles.info}>{name}</Text>

					<Text style={styles.infoName}>Situação Atual</Text>
					<Text style={styles.info}>{status}</Text>

					<Text style={styles.infoName}>Código do Veículo</Text>
					<Text style={styles.info}>{idToPassangers}</Text>

					<Text style={styles.infoName}>Usuário do Motorista</Text>
					<Text style={styles.info}>{plateId}</Text>

					<Text style={styles.infoName}>Senha do Motorista</Text>
					<Text style={styles.info}>{password}</Text>

					<View style={styles.vehicleFunctionsModal}>
						{thereIsWifi ? <Image style={styles.wifiImg} source={wifi} /> : null}
						{thereIsWheelchairSupport ? (
							<Image style={styles.wheelchairImg} source={wheelchair} />
						) : null}
						{thereIsBathroom ? <Image style={styles.toiletPaperImg} source={toilet_paper} /> : null}
						{thereIsAirConditioning ? (
							<Image style={styles.airConditioningImg} source={air_conditioner} />
						) : null}
						<View style={styles.priceModal}>
							<Image style={styles.priceImg} source={priceImg} />
							<Text style={styles.priceTextModal}>{price}</Text>
						</View>
					</View>
				</View>
				<View style={{ backgroundColor: '#ACA7BE', width: '100%', height: 1, marginTop: '3%' }} />

				<TouchableOpacity
					style={styles.buttonGiveFeedback}
					onPress={() => navigation.navigate('LeaveYourOpinionPassenger', { uid })}
				>
					<Text style={styles.textButton}>Dar um feedback</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonSeeOnMap} onPress={() => navigation.goBack()}>
					<Text style={styles.textButton}>Ver no mapa</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
