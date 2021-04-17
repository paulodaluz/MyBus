import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import cross_button from '../../../assets/icons/png/cross_button.png';
import air_conditioner from '../../../assets/icons/png/functions/air_conditioner.png';
import price from '../../../assets/icons/png/functions/price.png';
import toilet from '../../../assets/icons/png/functions/toilet.png';
import wheelchair from '../../../assets/icons/png/functions/wheelchair.png';
import wifi from '../../../assets/icons/png/functions/wifi.png';
import map from '../../../assets/icons/png/map.png';
import bus_icon from '../../../assets/icons/png/map/bus_icon.png';
import settings from '../../../assets/icons/png/settings.png';
import { sendLocalizationToFirebase } from '../../../backend/map/DriverMap';
import { styles } from './style';

export default function MapDriver({ navigation, route }) {
	const { company, vehicle, vehicleFunctions } = route.params;

	const [modalVisible, setModalVisible] = useState(false);
	const [myPosition, setMyposition] = useState(null);
	const [sharingLocalization, setSharingLocalization] = useState(false);
	const [vehicleStatus, setVehicleStatus] = useState('Operando normalmente');

	const [localicaoAtual, setLocalicaoAtual] = useState({
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.05,
		longitudeDelta: 0.05,
	});

	const sendMyLocalization = async () => {
		let accessDatabase = { companyUid: company.uid, vehiclePlate: vehicle.registration_plate };
		let infosVehicle = {
			latitude: myPosition.latitude,
			longitude: myPosition.longitude,
			status: vehicleStatus,
		};

		sendLocalizationToFirebase(accessDatabase, infosVehicle);
		setSharingLocalization(true);
	};

	const stopSendMyLocalization = async () => {
		setSharingLocalization(false);
	};

	const getMyPosition = async () => {
		let { status } = await Location.requestPermissionsAsync();

		if (status !== 'granted') {
			Alert.alert('Permissão de acesso a localização negado!');
		} else {
			await Location.getCurrentPositionAsync({})
				.then((retorno) => setMyposition(retorno.coords))
				.catch((error) => {
					console.log(`MapDriverPage - getMyPosition - ERROR = ${error}`);
					Alert.alert('Erro ao acessar o GPS!');
				});
		}
	};

	const listVehicleInformations = async () => {
		setModalVisible(true);
	};

	const updateInfosVehicle = async () => {
		if (modalVisible) {
			setModalVisible(!modalVisible);
		}
		navigation.navigate('EditVehicle', {
			uid: company.uid,
			registration_Plate: vehicle.registration_plate,
			backPage: 'MapDriver',
			params: {},
		});
	};

	useEffect(() => {
		getMyPosition();
	}, []);

	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle} initialRegion={localicaoAtual} region={localicaoAtual}>
				{sharingLocalization ? (
					<View style={styles.sharingLocalization}>
						<Text style={styles.sharingLocalizationText}>Compartilhando a localização...</Text>
					</View>
				) : null}

				{/* {
					modalVisible ?
					<View style={styles.vehicleNameHeader}>
						<Text style={styles.infoName}>Nome do Veículo</Text>
						<Text style={styles.info}>Hipica Planaltina</Text>
					</View>
					: null
				} */}

				<View style={{ maxHeight: 10 }}>
					<Modal
						animationType="slide"
						transparent={true}
						style={{ maxHeight: 10 }}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
							setModalVisible(!modalVisible);
						}}
					>
						<View style={styles.bodyModal}>
							<TouchableOpacity
								style={{ alignSelf: 'flex-end', marginBottom: '3%' }}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Image style={{ height: 35, width: 35, marginRight: '3%' }} source={cross_button} />
							</TouchableOpacity>
							<View style={styles.titleModal}>
								<Image style={{ height: 35, width: 35, marginRight: '3%' }} source={bus_icon} />
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
								{vehicleFunctions.wifi ? <Image style={styles.wifiImg} source={wifi} /> : null}
								{vehicleFunctions.suport_wheelchair ? (
									<Image style={styles.wheelchairImg} source={wheelchair} />
								) : null}
								{vehicleFunctions.washrooms ? (
									<Image style={styles.toiletPaperImg} source={toilet} />
								) : null}
								{vehicleFunctions.air_conditioning ? (
									<Image style={styles.airConditioningImg} source={air_conditioner} />
								) : null}
								<View style={styles.priceModal}>
									<Image style={styles.priceImg} source={price} />
									<Text style={styles.priceTextModal}>{vehicleFunctions.price_transport}</Text>
								</View>
							</View>
							<View
								style={{ backgroundColor: '#ACA7BE', width: '100%', height: 1, marginTop: '3%' }}
							/>
							<TouchableOpacity
								style={styles.buttonEditVehicleModal}
								onPress={() => updateInfosVehicle()}
							>
								<Text style={styles.textButtonEditVehicleModal}>EDITAR</Text>
							</TouchableOpacity>
						</View>
					</Modal>
				</View>

				{myPosition ? (
					<Marker
						coordinate={myPosition}
						title={'Meu local'}
						// image={placeholder}
					/>
				) : null}
			</MapView>
			<View style={styles.menu}>
				<TouchableOpacity style={styles.button} onPress={() => sendMyLocalization()}>
					<View style={styles.shareLocalizationButton}>
						<Image style={{ height: 60, width: 60 }} source={map} />
					</View>
					<Text style={styles.buttonText}>Compartilhar localização</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.mainButton} onPress={() => setModalVisible(!modalVisible)}>
					<View style={styles.mainIcon}>
						<Image style={styles.busIconMenu} source={bus_icon} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() =>
						navigation.navigate('SettingsDriver', {
							uid: company.uid,
							registration_Plate: vehicle.registration_plate,
						})
					}
				>
					<View style={styles.configButton}>
						<Image style={{ height: 60, width: 60 }} source={settings} />
					</View>
					<Text style={styles.buttonText}>Configurações</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
