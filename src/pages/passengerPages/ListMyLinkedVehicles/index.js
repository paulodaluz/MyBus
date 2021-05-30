import React, { useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { removePrivateVehicle } from '../../../backend/users/Passenger';
import { getMyVehicles } from '../../../backend/vehicles/Vehicle';
import { Header } from '../../../components/Header';
import { BoxWithInfoVehicles } from './List';
import { styles } from './style';

export default function ListMyLinkedVehicles({ route }) {
	const { uid } = route.params;

	const [vehicles, setVehicles] = useState([]);

	const removeVehicle = async (item) => {
		await removePrivateVehicle(uid, item.id_to_passengers, item.registration_plate);
		await getVehicleData();
	};

	const getVehicleData = async () => {
		setVehicles(await getMyVehicles(uid));
	};

	useLayoutEffect(() => {
		getVehicleData();
	}, []);

	const renderVehicle = ({ item }) => (
		<BoxWithInfoVehicles item={item} onPress={() => removeVehicle(item)} />
	);

	return (
		<View>
			<View style={styles.header}>
				<Header title={'Meus Veículos'} />
			</View>

			<View style={styles.body}>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={vehicles}
					renderItem={renderVehicle}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}
