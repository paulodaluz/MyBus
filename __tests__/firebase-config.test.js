const loadFirebaseConfiguration = (apps) => {
	jest.resetModules();
	const existingApp = { firestore: jest.fn(() => ({ name: 'existing-db' })) };
	const initializedApp = { firestore: jest.fn(() => ({ name: 'initialized-db' })) };
	const firebase = {
		apps,
		app: jest.fn(() => existingApp),
		initializeApp: jest.fn(() => initializedApp),
	};

	jest.doMock('firebase/compat/app', () => ({ __esModule: true, default: firebase }));
	jest.doMock('firebase/compat/auth', () => ({}));
	jest.doMock('firebase/compat/database', () => ({}));
	jest.doMock('firebase/compat/firestore', () => ({}));

	let configuration;
	jest.isolateModules(() => {
		configuration = require('../src/database/FirebaseConfiguration');
	});
	return { configuration, firebase, existingApp, initializedApp };
};

describe('Firebase configuration', () => {
	const fields = ['API_KEY', 'AUTH_DOMAIN', 'DATABASE_URL', 'PROJECT_ID', 'APP_ID'];
	beforeEach(() => {
		fields.forEach((field) => {
			process.env[`EXPO_PUBLIC_FIREBASE_${field}`] = 'test-fixture';
		});
	});
	test('does not initialize Firebase with missing or blank configuration', () => {
		delete process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
		process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID = ' ';
		const { configuration, firebase } = loadFirebaseConfiguration([]);
		expect(configuration.configurationError).toContain('apiKey, projectId');
		expect(configuration.db).toBeNull();
		expect(firebase.initializeApp).not.toHaveBeenCalled();
	});
	afterEach(() => {
		jest.dontMock('firebase/compat/app');
		jest.dontMock('firebase/compat/auth');
		jest.dontMock('firebase/compat/database');
		jest.dontMock('firebase/compat/firestore');
	});

	test('initializes Firebase once when no app exists', () => {
		const { configuration, firebase, initializedApp } = loadFirebaseConfiguration([]);
		expect(firebase.initializeApp).toHaveBeenCalledWith(
			expect.objectContaining({ projectId: 'test-fixture' })
		);
		expect(configuration.db).toEqual({ name: 'initialized-db' });
		expect(configuration.firebase).toBe(firebase);
		expect(initializedApp.firestore).toHaveBeenCalledTimes(1);
	});

	test('reuses the existing Firebase app', () => {
		const { configuration, firebase, existingApp } = loadFirebaseConfiguration([{}]);
		expect(firebase.app).toHaveBeenCalledTimes(1);
		expect(firebase.initializeApp).not.toHaveBeenCalled();
		expect(configuration.db).toEqual({ name: 'existing-db' });
		expect(existingApp.firestore).toHaveBeenCalledTimes(1);
	});
});
