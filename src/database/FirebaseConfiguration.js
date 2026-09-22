import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

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
const configurationError = missingFields.length
	? `Configuração Firebase ausente: ${missingFields.join(
			', '
	  )}. Preencha o arquivo .env conforme .env.example e reinicie o aplicativo.`
	: null;
const firebaseApp = configurationError
	? null
	: firebase.apps.length
	? firebase.app()
	: firebase.initializeApp(firebaseConfig);
const db = firebaseApp ? firebaseApp.firestore() : null;

export { db, firebase, configurationError };
