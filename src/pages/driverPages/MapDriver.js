import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, Modal, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { black, grey, orange, purple, white } from '../../styles/colors';
import { sendLocalizationToFirebase } from '../../backend/map/DriverMap';

import placeholder from '../../assets/icons/png/placeholder.png';
import bus_icon from '../../assets/images/png/bus_icon.png';
import cross_button from '../../assets/icons/png/cross_button.png';
import settings from '../../assets/icons/png/settings.png';

import price from '../../assets/icons/png/price.png';
import air_conditioner from '../../assets/icons/png/air_conditioner.png';
import toilet_paper from '../../assets/icons/png/toilet_paper.png';
import wheelchair from '../../assets/icons/png/wheelchair.png';
import wifi from '../../assets/icons/png/wifi.png';
import map from '../../assets/icons/png/map.png';

export default function MapDriver({ navigation, route }) {
	const { company, vehicle, vehicleFunctions } = route.params;

	const [modalVisible, setModalVisible] = useState(false);
	const [myPosition, setMyposition] = useState(null);
	const [sharingLocalization, setSharingLocalization] = useState(false);
	const [vehicleStatus, setVehicleStatus] = useState('Operando normalmente');

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.050,
		longitudeDelta: 0.050,
	})

	const sendMyLocalization = async () => {
		let accessDatabase = {companyUid: company.uid, vehiclePlate: vehicle.registration_plate};
		let infosVehicle = {latitude: myPosition.latitude, longitude: myPosition.longitude, status: vehicleStatus};

		sendLocalizationToFirebase(accessDatabase, infosVehicle);
		setSharingLocalization(true);
	}

	const stopSendMyLocalization = async () => {
		setSharingLocalization(false);
	}

	const getMyPosition = async () => {
		let { status } = await Location.requestPermissionsAsync();

		if (status !== "granted") {
			Alert.alert("Permissão de acesso a localização negado!");
		} else {
			await Location.getCurrentPositionAsync({})
				.then(retorno => setMyposition(retorno.coords))
				.catch(error => {
					console.log(`MapDriverPage - getMyPosition - ERROR = ${error}`)
					Alert.alert("Erro ao acessar o GPS!")
				});
		}
	}

	const listVehicleInformations = async () => {
		setModalVisible(true);
	}

	const updateInfosVehicle = async () => {
		if(modalVisible) {
			setModalVisible(!modalVisible)
		}
		navigation.navigate('EditVehicle', { uid: company.uid, registration_Plate: vehicle.registration_plate, backPage: 'MapDriver', params: {} })
	}

	useEffect(() => {
		getMyPosition()
	}, [])

	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
				{
					sharingLocalization ?
					<View style={styles.sharingLocalization}>
						<Text style={styles.sharingLocalizationText}>Compartilhando a localização...</Text>
					</View>
					: null
				}

				{/* {
					modalVisible ?
					<View style={styles.vehicleNameHeader}>
						<Text style={styles.infoName}>Nome do Veículo</Text>
						<Text style={styles.info}>Hipica Planaltina</Text>
					</View>
					: null
				} */}

				<View style={{maxHeight: 10}}>
					<Modal
						animationType="slide"
						transparent={true}
						style={{maxHeight: 10}}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							setModalVisible(!modalVisible);
						}}
					>
						<View style={styles.bodyModal}>
						<TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: '3%'}} onPress={() => setModalVisible(!modalVisible)}>
								<Image
									style={{ height: 35, width: 35, marginRight: '3%'}}
									source={cross_button}
								/>
							</TouchableOpacity>
							<View style={styles.titleModal}>
								<Image
									style={{ height: 35, width: 35, marginRight: '3%' }}
									source={bus_icon}
								/>
								<Text style={styles.infoModal}>07 Hípica / Planaltina</Text>
							</View>

								<Text style={styles.infoNameModal}>Situação Atual</Text>
								<Text style={styles.infoModal}>Operando normalmente</Text>

								<Text style={styles.infoNameModal}>Código do Veículo</Text>
								<Text style={styles.infoModal}>#3869ABCD</Text>

								<Text style={styles.infoNameModal}>Usuário do Motorista</Text>
								<Text style={styles.infoModal}>ISA6529</Text>

								<Text style={styles.infoNameModal}>Senha do Motorista</Text>
								<Text style={styles.infoModal}>#8257E6</Text>

								<View style={styles.vehicleFunctionsModal}>
								{
									vehicleFunctions.wifi ?
									<Image
										style={styles.wifiImg}
										source={wifi}
									/>
									: null
								}
								{
									vehicleFunctions.suport_wheelchair ?
									<Image
										style={styles.wheelchairImg}
										source={wheelchair}
									/>
									: null
								}
								{
									vehicleFunctions.washrooms ?
									<Image
										style={styles.toiletPaperImg}
										source={toilet_paper}
									/>
									: null
								}
								{
									vehicleFunctions.air_conditioning ?
									<Image
										style={styles.airConditioningImg}
										source={air_conditioner}
									/>
									: null
								}
									<View style={styles.priceModal}>
										<Image
											style={styles.priceImg}
											source={price}
										/>
										<Text style={styles.priceTextModal}>{vehicleFunctions.price_transport}</Text>
									</View>
							</View>
							<View style={{backgroundColor: '#ACA7BE', width: '100%', height: 1, marginTop: '3%'}}></View>
							<TouchableOpacity style={styles.buttonEditVehicleModal} onPress={() => updateInfosVehicle()}>
								<Text style={styles.textButtonEditVehicleModal}>EDITAR</Text>
							</TouchableOpacity>
						</View>

					</Modal>
				</View>

				{myPosition ?
				<Marker
						coordinate={myPosition}
						title={"Meu local"}
						// image={placeholder}
					/>
					: null
				}
			</MapView>
			<View style={styles.menu}>
				<TouchableOpacity style={styles.button} onPress={() => sendMyLocalization()}>
					<View style={styles.shareLocalizationButton}>
					<Image
						style={{ height: 60, width: 60 }}
						source={map}
					/>
					</View>
					<Text style={styles.buttonText}>Compartilhar localização</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.mainButton} onPress={() => setModalVisible(!modalVisible)}>
					<View style={styles.mainIcon}>
						<Image
							style={styles.busIconMenu}
							source={bus_icon}
						/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettingsDriver', { uid: company.uid, registration_Plate: vehicle.registration_plate })}>
					<View style={styles.configButton}>
						<Image
							style={{ height: 60, width: 60 }}
							source={settings}
						/>
					</View>
					<Text style={styles.buttonText}>Configurações</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: "90%"
	},
	sharingLocalization: {
		backgroundColor: purple,
		width: '100%',
		height: '10%',
		resizeMode: 'cover',
	},
	sharingLocalizationText: {
		color: white,
		textAlign: 'center',
		paddingTop: '10%',
		fontWeight: "bold",
		fontSize: 20
	},
	menu: {
		width: '100%',
		height: '10%',
		backgroundColor: purple,
		shadowOpacity: 100,
		flexDirection: "row",
		alignItems: "center",
	},
	mainButton: {
		backgroundColor: '#9800FF',
		borderRadius: 100,
		width: '18%',
		height: '88%',
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	mainIcon: {
		alignItems: 'center',
		paddingTop: '8%'
	},
	busIconMenu: {
		height: 60,
		width: 60
	},
	button: {
		width: '33%',
		marginLeft: '2%',
		marginRight: '7%'
	},
	shareLocalizationButton: {
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	configButton: {
		alignContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	buttonText: {
		color: '#47525E',
		fontWeight: "bold",
		fontSize: 12,
		textAlign: "center"
	},
	bodyModal: {
		width: "92%",
		height: "64%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: '3%',
		paddingLeft: "8%",
		paddingRight: "8%",
		marginTop: '16%',
		marginLeft: "4%",
		marginRight: "4%",
	},
	titleModal: {
		display: 'flex',
		flexDirection: 'row'
	},
	infoNameModal: {
		color: black,
		fontWeight: "bold",
		fontSize: 13,
		paddingTop: "5%"
	},
	infoModal: {
		color: white,
		fontSize: 28,
		fontWeight: "bold",
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

})
