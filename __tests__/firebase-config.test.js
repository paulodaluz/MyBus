jest.mock('@react-native-async-storage/async-storage', () => ({
	__esModule: true,
	default: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
}));
const loadFirebaseConfiguration = (apps) => {
	jest.resetModules();
	const firebase = {
		getApps: jest.fn(() => apps),
		getApp: jest.fn(() => ({
			name: 'existing',
			options: { projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID },
		})),
		initializeApp: jest.fn(() => ({
			name: 'initialized',
			options: { projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID },
		})),
	};
	const connectAuthEmulator = jest.fn();
	const connectDatabaseEmulator = jest.fn();
	const connectFirestoreEmulator = jest.fn();
	const getFirestore = jest.fn((app) => ({ name: `${app.name}-db` }));
	const getAuth = jest.fn(() => ({ name: 'auth' }));
	const initializeAuth = jest.fn((app) => getAuth(app));
	const getReactNativePersistence = jest.fn(() => 'native-persistence');
	const getDatabase = jest.fn(() => ({ name: 'realtime' }));
	jest.doMock('firebase/app', () => firebase);
	jest.doMock('firebase/auth', () => ({
		getAuth,
		connectAuthEmulator,
		initializeAuth,
		getReactNativePersistence,
	}));
	jest.doMock('firebase/database', () => ({ getDatabase, connectDatabaseEmulator }));
	jest.doMock('firebase/firestore', () => ({ getFirestore, connectFirestoreEmulator }));
	let configuration;
	jest.isolateModules(() => {
		configuration = require('../src/database/FirebaseConfiguration');
	});
	return {
		configuration,
		firebase,
		getFirestore,
		getAuth,
		getDatabase,
		initializeAuth,
		getReactNativePersistence,
		connectAuthEmulator,
		connectDatabaseEmulator,
		connectFirestoreEmulator,
	};
};
describe('Firebase configuration', () => {
	const fields = ['API_KEY', 'AUTH_DOMAIN', 'DATABASE_URL', 'PROJECT_ID', 'APP_ID'];
	const original = {};
	const originalHost = process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST;
	beforeEach(() => {
		delete process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST;
	});
	afterAll(() => {
		if (originalHost === undefined) {
			delete process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST;
		} else {
			process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST = originalHost;
		}
	});
	beforeAll(() =>
		fields.forEach((field) => {
			original[field] = process.env[`EXPO_PUBLIC_FIREBASE_${field}`];
		})
	);
	beforeEach(() =>
		fields.forEach((field) => {
			process.env[`EXPO_PUBLIC_FIREBASE_${field}`] = 'test-fixture';
		})
	);
	afterAll(() =>
		fields.forEach((field) => {
			const key = `EXPO_PUBLIC_FIREBASE_${field}`;
			if (original[field] === undefined) {
				delete process.env[key];
			} else {
				process.env[key] = original[field];
			}
		})
	);
	afterEach(() =>
		['app', 'auth', 'database', 'firestore'].forEach((service) =>
			jest.dontMock(`firebase/${service}`)
		)
	);
	test('does not initialize any service with missing or blank configuration', () => {
		delete process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
		process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID = ' ';
		const { configuration, firebase, getAuth, getDatabase, getFirestore } =
			loadFirebaseConfiguration([]);
		expect(configuration.configurationError).toContain('apiKey, projectId');
		expect(configuration.db).toBeNull();
		expect(configuration.auth).toBeNull();
		expect(configuration.realtimeDb).toBeNull();
		expect(firebase.initializeApp).not.toHaveBeenCalled();
		[getAuth, getDatabase, getFirestore].forEach((service) =>
			expect(service).not.toHaveBeenCalled()
		);
	});

	test('web initialization uses browser Auth instead of React Native persistence', () => {
		jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
		try {
			const config = loadFirebaseConfiguration([]);
			expect(config.configuration.auth).toEqual({ name: 'auth' });
			expect(config.initializeAuth).not.toHaveBeenCalled();
			expect(config.getReactNativePersistence).not.toHaveBeenCalled();
		} finally {
			jest.dontMock('react-native');
		}
	});

	test.each([[[]], [[{}]]])(
		'creates or reuses one app and one instance per service: %j',
		(apps) => {
			const {
				configuration,
				firebase,
				getAuth,
				getDatabase,
				getFirestore,
				initializeAuth,
				getReactNativePersistence,
			} = loadFirebaseConfiguration(apps);
			if (apps.length) {
				expect(firebase.getApp).toHaveBeenCalledTimes(1);
				expect(initializeAuth).not.toHaveBeenCalled();
				expect(firebase.initializeApp).not.toHaveBeenCalled();
			} else {
				expect(initializeAuth).toHaveBeenCalledWith(expect.any(Object), {
					persistence: 'native-persistence',
				});
				expect(getReactNativePersistence).toHaveBeenCalledWith(
					expect.objectContaining({
						getItem: expect.any(Function),
						setItem: expect.any(Function),
						removeItem: expect.any(Function),
					})
				);
				expect(firebase.initializeApp).toHaveBeenCalledWith(
					expect.objectContaining({ projectId: 'test-fixture' })
				);
			}
			expect(configuration.configurationError).toBeNull();
			expect(configuration.db.name).toContain('-db');
			expect(configuration.auth).toEqual({ name: 'auth' });
			expect(configuration.realtimeDb).toEqual({ name: 'realtime' });
			[getAuth, getDatabase, getFirestore].forEach((service) =>
				expect(service).toHaveBeenCalledTimes(1)
			);
		}
	);
});

test('only the explicit demo build connects all services to emulators', () => {
	process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST = '127.0.0.1';
	process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID = 'demo-mybus';
	['API_KEY', 'AUTH_DOMAIN', 'DATABASE_URL', 'APP_ID'].forEach((field) => {
		process.env[`EXPO_PUBLIC_FIREBASE_${field}`] = 'fixture';
	});
	const config = loadFirebaseConfiguration([]);
	expect(config.connectAuthEmulator).toHaveBeenCalledWith(
		config.configuration.auth,
		'http://127.0.0.1:9099',
		{ disableWarnings: true }
	);
	expect(config.connectFirestoreEmulator).toHaveBeenCalledWith(
		config.configuration.db,
		'127.0.0.1',
		8080
	);
	expect(config.connectDatabaseEmulator).toHaveBeenCalledWith(
		config.configuration.realtimeDb,
		'127.0.0.1',
		9000
	);
	process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID = 'real-project';
	expect(() => loadFirebaseConfiguration([])).toThrow('demo-mybus');
	delete process.env.EXPO_PUBLIC_FIREBASE_EMULATOR_HOST;
});
