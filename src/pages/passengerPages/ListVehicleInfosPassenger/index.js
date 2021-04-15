import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { purple, white, orange, black, darkGrey } from '../../../styles/colors';
import MyBusIcon from '../../../assets/icons/svg/my_bus_icon.svg';
import { getVehicle, getVehicleFunction } from '../../../backend/vehicles/Vehicle';

import priceImg from '../../../assets/icons/png/price.png';
import air_conditioner from '../../../assets/icons/png/air_conditioner.png';
import toilet_paper from '../../../assets/icons/png/toilet_paper.png';
import wheelchair from '../../../assets/icons/png/wheelchair.png';
import wifi from '../../../assets/icons/png/wifi.png';

export default function ListVehicleInfosPassenger({ navigation, route }) {
	const { registrationPlate, receivedVehicle, uid } = route.params;

	const [name, setName] = useState("");
	const [status, setStatus] = useState("Operando normalmente");
	const [idToPassangers, setIdToPassangers] = useState("");
	const [plateId, setPlateId] = useState("");
	const [password, setPassword] = useState("");
	const [price, setPrice] = useState("");

	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);


	useEffect(() => {
		const getVehicleData = async () => {

			if(receivedVehicle) {
				setName(receivedVehicle.name);
				setIdToPassangers(receivedVehicle.id_to_passengers);
				setPlateId(receivedVehicle.id_to_share_localization);
				setPassword(receivedVehicle.password_to_share_localization);
				setPrice(receivedVehicle.price);
			}
			if(!receivedVehicle) {
				const [vehicle, vehicleFunctions] = await Promise.all([
					getVehicle({registrationPlate}),
					getVehicleFunction({registrationPlate})]);

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
		}

		getVehicleData();
	}, [])

	return(
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

				<View style={{paddingLeft: "8%"}}>
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
						{
							thereIsWifi ?
							<Image
								style={styles.wifiImg}
								source={wifi}
							/>
							: null
						}
						{
							thereIsWheelchairSupport ?
							<Image
								style={styles.wheelchairImg}
								source={wheelchair}
							/>
							: null
						}
						{
							thereIsBathroom ?
							<Image
								style={styles.toiletPaperImg}
								source={toilet_paper}
							/>
							: null
						}
						{
							thereIsAirConditioning ?
							<Image
								style={styles.airConditioningImg}
								source={air_conditioner}
							/>
							: null
						}
							<View style={styles.priceModal}>
								<Image
									style={styles.priceImg}
									source={priceImg}
								/>
								<Text style={styles.priceTextModal}>{price}</Text>
							</View>
					</View>
				</View>
				<View style={{backgroundColor: '#ACA7BE', width: '100%', height: 1, marginTop: '3%'}}></View>

				<TouchableOpacity style={styles.buttonGiveFeedback} onPress={() =>  navigation.navigate('LeaveYourOpinionPassenger', { uid })}>
						<Text style={styles.textButton}>Dar um feedback</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonSeeOnMap} onPress={() => navigation.goBack()}>
						<Text style={styles.textButton}>Ver no mapa</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "17%",
		backgroundColor: purple,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		paddingTop: "14%",
		paddingLeft: "6%"
	},
	infoNameTitle: {
		color: white,
		fontWeight: "bold",
		fontSize: 12
	},
	infoTitle: {
		color: white,
		fontSize: 28,
		fontWeight: "bold"
	},
	body: {
		backgroundColor: purple,
		borderRadius: 30,
		marginTop: "10%",
		height: "72%",
		paddingTop: "8%",
		paddingBottom: "8%",

		width: "95%",
		alignSelf: "center",
	},
	infoName: {
		color: black,
		fontWeight: "bold",
		fontSize: 12,
		paddingTop: "5%"
	},
	info: {
		color: white,
		fontSize: 28,
		fontWeight: "bold"
	},
	price: {
		color: white,
		fontWeight: "bold"
	},
	vehicleFunctions: {

	},
	buttonGiveFeedback: {
		marginTop: '6%',
		backgroundColor: darkGrey,
		borderRadius: 30,
		height: "10%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
	},
	buttonSeeOnMap: {
		marginTop: '5%',
		backgroundColor: orange,
		borderRadius: 30,
		height: "10%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
	},
	textButton: {
		color: white,
		fontWeight: "bold",
		paddingTop: "6%",
		fontSize: 20
	},
	vehicleFunctionsModal: {
		flexDirection: 'row-reverse',
		marginTop: '10%'
	},
	priceModal: {
		display: 'flex',
		flexDirection: 'row'
	},
	priceImg: {
		height: 35,
		width: 35,
		marginRight: '2%'
	},
	priceTextModal: {
		color: white,
		fontWeight: "bold",
		fontSize: 28
	},
	airConditioningImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	toiletPaperImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	wheelchairImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	wifiImg: {
		height: 40,
		width: 40,
		marginRight: '2%'
	},
	buttonEditVehicleModal: {
		backgroundColor: orange,
		borderRadius: 30,
		height: "10%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
		marginTop: '10%'
	},
	textButtonEditVehicleModal: {
		color: white,
		fontWeight: "bold",
		paddingTop: "5%",
		fontSize: 34
	},
});
