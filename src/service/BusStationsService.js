import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const getAllBusStations = async () => {
	let busStations = [];
	const snapshot = await getDocs(collection(db, 'bus_stations'));

	snapshot.forEach((document) => {
		let busStation = document.data();

		busStation.id = document.id;
		busStations.push(busStation);
	});

	return busStations;
};

export const saveNewBusStation = async (busStations) => {
	return new Promise((resolve, reject) => {
		addDoc(collection(db, 'bus_stations'), busStations)
			.then((result) => {
				return resolve(result);
			})
			.catch((error) => {
				console.log(`BusStationService - saveNewBusStation - ERROR = ${error}`);
				return reject(error);
			});
	});
};
