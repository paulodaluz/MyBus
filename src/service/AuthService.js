import { removeStorage } from './AsyncStorage';
import { firebase } from '../database/FirebaseConfiguration';

export const register = (email, password) => {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((retorno) => resolve(retorno))
			.catch((error) => {
				console.log(`AuthService - register - ERROR = ${error}`);
				reject(error);
			});
	});
};

export const login = (email, password) => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((retorno) => retorno)
		.catch((error) => {
			console.log(`AuthService - login - ERROR = ${error}`);
			return error;
		});
};

// Only the account UID is persisted today. Do not clear unrelated device storage.
export const logout = async () => {
	await firebase.auth().signOut();
	const error = await removeStorage('uid');
	if (error) {
		throw error;
	}
};

export const requestPasswordReset = async (email) => {
	try {
		await firebase.auth().sendPasswordResetEmail(email.trim());
	} catch (error) {
		// Existing and unknown addresses must receive the same user-facing response.
		if (error.code !== 'auth/user-not-found') {
			throw error;
		}
	}
};
