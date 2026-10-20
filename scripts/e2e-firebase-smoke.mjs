import assert from 'node:assert/strict';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
	getFirestore,
	connectFirestoreEmulator,
	collection,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import {
	getDatabase,
	connectDatabaseEmulator,
	ref,
	set,
	get,
	onValue,
	remove,
} from 'firebase/database';

const app = initializeApp(
	{
		apiKey: 'demo-key',
		projectId: 'demo-mybus',
		databaseURL: 'https://demo-mybus.firebaseio.com',
		appId: 'smoke',
	},
	'e2e-smoke'
);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectDatabaseEmulator(realtimeDb, '127.0.0.1', 9000);
try {
	await signInWithEmailAndPassword(auth, 'passenger@mybus.test', 'Testpass123');
	const vehicles = collection(db, 'vehicles');
	const document = await addDoc(vehicles, { name: 'SDK smoke', registration_plate: 'SMOKE' });
	await updateDoc(document, { name: 'SDK updated' });
	assert.equal(
		(await getDocs(vehicles)).docs.find((entry) => entry.id === document.id).data().name,
		'SDK updated'
	);
	await deleteDoc(document);
	assert.equal(
		(await getDocs(vehicles)).docs.some((entry) => entry.id === document.id),
		false
	);
	const location = ref(realtimeDb, '/e2e-smoke');
	let dispose;
	const received = new Promise((resolve, reject) => {
		dispose = onValue(
			location,
			(snapshot) => {
				if (snapshot.val()?.status === 'ok') resolve(snapshot.val());
			},
			reject
		);
	});
	await set(location, { latitude: 1, longitude: 2, status: 'ok' });
	assert.deepEqual(await received, { latitude: 1, longitude: 2, status: 'ok' });
	dispose();
	assert.equal((await get(location)).val().status, 'ok');
	await remove(location);
	await signOut(auth);
	await assert.rejects(
		signInWithEmailAndPassword(auth, 'passenger@mybus.test', 'WrongPassword'),
		(error) => error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential'
	);
	console.log('PASS: modular Auth, Firestore CRUD, RTDB write/read/listener and Auth error codes.');
} finally {
	await deleteApp(app);
}
