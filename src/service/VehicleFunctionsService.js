import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const saveFunctionsVehicle = async (functionsVehicle) => {
	return await addDoc(collection(db, 'vehicle_functions'), functionsVehicle)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`VehicleFunctionsService - saveFunctionsVehicle - ERROR = ${error}`);
			return error;
		});
};

export const updateFunctionsVehicle = async (id, functionsVehicle) => {
	return new Promise((resolve, reject) => {
		updateDoc(doc(db, 'vehicle_functions', id), functionsVehicle)
			.then(() => resolve())
			.catch((error) => {
				console.log(`VehicleFunctionsService - updateFunctionsVehicle - ERROR = ${error}`);
				reject(error);
			});
	});
};

export const getAllFunctionsVehicles = async () => {
	let functionsVehicles = [];
	const snapshot = await getDocs(collection(db, 'vehicle_functions'));
	snapshot.forEach((document) => {
		let functionsVehicle = document.data();
		functionsVehicle.id = document.id;
		functionsVehicles.push(functionsVehicle);
	});

	return functionsVehicles;
};

export const deleteVehicleFunctions = (id) => {
	return new Promise((resolve, reject) => {
		deleteDoc(doc(db, 'vehicle_functions', id))
			.then(() => resolve())
			.catch((error) => {
				console.log(`VehicleFunctionsService - deleteVehicleFunctions - ERROR = ${error}`);
				reject(error);
			});
	});
};
