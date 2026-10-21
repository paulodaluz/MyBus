import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const saveVehicle = async (vehicle) => {
	return await addDoc(collection(db, 'vehicles'), vehicle)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`VehicleService - saveVehicle - ERROR = ${error}`);
			return error;
		});
};

export const updateVehicle = async (id, infosToUpdate) => {
	return new Promise((resolve, reject) => {
		updateDoc(doc(db, 'vehicles', id), infosToUpdate)
			.then(() => resolve())
			.catch((error) => {
				console.log(`VehicleService - updateVehicle - ERROR = ${error}`);
				reject(error);
			});
	});
};

export const getAllVehicles = async () => {
	let vehicles = [];
	const snapshot = await getDocs(collection(db, 'vehicles'));
	snapshot.forEach((document) => {
		let vehicle = document.data();
		vehicle.id = document.id;
		vehicles.push(vehicle);
	});

	return vehicles;
};

export const deleteVehicle = (id) => {
	return new Promise((resolve, reject) => {
		deleteDoc(doc(db, 'vehicles', id))
			.then(() => resolve())
			.catch((error) => {
				console.log(`VehicleService - deleteVehicle - ERROR = ${error}`);
				reject(error);
			});
	});
};
