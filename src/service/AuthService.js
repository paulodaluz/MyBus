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
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((retorno) => resolve(retorno))
			.catch((error) => {
				console.log(`AuthService - login - ERROR = ${error}`);
				reject(error);
			});
	});
};
