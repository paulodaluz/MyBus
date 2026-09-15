const mockRealtime = { ref: jest.fn(() => ({ on: jest.fn() })) };

jest.mock('../src/database/FirebaseConfiguration', () => ({
	db: {},
	firebase: { database: () => mockRealtime },
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
	__esModule: true,
	default: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() },
}));
jest.mock('expo-notifications', () => ({
	AndroidNotificationPriority: { HIGH: 'high' },
	scheduleNotificationAsync: jest.fn(),
}));
jest.mock('react-native-maps', () => ({
	__esModule: true,
	default: 'MapView',
	Marker: 'Marker',
}));

const Routes = require('../src/routes').default;

describe('navigation routes', () => {
	test('builds the complete navigation tree', () => {
		expect(Routes({ navigation: { navigate: jest.fn() } })).toBeTruthy();
	});
});
