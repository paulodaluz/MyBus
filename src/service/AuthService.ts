import { firebase } from '../database/FirebaseConfiguration';

export const register = (email: string, password: string): Promise<any> => {
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

export const login = async (email: string, password: string): Promise<any> => {
	return firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((retorno) => retorno)
		.catch((error) => {
			console.log(`AuthService - login - ERROR = ${error}`);
			throw error;
		});
};
