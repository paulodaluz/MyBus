import React, { useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { saveNewBusStation } from '../../../service/BusStationsService';
import { purple } from '../../../styles/colors';
import { Button } from './Button';
import { Header } from './Header';
import { styles } from './style';

export default function ChoicePointsVehicleWillPass({ navigation, route }) {
	const { uid, vehicle } = route.params;

	const [busPoints, setBusPoints] = useState([]);

	const initialLocalization = {
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.15,
		longitudeDelta: 0.15,
	};

	const removePoint = (pointToRemove) => {
		const newBusStations = [];

		busPoints.find((point) => {
			if (
				point.latitude !== pointToRemove.latitude &&
				point.longitude !== pointToRemove.longitude
			) {
				newBusStations.push(point);
			}
		});

		setBusPoints(newBusStations);
	};

	const saveBustations = () => {
		const busStations = {
			busPoints,
			registration_plate: vehicle.registration_plate,
		};

		saveNewBusStation(busStations);
		navigation.navigate('ListVehicleInfosCompany', { uid, receivedVehicle: vehicle });
	};

	return (
		<View>
			<Header title={'SELECIONE OS PONTOS QUE O\nTRANSPORTE IRÁ PASSAR'} />

			<MapView
				style={styles.mapStyle}
				initialRegion={initialLocalization}
				region={initialLocalization}
				onPress={(event) => {
					setBusPoints([...busPoints, event.nativeEvent.coordinate]);
				}}
			>
				{busPoints.map((point, key) => (
					<Marker
						onPress={() => removePoint(point)}
						key={key}
						coordinate={{ latitude: point.latitude, longitude: point.longitude }}
						title={'Ponto de Embarque'}
					/>
				))}
			</MapView>
			<View style={styles.button}>
				<Button onPress={saveBustations} textButton={'FINALIZAR'} backgroundColor={purple} />
			</View>
		</View>
	);
}
