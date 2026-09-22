const mockRemoveStorage = jest.fn();
jest.mock('../src/service/AsyncStorage', () => ({ removeStorage: mockRemoveStorage }));
const mockAdd = jest.fn();
const mockGet = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockDoc = jest.fn(() => ({ update: mockUpdate, delete: mockDelete }));
const mockCollection = { add: mockAdd, get: mockGet, doc: mockDoc };
const mockDb = { collection: jest.fn(() => mockCollection) };

const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockAuth = {
	signOut: jest.fn(),
	sendPasswordResetEmail: jest.fn(),
	createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
	signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
};
const mockSet = jest.fn();
const mockOn = jest.fn();
const mockRealtimeRef = { set: mockSet, on: mockOn };
const mockRealtime = { ref: jest.fn(() => mockRealtimeRef) };
const mockFirebase = {
	auth: jest.fn(() => mockAuth),
	database: jest.fn(() => mockRealtime),
};

jest.mock('../src/database/FirebaseConfiguration', () => ({ db: mockDb, firebase: mockFirebase }));

const { login, register, logout, requestPasswordReset } = require('../src/service/AuthService');
const { getAllBusStations, saveNewBusStation } = require('../src/service/BusStationsService');
const {
	getAllFeedbacks: getCompanyFeedbacks,
	saveFeedback: saveCompanyFeedback,
} = require('../src/service/CompanyFeedbackService');
const { getAllCompanies, saveCompany, updateCompany } = require('../src/service/CompanyService');
const {
	getAllLocalizationVehicles,
	getLocalizationVehicles,
	getSpecificVehicle,
	registerRealTimeLocalVehicle,
} = require('../src/service/MapLocalizationService');
const { saveFeedback: saveAppFeedback } = require('../src/service/MyBusFeedback');
const { getAllUsers, saveUser, updateUser } = require('../src/service/PassengerService');
const {
	deleteVehicleFunctions,
	getAllFunctionsVehicles,
	saveFunctionsVehicle,
	updateFunctionsVehicle,
} = require('../src/service/VehicleFunctionsService');
const {
	deleteVehicle,
	getAllVehicles,
	saveVehicle,
	updateVehicle,
} = require('../src/service/VehicleService');

const snapshotWith = (documents) => ({
	forEach: (callback) =>
		documents.forEach(({ id, data }) => callback({ id, data: () => ({ ...data }) })),
});

