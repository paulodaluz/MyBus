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

export const saveNewBusStation = async (busStations) => {
	return new Promise((resolve, reject) => {
		db.collection('bus_stations')
			.add(busStations)
			.then((result) => {
				return resolve(result);
			})
			.catch((error) => {
				console.log(`BusStationService - saveNewBusStation - ERROR = ${error}`);
				return reject(error);
			});
	});
};
