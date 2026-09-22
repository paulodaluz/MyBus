import { WideButton } from '../../../components/WideButton';
import { useMapRegion } from '../../../hooks/useMapRegion';
import { Screen } from '../../../components/commonComponents/Screen';
import { firebase } from '../../../database/FirebaseConfiguration';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import bus_icon from '../../../assets/icons/png/map/bus_icon.png';
import { Menu } from '../../../components/Menu';
import { styles } from './style';

export default function MapCompany({ navigation, route }) {
	const { user } = route.params;

	const [realTimeVehicles, setRealTimeVehicles] = useState([]);

	const mapRegion = useMapRegion(navigation, user);
	const buildDadosVehicles = useCallback(async (allLocalizations, vehiclesPlate) => {
		const myVehicles = [];

		vehiclesPlate.forEach((vehiclePlate) => {
			for (let index in allLocalizations) {
				if (allLocalizations[index][vehiclePlate]) {
					let vehicle = {
						registration_plate: vehiclePlate,
						...allLocalizations[index][vehiclePlate],
					};
					myVehicles.push(vehicle);
				}
			}
		});
		setRealTimeVehicles(myVehicles);
	}, []);

	const getAllLocalizationVehicles = useCallback(async () => {
		firebase
			.database()
			.ref('/real_time_database')
			.on('value', (snapchot) => {
				let allLocalizations = snapchot.val();
				if (allLocalizations) {
					buildDadosVehicles(allLocalizations, user.linked_vehicles);
				}
			});
	}, [buildDadosVehicles, user.linked_vehicles]);

	useLayoutEffect(() => {
		getAllLocalizationVehicles();
	}, [getAllLocalizationVehicles]);

	return (
		<Screen scroll={false}>
			<MapView
				style={styles.mapStyle}
				ref={mapRegion.mapRef}
				initialRegion={mapRegion.initialRegion}
				onPanDrag={mapRegion.onMapGesture}
				onTouchStart={mapRegion.onMapGesture}
			>
				{realTimeVehicles.map((vehicle, key) => (
					<Marker
						onPress={() =>
							navigation.navigate('ListVehicleInfosCompany', {
								registrationPlate: vehicle.registration_plate,
								uid: user.uid,
								status: vehicle.status,
							})
						}
						key={key}
						coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
						title={vehicle.registration_plate}
					>
						<Image source={bus_icon} style={styles.busIcon} />
					</Marker>
				))}
			</MapView>

			<WideButton textButton="Centralizar mapa" onPress={mapRegion.recenter} />
			<Menu
				onPressFirstButton={() => navigation.navigate('CreateNewVehicle', { uid: user.uid })}
				textFirstButton={'CADASTRAR NOVO VEÍCULO'}
				onPressSecondButton={() => navigation.navigate('SettingsCompany')}
				textSecondButton={'CONFIGURAÇÕES'}
			/>
		</Screen>
	);
}
