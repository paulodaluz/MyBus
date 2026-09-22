import { Screen } from '../../../components/commonComponents/Screen';
import * as Location from 'expo-location';
import { firebase } from '../../../database/FirebaseConfiguration';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Modal, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import placeholder_icon from '../../../assets/icons/png/map/placeholder.png';
import { Menu } from './Menu';
import { ShowVehicle } from './ShowVehicle';
import { styles } from './style';
import { WarningSharingLocalization } from './WarningSharingLocalization';

export default function MapDriver({ navigation, route }) {
	const { company, vehicle, vehicleFunctions } = route.params;

	const [myPosition, setMyposition] = useState(null);

	const [sharingLocalization, setSharingLocalization] = useState(false);
	const vehicleStatus = 'Operando Normalmente';

	const [modalVisible, setModalVisible] = useState(false);

	const initialLocalization = {
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.15,
		longitudeDelta: 0.15,
	};

	const getMyPosition = useCallback(async () => {
		let status;
		try {
			({ status } = await Location.requestForegroundPermissionsAsync());
		} catch {
			Alert.alert('Erro ao acessar o GPS!');
			return;
		}

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
	}, []);

	const sendMyLocalizationToFirebase = useCallback(async () => {
		if (sharingLocalization && myPosition != null) {
			await firebase
				.database()
				.ref(`/real_time_database/${company.uid}/${vehicle.registration_plate}`)
				.set({
					latitude: myPosition.latitude,
					longitude: myPosition.longitude,
					status: 'Operando Normalmente',
				})
				.catch(() => {
					setSharingLocalization(false);
					Alert.alert('Não foi possível compartilhar. Verifique sua conexão.');
				});
		}
	}, [company.uid, myPosition, sharingLocalization, vehicle.registration_plate]);

	const updateInfosVehicle = async () => {
		if (modalVisible) {
			setModalVisible(!modalVisible);
		}
		navigation.navigate('EditVehicle', {
			uid: company.uid,
			registration_Plate: vehicle.registration_plate,
			backPage: 'MapDriver',
			params: { company, vehicle, vehicleFunctions },
		});
	};

	useLayoutEffect(() => {
		getMyPosition();
	}, [getMyPosition]);

	useEffect(() => {
		sendMyLocalizationToFirebase();
	}, [sendMyLocalizationToFirebase]);

	return (
		<Screen scroll={false}>
			<MapView
				style={styles.mapStyle}
				initialRegion={initialLocalization}
				region={initialLocalization}
			>
				{myPosition ? (
					<Marker coordinate={myPosition} title={'Meu local'}>
						<Image style={styles.placeholderIcon} source={placeholder_icon} />
					</Marker>
				) : null}
			</MapView>

			<View style={styles.warning}>
				{sharingLocalization ? <WarningSharingLocalization /> : null}
			</View>

			<View style={styles.modal}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => setModalVisible(false)}
				>
					<ShowVehicle
						vehicleFunctions={vehicleFunctions}
						vehicleInfos={vehicle}
						statusVehicle={vehicleStatus}
						onPressCloseButton={() => setModalVisible(!modalVisible)}
						onPressUpdateVehiclesInfo={() => updateInfosVehicle()}
					/>
				</Modal>
			</View>
			<Menu
				onPressShareLocalizationButton={() => setSharingLocalization(!sharingLocalization)}
				onPressShowVehicleInfos={() => setModalVisible(!modalVisible)}
				onPressConfigButton={() =>
					navigation.navigate('SettingsDriver', {
						uid: company.uid,
						registration_Plate: vehicle.registration_plate,
					})
				}
			/>
		</Screen>
	);
}