describe('Firebase-backed services', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockOn.mockImplementation((event, callback) => callback({ val: () => undefined }));
	});

	afterAll(() => {
		if (console.log.mockRestore) {
			console.log.mockRestore();
		}
	});

	test('registers and logs in through AuthService', async () => {
		const registration = { user: { uid: 'user-1' } };
		mockCreateUserWithEmailAndPassword.mockResolvedValueOnce(registration);
		await expect(register('user@example.com', 'Password1')).resolves.toBe(registration);
		expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
			'user@example.com',
			'Password1'
		);

		const loginResult = { user: { uid: 'user-1' } };
		mockSignInWithEmailAndPassword.mockResolvedValueOnce(loginResult);
		await expect(login('user@example.com', 'Password1')).resolves.toBe(loginResult);

		const error = new Error('invalid credentials');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockCreateUserWithEmailAndPassword.mockRejectedValueOnce(error);
		mockSignInWithEmailAndPassword.mockRejectedValueOnce(error);
		await expect(register('user@example.com', 'bad')).rejects.toBe(error);
		await expect(login('user@example.com', 'bad')).resolves.toBe(error);
		console.log.mockRestore();
	});

	test('saves and reads bus stations', async () => {
		const station = { registration_plate: 'ABC-123', busPoints: [] };
		const added = { id: 'station-1' };
		mockAdd.mockResolvedValueOnce(added);
		await expect(saveNewBusStation(station)).resolves.toBe(added);
		mockGet.mockResolvedValueOnce(snapshotWith([{ id: 'station-1', data: station }]));
		await expect(getAllBusStations()).resolves.toEqual([{ ...station, id: 'station-1' }]);

		const error = new Error('station failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		await expect(saveNewBusStation(station)).rejects.toBe(error);
		console.log.mockRestore();
	});

	test('persists company feedback and reads feedback documents', async () => {
		const feedback = { feedback: 'great' };
		mockAdd.mockResolvedValueOnce({ id: 'feedback-1' });
		await expect(saveCompanyFeedback(feedback)).resolves.toEqual({ id: 'feedback-1' });
		mockGet.mockResolvedValueOnce(snapshotWith([{ id: 'feedback-1', data: feedback }]));
		await expect(getCompanyFeedbacks()).resolves.toEqual([{ ...feedback, id: 'feedback-1' }]);

		const error = new Error('feedback failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		await expect(saveCompanyFeedback(feedback)).resolves.toBe(error);
		console.log.mockRestore();
	});

	test('persists, lists and updates companies', async () => {
		const company = { uid: 'company-1', name: 'Company' };
		mockAdd.mockResolvedValueOnce({ id: 'company-doc' });
		await expect(saveCompany(company)).resolves.toEqual({ id: 'company-doc' });
		mockGet.mockResolvedValueOnce(snapshotWith([{ id: 'company-doc', data: company }]));
		await expect(getAllCompanies()).resolves.toEqual([{ ...company, id: 'company-doc' }]);
		mockUpdate.mockResolvedValueOnce(undefined);
		await expect(updateCompany('company-doc', { name: 'New name' })).resolves.toBeUndefined();
		expect(mockDoc).toHaveBeenCalledWith('company-doc');

		const error = new Error('company failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		mockUpdate.mockRejectedValueOnce(error);
		await expect(saveCompany(company)).resolves.toBe(error);
		await expect(updateCompany('company-doc', {})).rejects.toBe(error);
		console.log.mockRestore();
	});

	test('persists, lists and updates passengers', async () => {
		const user = { uid: 'passenger-1', isPassenger: true };
		mockAdd.mockResolvedValueOnce({ id: 'passenger-doc' });
		await expect(saveUser(user)).resolves.toEqual({ id: 'passenger-doc' });
		mockGet.mockResolvedValueOnce(snapshotWith([{ id: 'passenger-doc', data: user }]));
		await expect(getAllUsers()).resolves.toEqual([{ ...user, id: 'passenger-doc' }]);
		mockUpdate.mockResolvedValueOnce(undefined);
		await expect(updateUser('passenger-doc', { name: 'New name' })).resolves.toBeUndefined();

		const error = new Error('passenger failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		mockUpdate.mockRejectedValueOnce(error);
		await expect(saveUser(user)).resolves.toBe(error);
		await expect(updateUser('passenger-doc', {})).rejects.toBe(error);
		console.log.mockRestore();
	});

	test('persists and reads app feedback', async () => {
		const feedback = { feedback: 'suggestion' };
		mockAdd.mockResolvedValueOnce({ id: 'app-feedback' });
		await expect(saveAppFeedback(feedback)).resolves.toEqual({ id: 'app-feedback' });

		const error = new Error('app feedback failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		await expect(saveAppFeedback(feedback)).resolves.toBe(error);
		console.log.mockRestore();
	});

	test('persists, lists, updates and deletes vehicle functions', async () => {
		const functions = { registration_plate: 'ABC-123', wifi: true };
		mockAdd.mockResolvedValueOnce({ id: 'function-doc' });
		await expect(saveFunctionsVehicle(functions)).resolves.toEqual({ id: 'function-doc' });
		mockGet.mockResolvedValueOnce(snapshotWith([{ id: 'function-doc', data: functions }]));
		await expect(getAllFunctionsVehicles()).resolves.toEqual([
			{ ...functions, id: 'function-doc' },
		]);
		mockUpdate.mockResolvedValueOnce(undefined);
		await expect(updateFunctionsVehicle('function-doc', functions)).resolves.toBeUndefined();
		mockDelete.mockResolvedValueOnce(undefined);
		await expect(deleteVehicleFunctions('function-doc')).resolves.toBeUndefined();

		const error = new Error('function failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		mockUpdate.mockRejectedValueOnce(error);
		mockDelete.mockRejectedValueOnce(error);
		await expect(saveFunctionsVehicle(functions)).resolves.toBe(error);
		await expect(updateFunctionsVehicle('function-doc', functions)).rejects.toBe(error);
		await expect(deleteVehicleFunctions('function-doc')).rejects.toBe(error);
		console.log.mockRestore();
	});

	test('persists, lists, updates and deletes vehicles', async () => {
		const vehicle = { registration_plate: 'ABC-123', name: 'Bus' };
		mockAdd.mockResolvedValueOnce({ id: 'vehicle-doc' });
		await expect(saveVehicle(vehicle)).resolves.toEqual({ id: 'vehicle-doc' });
		mockGet.mockResolvedValueOnce(snapshotWith([{ id: 'vehicle-doc', data: vehicle }]));
		await expect(getAllVehicles()).resolves.toEqual([{ ...vehicle, id: 'vehicle-doc' }]);
		mockUpdate.mockResolvedValueOnce(undefined);
		await expect(updateVehicle('vehicle-doc', vehicle)).resolves.toBeUndefined();
		mockDelete.mockResolvedValueOnce(undefined);
		await expect(deleteVehicle('vehicle-doc')).resolves.toBeUndefined();

		const error = new Error('vehicle failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAdd.mockRejectedValueOnce(error);
		mockUpdate.mockRejectedValueOnce(error);
		mockDelete.mockRejectedValueOnce(error);
		await expect(saveVehicle(vehicle)).resolves.toBe(error);
		await expect(updateVehicle('vehicle-doc', vehicle)).rejects.toBe(error);
		await expect(deleteVehicle('vehicle-doc')).rejects.toBe(error);
		console.log.mockRestore();
	});

	test('registers and reads real-time vehicle localization', async () => {
		const accessDatabase = { companyUid: 'company-1', vehiclePlate: 'ABC-123' };
		const location = { latitude: -23.5, longitude: -46.6, status: 'moving' };
		mockSet.mockResolvedValueOnce(undefined);
		registerRealTimeLocalVehicle(accessDatabase, location);
		await Promise.resolve();
		expect(mockRealtime.ref).toHaveBeenCalledWith('/real_time_database/company-1/ABC-123');
		expect(mockSet).toHaveBeenCalledWith(location);

		mockOn.mockImplementationOnce((event, callback) =>
			callback({ val: () => ({ 'ABC-123': location }) })
		);
		await expect(getLocalizationVehicles('company-1')).resolves.toEqual({ 'ABC-123': location });
		mockOn.mockImplementationOnce((event, callback) => callback({ val: () => undefined }));
		await expect(getAllLocalizationVehicles()).resolves.toBeUndefined();
		mockOn.mockImplementationOnce((event, callback) => callback({ val: () => location }));
		await expect(getSpecificVehicle('company-1', 'ABC-123')).resolves.toEqual(location);
		expect(mockRealtime.ref).toHaveBeenCalledWith('/real_time_database/company-1/ABC-123');
	});

	test('handles empty realtime localization snapshots', async () => {
		mockOn.mockImplementationOnce((event, callback) => callback({ val: () => undefined }));
		await expect(getLocalizationVehicles('company-1')).resolves.toBeUndefined();

		mockOn.mockImplementationOnce((event, callback) => callback({ val: () => ({ company: {} }) }));
		await expect(getAllLocalizationVehicles()).resolves.toEqual({ company: {} });

		mockOn.mockImplementationOnce((event, callback) => callback({ val: () => undefined }));
		await expect(getSpecificVehicle('company-1', 'MISSING')).resolves.toBeUndefined();
	});
});

test('logout signs out before clearing the UID and propagates failures', async () => {
	mockAuth.signOut.mockResolvedValueOnce(undefined);
	await logout();
	expect(mockRemoveStorage).toHaveBeenCalledWith('uid');
	expect(mockAuth.signOut.mock.invocationCallOrder[0]).toBeLessThan(
		mockRemoveStorage.mock.invocationCallOrder[0]
	);
	mockRemoveStorage.mockClear();
	const error = new Error('offline');
	mockAuth.signOut.mockRejectedValueOnce(error);
	await expect(logout()).rejects.toBe(error);
	expect(mockRemoveStorage).not.toHaveBeenCalled();
	mockRemoveStorage.mockResolvedValueOnce(error);
	await expect(logout()).rejects.toBe(error);
});

test('password reset trims email and conceals unknown accounts but retains operational errors', async () => {
	await requestPasswordReset(' user@example.com ');
	expect(mockAuth.sendPasswordResetEmail).toHaveBeenCalledWith('user@example.com');
	mockAuth.sendPasswordResetEmail.mockRejectedValueOnce({ code: 'auth/user-not-found' });
	await expect(requestPasswordReset('unknown@example.com')).resolves.toBeUndefined();
	const error = { code: 'auth/too-many-requests' };
	mockAuth.sendPasswordResetEmail.mockRejectedValueOnce(error);
	await expect(requestPasswordReset('user@example.com')).rejects.toBe(error);
});
