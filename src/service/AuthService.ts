import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { removeStorage } from './AsyncStorage';
import { auth, configurationError } from '../database/FirebaseConfiguration';

const requireAuth = () => {
	if (!auth) {
		throw new Error(configurationError || 'Firebase Auth indisponível.');
	}
	return auth;
};

export const hasAuthCode = (error: unknown, code: string): boolean =>
	typeof error === 'object' && error !== null && 'code' in error && error.code === code;

export const register = (email: string, password: string) => {
	return new Promise<UserCredential>((resolve, reject) => {
		createUserWithEmailAndPassword(requireAuth(), email, password)
			.then((retorno) => resolve(retorno))
			.catch((error: unknown) => {
				console.log(`AuthService - register - ERROR = ${error}`);
				reject(error);
			});
	});
};

export const login = (email: string, password: string) => {
	return signInWithEmailAndPassword(requireAuth(), email, password)
		.then((retorno) => retorno)
		.catch((error: unknown) => {
			console.log(`AuthService - login - ERROR = ${error}`);
			return error;
		});
};

// Only the account UID is persisted today. Do not clear unrelated device storage.
export const logout = async () => {
	await signOut(requireAuth());
	const error = await removeStorage('uid');
	if (error) {
		throw error;
	}
};

export const requestPasswordReset = async (email: string) => {
	try {
		await sendPasswordResetEmail(requireAuth(), email.trim());
	} catch (error) {
		// Existing and unknown addresses must receive the same user-facing response.
		if (!hasAuthCode(error, 'auth/user-not-found')) {
			throw error;
		}
	}
};
