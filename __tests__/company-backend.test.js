const mockRegister = jest.fn();
const mockGetAllCompanies = jest.fn();
const mockSaveCompany = jest.fn();
const mockUpdateCompany = jest.fn();

jest.mock('../src/service/AuthService', () => ({ register: mockRegister }));
jest.mock('../src/service/CompanyService', () => ({
	getAllCompanies: mockGetAllCompanies,
	saveCompany: mockSaveCompany,
	updateCompany: mockUpdateCompany,
}));

const {
	addNewVehicleInCompany,
	createCompanyBackend,
	getCompany,
	getCompanyByRegistrationPlate,
	removeVehicleInCompany,
	updateAllInfosOfCompany,
	updatePlateVehicleCompany,
} = require('../src/backend/Users/Company');

describe('Company backend', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('creates a company after registering authentication and Firestore records', async () => {
		mockRegister.mockResolvedValueOnce({ user: { uid: 'company-1' } });
		mockSaveCompany.mockResolvedValueOnce({ id: 'company-document' });

		await expect(
			createCompanyBackend('company@example.com', 'Password1', 'Company', '04252011000110')
		).resolves.toEqual({
			response: {
				email: 'company@example.com',
				name: 'Company',
				cnpj: '04252011000110',
				linked_vehicles: [],
				uid: 'company-1',
				id: 'company-1',
			},
		});
		expect(mockSaveCompany).toHaveBeenCalledWith(
			expect.objectContaining({ uid: 'company-1', linked_vehicles: [] })
		);
	});

	test('returns authentication and Firestore registration errors', async () => {
		const authError = new Error('authentication failed');
		mockRegister.mockRejectedValueOnce(authError);
		await expect(createCompanyBackend('email', 'password', 'Name', 'CNPJ')).resolves.toEqual({
			error: authError,
		});

		const firestoreError = new Error('Firestore failed');
		mockRegister.mockResolvedValueOnce({ user: { uid: 'company-1' } });
		mockSaveCompany.mockRejectedValueOnce(firestoreError);
		await expect(createCompanyBackend('email', 'password', 'Name', 'CNPJ')).resolves.toEqual({
			error: firestoreError,
		});
	});

	test('finds companies and returns errors from the listing service', async () => {
		const company = { uid: 'company-1', linked_vehicles: ['ABC-123'] };
		mockGetAllCompanies.mockResolvedValueOnce([company]);
		await expect(getCompany('company-1')).resolves.toBe(company);

		const error = new Error('listing failed');
		mockGetAllCompanies.mockRejectedValueOnce(error);
		await expect(getCompany('company-1')).resolves.toBe(error);

		mockGetAllCompanies.mockResolvedValueOnce([company]);
		await expect(getCompanyByRegistrationPlate({ registrationPlate: 'ABC-123' })).resolves.toBe(
			company
		);
		mockGetAllCompanies.mockRejectedValueOnce(error);
		await expect(getCompanyByRegistrationPlate({ registrationPlate: 'ABC-123' })).resolves.toBe(
			error
		);
	});

	test('updates company profile and handles update errors', async () => {
		mockUpdateCompany.mockResolvedValueOnce(undefined);
		await expect(updateAllInfosOfCompany('company-1', 'New name', 'New CNPJ')).resolves.toEqual({
			response: 'Empresa Atualizada com Sucesso.',
		});
		expect(mockUpdateCompany).toHaveBeenCalledWith('company-1', {
			name: 'New name',
			cnpj: 'New CNPJ',
		});

		const error = new Error('update failed');
		jest.spyOn(console, 'log').mockImplementation(() => {});
		mockUpdateCompany.mockRejectedValueOnce(error);
		await expect(updateAllInfosOfCompany('company-1')).resolves.toBe(error);
		console.log.mockRestore();
	});

	test('adds and removes vehicles from a company', async () => {
		const company = { uid: 'company-1', id: 'company-doc', linked_vehicles: ['OLD-1'] };
		mockGetAllCompanies.mockResolvedValueOnce([company]);
		mockUpdateCompany.mockResolvedValueOnce(undefined);
		await expect(addNewVehicleInCompany('company-1', 'new-1')).resolves.toEqual({
			response: 'Veiculo adicionado com sucesso!',
		});
		expect(mockUpdateCompany).toHaveBeenCalledWith('company-doc', {
			linked_vehicles: ['OLD-1', 'NEW-1'],
		});

		const companyWithoutVehicles = { uid: 'company-2', id: 'company-2' };
		mockGetAllCompanies.mockResolvedValueOnce([companyWithoutVehicles]);
		mockUpdateCompany.mockResolvedValueOnce(undefined);
		await addNewVehicleInCompany('company-2', 'new-2');
		expect(mockUpdateCompany).toHaveBeenCalledWith('company-2', { linked_vehicles: ['NEW-2'] });

		const companyWithVehicles = { uid: 'company-3', id: 'company-3', linked_vehicles: ['A', 'B'] };
		mockGetAllCompanies.mockResolvedValueOnce([companyWithVehicles]);
		mockUpdateCompany.mockResolvedValueOnce(undefined);
		await expect(removeVehicleInCompany('company-3', 'A')).resolves.toEqual({
			response: 'Veiculo adicionado com sucesso!',
		});
		expect(mockUpdateCompany).toHaveBeenCalledWith('company-3', { linked_vehicles: ['B'] });
	});

	test('updates a vehicle plate or returns early when it is unchanged', async () => {
		await expect(updatePlateVehicleCompany('company-1', 'SAME', 'SAME')).resolves.toEqual({
			response: 'Veiculo atualizado com sucesso!',
		});
		expect(mockGetAllCompanies).not.toHaveBeenCalled();

		const company = { uid: 'company-1', id: 'company-doc', linked_vehicles: ['OLD', 'OTHER'] };
		mockGetAllCompanies.mockResolvedValueOnce([company]);
		mockUpdateCompany.mockResolvedValueOnce(undefined);
		await expect(updatePlateVehicleCompany('company-1', 'OLD', 'new')).resolves.toEqual({
			response: 'Veiculo atualizado com sucesso!',
		});
		expect(mockUpdateCompany).toHaveBeenCalledWith('company-doc', {
			linked_vehicles: ['OTHER', 'NEW'],
		});
	});
});
