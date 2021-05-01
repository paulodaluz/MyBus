import React, { useState } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { purple } from '../../../styles/colors';
import { Button } from './Button';
import { Header } from './Header';
import { styles } from './style';

export default function ChoicePointsVehicleWillPass({ navigation, route }) {
	const [busPoints, setBusPoints] = useState([]);

	const initialLocalization = {
		latitude: -28.2612,
		longitude: -52.4083,
		latitudeDelta: 0.15,
		longitudeDelta: 0.15,
	};

	return (
		<View>
			<Header title={'SELECIONE OS PONTOS QUE O\nTRANSPORTE IRÁ PASSAR'} />

			<MapView
				style={styles.mapStyle}
				initialRegion={initialLocalization}
				region={initialLocalization}
			/>
			<View style={styles.button}>
				<Button onPress={() => console.log()} textButton={'FINALIZAR'} backgroundColor={purple} />
			</View>
		</View>
	);
}
