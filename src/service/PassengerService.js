import { db } from "../database/FirebaseConfiguration";

export const saveUser = async (user) => {
	return await db.collection("passengers")
		.add(user)
		.then((result) => {return(result)})
		.catch((error) => {
			console.log(`PassengerService - saveUser - ERROR = ${error}`);
			return(error);
		});
};

export const updateUser = async (id, infosToUpdate) => {
	return new Promise((resolve, reject) => {
		db.collection("passengers")
			.doc(id)
			.update(infosToUpdate)
			.then(() => resolve())
			.catch((error) => {
				console.log(`PassengerService - updateUser - ERROR = ${error}`);
				reject(error);
			});
		});
}

export const getAllUsers = async () => {
	let users = [];
	const snapshot = await db.collection('passengers').get();
	snapshot.forEach((doc) => {
		let user = doc.data();
		user.id = doc.id;
		users.push(user);
	});

	return users;
};
