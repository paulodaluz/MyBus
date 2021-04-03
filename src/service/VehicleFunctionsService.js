import { db } from "../database/FirebaseConfiguration";

export const saveFunctionsVehicle = async (functionsVehicle) => {
	return await db.collection("vehicle_functions")
		.add(functionsVehicle)
		.then((result) => {return(result)})
		.catch((error) => {
			console.log(`VehicleFunctionsService - saveFunctionsVehicle - ERROR = ${error}`);
			return(error);
		});
};

export const updateFunctionsVehicle = async (id, functionsVehicle) => {
	return new Promise((resolve, reject) => {
		db.collection("vehicle_functions")
			.doc(id)
			.update(functionsVehicle)
				.then(() => resolve())
				.catch((error) => {
					console.log(`VehicleFunctionsService - updateFunctionsVehicle - ERROR = ${error}`);
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

export const deleteVehicleFunctions = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("vehicle_functions")
      .doc(id)
      .delete()
      .then(() => resolve())
      .catch((erro) => {
				console.log(`VehicleFunctionsService - deleteVehicleFunctions - ERROR = ${error}`);
				reject(erro);
			});
  });
};
