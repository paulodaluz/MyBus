const mockRegister = jest.fn();
const mockGetAllUsers = jest.fn();
const mockSaveUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockMountBodyToFirebase = jest.fn();
const mockGetCompany = jest.fn();
const mockDeleteVehicleFromUser = jest.fn();
const mockDeleteVehicleFromAllDatabases = jest.fn();

jest.mock('../src/service/AuthService', () => ({ register: mockRegister }));
jest.mock('../src/service/PassengerService', () => ({
	getAllUsers: mockGetAllUsers,
	saveUser: mockSaveUser,
	updateUser: mockUpdateUser,
}));
jest.mock('../src/backend/utils/Utils', () => ({ mountBodyToFirebase: mockMountBodyToFirebase }));
jest.mock('../src/backend/Users/Company', () => ({ getCompany: mockGetCompany }));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	deleteVehicleFromAllDatabases: mockDeleteVehicleFromAllDatabases,
	deleteVehicleFromUser: mockDeleteVehicleFromUser,
}));

const {
	addNewPrivateVehicle,
	createPassengerBackend,
	getPassenger,
	removePrivateVehicle,
	updateUserAllInfos,
} = require('../src/backend/Users/Passenger');

describe('Passenger backend', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockMountBodyToFirebase.mockImplementation(
			({ vehicleCode, name, cpf, bornDate, typeOfVehicleListed }) => ({
				...(vehicleCode ? { codes_private_vehicles: vehicleCode } : {}),
				...(name ? { name } : {}),
				...(cpf ? { cpf } : {}),
				...(bornDate ? { born_date: bornDate } : {}),
				...(typeOfVehicleListed ? { type_of_vehicle_listed: typeOfVehicleListed } : {}),
			})
		);
	});

	test('creates a passenger with an empty vehicle list (#12)', async () => {
		mockRegister.mockResolvedValueOnce({ user: { uid: 'passenger-1' } });
		mockSaveUser.mockResolvedValueOnce({ id: 'passenger-doc' });
		await expect(
			createPassengerBackend('passenger@example.com', 'Password1', 'Passenger')
		).resolves.toEqual({
			response: {
				email: 'passenger@example.com',
				name: 'Passenger',
				codes_private_vehicles: [],
				uid: 'passenger-1',
				id: 'passenger-1',
			},
		});
		expect(mockSaveUser).toHaveBeenCalledWith({
			email: 'passenger@example.com',
			name: 'Passenger',
			uid: 'passenger-1',
			isPassenger: true,
			codes_private_vehicles: [],
		});

		const authError = new Error('auth failed');
		mockRegister.mockRejectedValueOnce(authError);
		await expect(createPassengerBackend('email', 'password', 'Name')).resolves.toEqual({
			error: authError,
		});

		const saveError = new Error('save failed');
		mockRegister.mockResolvedValueOnce({ user: { uid: 'passenger-2' } });
		mockSaveUser.mockRejectedValueOnce(saveError);
		await expect(createPassengerBackend('email', 'password', 'Name')).resolves.toEqual({
			error: saveError,
		});
	});

	test('finds passengers and returns listing errors', async () => {
		const passenger = { uid: 'passenger-1', id: 'passenger-doc' };
		mockGetAllUsers.mockResolvedValueOnce([passenger]);
		await expect(getPassenger('passenger-1')).resolves.toBe(passenger);

		const error = new Error('listing failed');
		mockGetAllUsers.mockRejectedValueOnce(error);
		await expect(getPassenger('passenger-1')).resolves.toBe(error);
	});

	test('updates profile information and handles update errors', async () => {
		mockUpdateUser.mockResolvedValueOnce(undefined);
		await expect(
			updateUserAllInfos('passenger-doc', 'New name', '52998224725', '01/01/1990', 'public')
		).resolves.toEqual({ response: 'Usuário Atualizado com Sucesso.' });
		expect(mockUpdateUser).toHaveBeenCalledWith('passenger-doc', {
			name: 'New name',
			cpf: '52998224725',
			born_date: '01/01/1990',
			type_of_vehicle_listed: 'public',
		});

		const error = new Error('update failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockUpdateUser.mockRejectedValueOnce(error);
		await expect(updateUserAllInfos('passenger-doc')).resolves.toBe(error);
		console.log.mockRestore();
	});

	test('adds a private vehicle to a passenger', async () => {
		const passenger = { uid: 'passenger-1', id: 'passenger-doc', codes_private_vehicles: ['OLD'] };
		mockGetAllUsers.mockResolvedValueOnce([passenger]);
		mockUpdateUser.mockResolvedValueOnce(undefined);
		await expect(addNewPrivateVehicle('passenger-1', '#NEW')).resolves.toEqual({
			response: 'Usuário Atualizado com Sucesso.',
		});
		expect(mockUpdateUser).toHaveBeenCalledWith('passenger-doc', {
			codes_private_vehicles: ['#NEW', 'OLD'],
		});

		const passengerWithoutVehicles = { uid: 'passenger-2', id: 'passenger-2' };
		mockGetAllUsers.mockResolvedValueOnce([passengerWithoutVehicles]);
		mockUpdateUser.mockResolvedValueOnce(undefined);
		await addNewPrivateVehicle('passenger-2', '#ONLY');
		expect(mockUpdateUser).toHaveBeenCalledWith('passenger-2', {
			codes_private_vehicles: ['#ONLY'],
		});

		const error = new Error('update failed');
		mockGetAllUsers.mockResolvedValueOnce([passengerWithoutVehicles]);
		mockUpdateUser.mockRejectedValueOnce(error);
		jest.spyOn(console, 'log').mockImplementation(() => {});
		await expect(addNewPrivateVehicle('passenger-2', '#ERROR')).resolves.toBe(error);
		console.log.mockRestore();
	});

	test('removes a private vehicle for a passenger or company', async () => {
		const passenger = { uid: 'passenger-1', id: 'passenger-doc', isPassenger: true };
		mockGetAllUsers.mockResolvedValueOnce([passenger]);
		mockGetCompany.mockResolvedValueOnce(undefined);
		mockDeleteVehicleFromUser.mockResolvedValueOnce({ response: 'removed' });
		await expect(removePrivateVehicle('passenger-1', '#OLD', 'OLD')).resolves.toEqual({
			response: 'removed',
		});

		const company = { uid: 'company-1', id: 'company-doc', isPassenger: false };
		mockGetAllUsers.mockResolvedValueOnce([]);
		mockGetCompany.mockResolvedValueOnce(company);
		mockDeleteVehicleFromAllDatabases.mockResolvedValueOnce({ response: 'removed' });
		await expect(removePrivateVehicle('company-1', '#OLD', 'OLD')).resolves.toEqual({
			response: 'removed',
		});
		expect(mockDeleteVehicleFromAllDatabases).toHaveBeenCalledWith(company, '#OLD', 'OLD');
	});
});
