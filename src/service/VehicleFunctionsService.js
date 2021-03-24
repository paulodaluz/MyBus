import { db } from "../database/FirebaseConfiguration";

export const saveFunctionsVehicle = async (functionsVehicle) => {
	return await db.collection("vehicle_functions")
		.add(functionsVehicle)
		.then((result) => {return(result)})
		.catch((error) => {return(error)});
};

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
