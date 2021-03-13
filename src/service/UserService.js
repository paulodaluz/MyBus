import { db } from "../database/FirebaseConfiguration";

export const saveUser = async (user, chave = "") => {
    return db.collection("users")
        .add(user)
        .then((result) => {return(result)})
        .catch((error) => {return(error)});
};

export const updateUser = async (id, typeOfVehicleListed, codesOfPrivateVehicles) => {
    if(typeOfVehicleListed === 'public') {
        return new Promise((resolve, reject) => {
            db.collection("users")
                .doc(id)
                .update({type_of_vehicle_listed: typeOfVehicleListed})
                .then(() => resolve())
                .catch((error) => {
                    console.log(`updateUser ERROR = ${error}`);
                    reject(erro);
                });
        });
    }
    if(typeOfVehicleListed === 'private') {
        return new Promise((resolve, reject) => {
            db.collection("users")
                .doc(id)
                .update({type_of_vehicle_listed: typeOfVehicleListed, codes_private_vehicles: codesOfPrivateVehicles})
                .then(() => resolve())
                .catch((error) => {
                    console.log(`updateUser ERROR = ${error}`);
                    reject(erro);
                });
        });
    }
};

export const getAllUsers = async () => {
    let users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id
        users.push(user);
    });

    return users;
};