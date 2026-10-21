import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
	connectAuthEmulator,
	getAuth,
	initializeAuth,
	getReactNativePersistence,
} from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const requiredFields = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'appId'];
const missingFields = requiredFields.filter((field) => !firebaseConfig[field]?.trim());
const missingNames = missingFields.join(', ');
const configurationError = missingFields.length
	? `Configuração Firebase ausente: ${missingNames}. Preencha o arquivo .env conforme .env.example e reinicie o aplicativo.`
	: null;
let firebaseApp = null;
let existingApp = false;
if (!configurationError) {
	existingApp = getApps().length > 0;
	firebaseApp = existingApp ? getApp() : initializeApp(firebaseConfig);
}
const db = firebaseApp ? getFirestore(firebaseApp) : null;
const auth = firebaseApp
	? Platform.OS === 'web' || existingApp
		? getAuth(firebaseApp)
		: initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) })
	: null;
const realtimeDb = firebaseApp ? getDatabase(firebaseApp) : null;

// This opt-in is compiled only into the local demo build, never a real project.
const emulatorHost = process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST;
if (firebaseApp && emulatorHost) {
	if (firebaseApp.options.projectId !== 'demo-mybus') {
		throw new Error('Emuladores E2E exigem o projeto demo-mybus.');
	}
	connectAuthEmulator(auth, `http://${emulatorHost}:9099`, { disableWarnings: true });
	connectFirestoreEmulator(db, emulatorHost, 8080);
	connectDatabaseEmulator(realtimeDb, emulatorHost, 9000);
}

export { db, auth, realtimeDb, configurationError };
