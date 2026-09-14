const mockReact = require('react');
const { act, create } = require('react-test-renderer');

const mockDriverLoginIsValid = jest.fn();
const mockDriverGetAllVehicles = jest.fn();
const mockGetCompanyByRegistrationPlate = jest.fn();
const mockGetVehicleFunction = jest.fn();
const mockSaveNewBusStation = jest.fn();

jest.mock('../src/backend/Login', () => ({ driverLoginIsValid: mockDriverLoginIsValid }));
jest.mock('../src/service/VehicleService', () => ({ getAllVehicles: mockDriverGetAllVehicles }));
jest.mock('../src/backend/Users/Company', () => ({
	getCompanyByRegistrationPlate: mockGetCompanyByRegistrationPlate,
}));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicleFunction: mockGetVehicleFunction,
}));
jest.mock('../src/service/BusStationsService', () => ({
	saveNewBusStation: mockSaveNewBusStation,
}));
jest.mock('react-native-maps', () => {
	const MapView = ({ children }) => mockReact.createElement('MapView', null, children);
	const Marker = () => mockReact.createElement('Marker');

	return { __esModule: true, default: MapView, Marker };
});

const LoginDriver = require('../src/pages/driverPages/LoginDriver').default;
const ChoicePointsVehicleWillPass =
	require('../src/pages/companyPages/ChoicePointsVehicleWillPass').default;

const findButtonByLabel = (renderer, label) =>
	renderer.root.findAll((element) => element.props.textButton === label)[0];

describe('Fixed bug page regressions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('awaits driver validation before navigating to the driver map (#16)', async () => {
		const vehicle = {
			registration_plate: 'ABC-123',
			password_to_share_localization: 'SECRET',
		};
		let releaseValidation;
		const validationFinished = new Promise((resolve) => {
			releaseValidation = resolve;
		});
		mockDriverGetAllVehicles.mockResolvedValueOnce([vehicle]);
		mockDriverLoginIsValid.mockReturnValueOnce(validationFinished);
		mockGetCompanyByRegistrationPlate.mockResolvedValueOnce({ uid: 'company-1' });
		mockGetVehicleFunction.mockResolvedValueOnce({ registration_plate: 'ABC-123' });
		const navigation = { navigate: jest.fn() };
		let renderer;

		await act(async () => {
			renderer = create(mockReact.createElement(LoginDriver, { navigation }));
			await Promise.resolve();
		});

		const inputs = renderer.root.findAll((element) => element.props.placeholder);
		await act(async () => {
			inputs
				.find((input) => input.props.placeholder === 'Placa do veículo')
				.props.onChangeText('ABC-123');
			inputs.find((input) => input.props.placeholder === 'Senha').props.onChangeText('SECRET');
		});

		await act(async () => {
			findButtonByLabel(renderer, 'Entrar').props.onPress();
			await Promise.resolve();
		});
		expect(navigation.navigate).not.toHaveBeenCalled();

		releaseValidation(true);
		await act(async () => {
			await validationFinished;
		});

		expect(navigation.navigate).toHaveBeenCalledWith('MapDriver', {
			company: { uid: 'company-1' },
			vehicle,
			vehicleFunctions: { registration_plate: 'ABC-123' },
		});
	});

	test('navigates only after the bus station has been saved (#25)', async () => {
		let releaseSave;
		const saveFinished = new Promise((resolve) => {
			releaseSave = resolve;
		});
		mockSaveNewBusStation.mockReturnValueOnce(saveFinished);
		const navigation = { navigate: jest.fn() };
		let renderer;
		const vehicle = { registration_plate: 'ABC-123' };

		await act(async () => {
			renderer = create(
				mockReact.createElement(ChoicePointsVehicleWillPass, {
					navigation,
					route: { params: { uid: 'company-1', vehicle } },
				})
			);
		});

		await act(async () => {
			findButtonByLabel(renderer, 'FINALIZAR').props.onPress();
			await Promise.resolve();
		});
		expect(mockSaveNewBusStation).toHaveBeenCalledWith({
			busPoints: [],
			registration_plate: 'ABC-123',
		});
		expect(navigation.navigate).not.toHaveBeenCalled();

		releaseSave();
		await act(async () => {
			await saveFinished;
		});

		expect(navigation.navigate).toHaveBeenCalledWith('ListVehicleInfosCompany', {
			uid: 'company-1',
			receivedVehicle: vehicle,
		});
	});
});
