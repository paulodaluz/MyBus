import { db } from "../database/FirebaseConfiguration";

export const saveVehicle = async (vehicle) => {
    return await db.collection("vehicles")
        .add(vehicle)
        .then((result) => {return(result)})
        .catch((error) => {return(error)});
};

export const updateVehicle = async (id, infosToUpdate) => {
		return new Promise((resolve, reject) => {
				db.collection("vehicles")
						.doc(id)
						.update(infosToUpdate)
						.then(() => resolve())
						.catch((error) => {
								console.log(`updateVehicle ERROR = ${error}`);
								reject(error);
						});
		});
}

export const getAllVehicles = async () => {
    let vehicles = [];
    const snapshot = await db.collection('vehicles').get();
    snapshot.forEach((doc) => {
        let vehicle = doc.data();
        vehicle.id = doc.id;
        vehicles.push(vehicle);
    });

    return vehicles;
};

export const deleteVehicle = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("vehicles")
      .doc(id)
      .delete()
      .then(() => resolve())
      .catch((erro) => reject(erro));
  });
};
