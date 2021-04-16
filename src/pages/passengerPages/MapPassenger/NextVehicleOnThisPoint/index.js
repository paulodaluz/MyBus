import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import MapImage from '../../../../assets/icons/png/map.png';
import { Button } from '../../../../components/Button';
import { Divisor } from '../../../../components/Divisor';
import { darkGrey } from '../../../../styles/colors';
import { styles } from './style';

const renderItem = ({ item }) => (
	<View>
		<View style={styles.item}>
			<Text style={styles.textVehicle}>{item.vehicleName}</Text>
			{/* <Image
						style={}
						source={icon_clock}
					/> */}
			<Text style={styles.textVehicle}>{item.vehicleTime} min</Text>
		</View>
		<Divisor />
	</View>
);

const NextVehicleOnThisPoint = ({ openOnMap }) => (
	<View style={styles.container}>
		<View style={styles.containerTitle}>
			<Image style={styles.iconTitle} source={MapImage} />
			<Text style={styles.title}>Próximos veículos neste ponto</Text>
		</View>

		<View style={styles.body}>
			<FlatList
				data={[
					{ id: '1', vehicleName: 'L01 - Vera Cruz - São Cristóvão', vehicleTime: 12 },
					{ id: '2', vehicleName: 'L07 - Hipica - Planaltina', vehicleTime: 18 },
				]}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>

		<View style={styles.button}>
			<Button onPress={openOnMap} backgroundColor={darkGrey} textButton={'Acompanhar no mapa!'} />
		</View>
	</View>
);

export { NextVehicleOnThisPoint };

