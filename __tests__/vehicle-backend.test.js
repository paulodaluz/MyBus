const mockGetAllCompanies = jest.fn();
const mockGetAllUsers = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteVehicleFunctions = jest.fn();
const mockGetAllFunctionsVehicles = jest.fn();
const mockSaveFunctionsVehicle = jest.fn();
const mockUpdateFunctionsVehicle = jest.fn();
const mockDeleteVehicle = jest.fn();
const mockGetAllVehicles = jest.fn();
const mockSaveVehicle = jest.fn();
const mockUpdateVehicle = jest.fn();
const mockRemoveVehicleInCompany = jest.fn();
const mockGenerateRandomPassword = jest.fn();
const mockMountBodyToFirebase = jest.fn();

jest.mock('../src/service/CompanyService', () => ({ getAllCompanies: mockGetAllCompanies }));
jest.mock('../src/service/PassengerService', () => ({
	getAllUsers: mockGetAllUsers,
	updateUser: mockUpdateUser,
}));
jest.mock('../src/service/VehicleFunctionsService', () => ({
	deleteVehicleFunctions: mockDeleteVehicleFunctions,
	getAllFunctionsVehicles: mockGetAllFunctionsVehicles,
	saveFunctionsVehicle: mockSaveFunctionsVehicle,
	updateFunctionsVehicle: mockUpdateFunctionsVehicle,
}));
jest.mock('../src/service/VehicleService', () => ({
	deleteVehicle: mockDeleteVehicle,
	getAllVehicles: mockGetAllVehicles,
	saveVehicle: mockSaveVehicle,
	updateVehicle: mockUpdateVehicle,
}));
jest.mock('../src/backend/Users/Company', () => ({
	removeVehicleInCompany: mockRemoveVehicleInCompany,
}));
jest.mock('../src/backend/utils/Utils', () => ({
	generateRandomPassword: mockGenerateRandomPassword,
	mountBodyToFirebase: mockMountBodyToFirebase,
}));

const {
	addFunctionsToVehicle,
	createNewVehicle,
	deleteVehicleFromAllDatabases,
	deleteVehicleFromUser,
	editVehicle,
	getMyVehicles,
	getVehicle,
	getVehicleFunction,
} = require('../src/backend/vehicles/Vehicle');

