import { db } from "../database/FirebaseConfiguration";

export const saveFunctionsVehicle = async (functionsVehicle) => {
	return await db.collection("vehicle_functions")
		.add(functionsVehicle)
		.then((result) => {return(result)})
		.catch((error) => {return(error)});
};

export const updateFunctionsVehicle = async (id, functionsVehicle) => {
	return new Promise((resolve, reject) => {
		db.collection("vehicle_functions")
			.doc(id)
			.update(functionsVehicle)
				.then(() => resolve())
				.catch((error) => {
						console.log(`updateFunctionsVehicle ERROR = ${error}`);
						reject(error);
				});
	});
}

export const getAllFunctionsVehicles = async () => {
	let functionsVehicles = [];
	const snapshot = await db.collection('vehicle_functions').get();
	snapshot.forEach((doc) => {
			let functionsVehicle = doc.data();
			functionsVehicle.id = doc.id;
			functionsVehicles.push(functionsVehicle);
	});

	return functionsVehicles;
};
