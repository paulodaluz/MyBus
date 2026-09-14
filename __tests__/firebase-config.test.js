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
	afterEach(() => {
		jest.dontMock('firebase/compat/app');
		jest.dontMock('firebase/compat/auth');
		jest.dontMock('firebase/compat/database');
		jest.dontMock('firebase/compat/firestore');
	});

	test('initializes Firebase once when no app exists', () => {
		const { configuration, firebase, initializedApp } = loadFirebaseConfiguration([]);
		expect(firebase.initializeApp).toHaveBeenCalledWith(
			expect.objectContaining({ projectId: undefined })
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
