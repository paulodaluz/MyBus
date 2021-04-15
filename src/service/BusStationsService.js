import { db } from '../database/FirebaseConfiguration';

export const getAllBusStations = async () => {
	let busStations = [];
	const snapshot = await db.collection('bus_stations').get();

	snapshot.forEach((doc) => {
		let busStation = doc.data();

		busStation.id = doc.id;
		busStations.push(busStation);
	});

	return busStations;
};