describe('Vehicle backend', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockMountBodyToFirebase.mockImplementation(({ vehicleCode }) => ({
			codes_private_vehicles: vehicleCode,
		}));
	});

	test('creates and edits a vehicle with its feature record', async () => {
		mockGenerateRandomPassword.mockReturnValueOnce('PASSWORD').mockReturnValueOnce('CODE');
		mockSaveVehicle.mockResolvedValueOnce({ id: 'vehicle-doc' });
		await expect(
			createNewVehicle({ registrationPlate: 'abc-123', name: 'Bus', isPublic: true })
		).resolves.toEqual({
			response: {
				id_to_share_localization: 'ABC-123',
				password_to_share_localization: 'PASSWORD',
				name: 'Bus',
				id_to_passengers: '#CODE',
				is_public: true,
				registration_plate: 'ABC-123',
			},
		});
		expect(mockSaveVehicle).toHaveBeenCalledWith(
			expect.objectContaining({ registration_plate: 'ABC-123' })
		);

		mockUpdateVehicle.mockResolvedValueOnce(undefined);
		mockUpdateFunctionsVehicle.mockResolvedValueOnce(undefined);
		await expect(
			editVehicle(
				'vehicle-doc',
				{ registrationPlate: 'new-1', name: 'New bus', isPublic: false },
				'functions-doc',
				{
					thereIsWifi: true,
					thereIsAirConditioning: false,
					thereIsBathroom: true,
					thereIsWheelchairSupport: false,
					price: 5,
					registrationPlate: 'new-1',
				}
			)
		).resolves.toEqual({
			response: {
				id_to_share_localization: '#NEW-1',
				name: 'New bus',
				is_public: false,
				registration_plate: 'NEW-1',
				wifi: true,
				air_conditioning: false,
				washrooms: true,
				suport_wheelchair: false,
				price_transport: 5,
			},
		});
	});

	test('finds vehicles by plate, passenger code or name and returns listing errors', async () => {
		const vehicles = [
			{ registration_plate: 'ABC-123', id_to_passengers: '#ABC', name: 'City Bus' },
			{ registration_plate: 'XYZ-999', id_to_passengers: '#XYZ', name: 'Express' },
		];
		mockGetAllVehicles.mockResolvedValueOnce(vehicles);
		await expect(getVehicle({ registrationPlate: 'ABC-123' })).resolves.toBe(vehicles[0]);
		mockGetAllVehicles.mockResolvedValueOnce(vehicles);
		await expect(getVehicle({ idToPassengers: '#XYZ' })).resolves.toBe(vehicles[1]);
		mockGetAllVehicles.mockResolvedValueOnce(vehicles);
		await expect(getVehicle({ name: 'city' })).resolves.toBe(vehicles[0]);
		mockGetAllVehicles.mockResolvedValueOnce(vehicles);
		await expect(getVehicle({ name: 'missing' })).resolves.toBeUndefined();

		const error = new Error('vehicles failed');
		mockGetAllVehicles.mockRejectedValueOnce(error);
		await expect(getVehicle({ registrationPlate: 'ABC-123' })).resolves.toBe(error);
	});

	test('adds and finds vehicle functions', async () => {
		mockSaveFunctionsVehicle.mockResolvedValueOnce(undefined);
		await expect(
			addFunctionsToVehicle({
				thereIsWifi: true,
				thereIsAirConditioning: true,
				thereIsBathroom: false,
				thereIsWheelchairSupport: true,
				price: 4.5,
				registrationPlate: 'abc-123',
			})
		).resolves.toEqual({ response: 'Funções do veículo cadastradas com sucesso!' });
		expect(mockSaveFunctionsVehicle).toHaveBeenCalledWith({
			wifi: true,
			air_conditioning: true,
			washrooms: false,
			suport_wheelchair: true,
			price_transport: 4.5,
			registration_plate: 'ABC-123',
		});

		const functions = { id: 'functions-doc', registration_plate: 'ABC-123' };
		mockGetAllFunctionsVehicles.mockResolvedValueOnce([functions]);
		await expect(getVehicleFunction({ registrationPlate: 'ABC-123' })).resolves.toBe(functions);
		mockGetAllFunctionsVehicles.mockResolvedValueOnce([]);
		await expect(getVehicleFunction({ registrationPlate: 'ABC-123' })).resolves.toBeUndefined();

		const error = new Error('functions failed');
		mockGetAllFunctionsVehicles.mockRejectedValueOnce(error);
		await expect(getVehicleFunction({ registrationPlate: 'ABC-123' })).resolves.toBe(error);
	});

	test('lists vehicles linked to passengers and companies', async () => {
		const passenger = { uid: 'passenger-1', isPassenger: true, codes_private_vehicles: ['#ABC'] };
		const passengerVehicle = { id_to_passengers: '#ABC', registration_plate: 'ABC-123' };
		mockGetAllUsers.mockResolvedValueOnce([passenger]);
		mockGetAllCompanies.mockResolvedValueOnce([]);
		mockGetAllVehicles.mockResolvedValueOnce([passengerVehicle]);
		await expect(getMyVehicles('passenger-1')).resolves.toEqual([passengerVehicle]);

		const company = { uid: 'company-1', linked_vehicles: ['XYZ-999'] };
		const companyVehicle = { registration_plate: 'XYZ-999' };
		mockGetAllUsers.mockResolvedValueOnce([]);
		mockGetAllCompanies.mockResolvedValueOnce([company]);
		mockGetAllVehicles.mockResolvedValueOnce([companyVehicle]);
		await expect(getMyVehicles('company-1')).resolves.toEqual([companyVehicle]);
	});

	test('deletes a vehicle from every related data set', async () => {
		const completeUser = { uid: 'company-1' };
		const functions = [{ id: 'functions-doc', registration_plate: 'ABC-123' }];
		const vehicles = [{ id: 'vehicle-doc', registration_plate: 'ABC-123' }];
		const users = [
			{ id: 'passenger-doc', codes_private_vehicles: ['#ABC', '#OTHER'] },
			{ id: 'other-passenger', codes_private_vehicles: ['#OTHER'] },
		];
		mockGetAllFunctionsVehicles.mockResolvedValueOnce(functions);
		mockGetAllVehicles.mockResolvedValueOnce(vehicles);
		mockGetAllUsers.mockResolvedValueOnce(users);
		mockUpdateUser.mockResolvedValueOnce(undefined);
		mockRemoveVehicleInCompany.mockResolvedValueOnce(undefined);
		mockDeleteVehicleFunctions.mockResolvedValueOnce(undefined);
		mockDeleteVehicle.mockResolvedValueOnce(undefined);

		await expect(deleteVehicleFromAllDatabases(completeUser, '#ABC', 'ABC-123')).resolves.toEqual({
			response: 'Veículo Removido com Sucesso.',
		});
		expect(mockUpdateUser).toHaveBeenCalledWith('passenger-doc', {
			codes_private_vehicles: ['#OTHER'],
		});
		expect(mockDeleteVehicleFunctions).toHaveBeenCalledWith('functions-doc');
		expect(mockDeleteVehicle).toHaveBeenCalledWith('vehicle-doc');

		const error = new Error('passenger update failed');
		mockUpdateUser.mockResolvedValueOnce({ error });
		await expect(
			deleteVehicleFromUser({ id: 'passenger-doc', codes_private_vehicles: ['#ABC'] }, '#ABC')
		).resolves.toBe(error);
	});
});
