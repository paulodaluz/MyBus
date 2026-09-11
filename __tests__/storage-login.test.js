const mockAsyncStorage = {
	setItem: jest.fn(),
	getItem: jest.fn(),
	removeItem: jest.fn(),
};
const mockGetPassenger = jest.fn();
const mockGetCompany = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
	__esModule: true,
	default: mockAsyncStorage,
}));
jest.mock('../src/backend/Users/Passenger', () => ({ getPassenger: mockGetPassenger }));
jest.mock('../src/backend/Users/Company', () => ({ getCompany: mockGetCompany }));

const {
	getSession,
	getUserOnFirebase,
	removeSession,
	createSession,
} = require('../src/backend/Login');
const { loadStorage, removeStorage, saveStorage } = require('../src/service/AsyncStorage');

describe('AsyncStorage service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('saves, loads and removes values', async () => {
		mockAsyncStorage.getItem.mockResolvedValueOnce('value');

		await expect(saveStorage('key', 'value')).resolves.toBeUndefined();
		await expect(loadStorage('key')).resolves.toBe('value');
		await expect(removeStorage('key')).resolves.toBeUndefined();

		expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('key', 'value');
		expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('key');
		expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('key');
	});

	test('returns storage errors instead of throwing', async () => {
		const error = new Error('storage failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockAsyncStorage.setItem.mockRejectedValueOnce(error);
		mockAsyncStorage.getItem.mockRejectedValueOnce(error);
		mockAsyncStorage.removeItem.mockRejectedValueOnce(error);

		await expect(saveStorage('key', 'value')).resolves.toBe(error);
		await expect(loadStorage('key')).resolves.toBe(error);
		await expect(removeStorage('key')).resolves.toBe(error);

		console.log.mockRestore();
	});
});

describe('Login backend', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('returns the passenger before checking company data', async () => {
		const passenger = { uid: 'passenger-1', email: 'passenger@example.com' };
		mockGetPassenger.mockResolvedValueOnce(passenger);

		await expect(getUserOnFirebase('passenger-1')).resolves.toBe(passenger);
		expect(mockGetCompany).not.toHaveBeenCalled();
	});

	test('falls back to a company and returns undefined when user is absent', async () => {
		const company = { uid: 'company-1', email: 'company@example.com' };
		mockGetPassenger.mockResolvedValueOnce(undefined);
		mockGetCompany.mockResolvedValueOnce(company);
		await expect(getUserOnFirebase('company-1')).resolves.toBe(company);

		mockGetPassenger.mockResolvedValueOnce(undefined);
		mockGetCompany.mockResolvedValueOnce(undefined);
		await expect(getUserOnFirebase('missing')).resolves.toBeUndefined();
	});

	test('creates, reads and removes a session', async () => {
		await expect(createSession('user-1')).resolves.toBeUndefined();
		expect(mockAsyncStorage.setItem).toHaveBeenCalledWith('uid', 'user-1');

		mockAsyncStorage.getItem.mockResolvedValueOnce('user-1');
		await expect(getSession()).resolves.toBe('user-1');
		mockAsyncStorage.getItem.mockResolvedValueOnce(null);
		await expect(getSession()).resolves.toBeUndefined();

		await expect(removeSession()).resolves.toBeUndefined();
		expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('uid');
	});
});
