import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import clock_icon from '../../../../assets/icons/png/clock_icon.png';
import MapImage from '../../../../assets/icons/png/map.png';
import { Divisor } from '../../../../components/Divisor';
import { WideButton } from '../../../../components/WideButton';
import { darkGrey } from '../../../../styles/colors';
import { styles } from './style';

const renderItem = ({ item }) => (
	<View>
		<View style={styles.item}>
			<Text style={styles.vehicleName}>{item.name}</Text>

			<View style={styles.containerVehicleTime}>
				<Image style={styles.clockIcon} source={clock_icon} />

				<Text style={styles.timeVehicle}>12 min</Text>
			</View>
		</View>
		<Divisor />
	</View>
);

const NextVehicleOnThisPoint = ({ openOnMap, vehiclesOnThisPoint }) => (
	<View style={styles.container}>
		<View style={styles.containerTitle}>
			<Image style={styles.iconTitle} source={MapImage} />
			<Text style={styles.title}>Próximos veículos neste ponto</Text>
		</View>

		<View style={styles.body}>
			<FlatList
				data={vehiclesOnThisPoint}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>

		<View style={styles.button}>
			<WideButton
				onPress={openOnMap}
				backgroundColor={darkGrey}
				textButton={'Acompanhar no mapa!'}
			/>
		</View>
	</View>
);

export { NextVehicleOnThisPoint };

