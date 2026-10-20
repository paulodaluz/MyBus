import { collection, doc, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const saveUser = async (user) => {
	return await addDoc(collection(db, 'passengers'), user)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`PassengerService - saveUser - ERROR = ${error}`);
			return error;
		});
};

export const updateUser = async (id, infosToUpdate) => {
	return new Promise((resolve, reject) => {
		updateDoc(doc(db, 'passengers', id), infosToUpdate)
			.then(() => resolve())
			.catch((error) => {
				console.log(`PassengerService - updateUser - ERROR = ${error}`);
				reject(error);
			});
	});
};

export const getAllUsers = async () => {
	let users = [];
	const snapshot = await getDocs(collection(db, 'passengers'));
	snapshot.forEach((document) => {
		let user = document.data();
		user.id = document.id;
		users.push(user);
	});

	return users;
};
