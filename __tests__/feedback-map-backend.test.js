const mockGetAllCompanyFeedbacks = jest.fn();
const mockSaveCompanyFeedback = jest.fn();
const mockSaveAppFeedback = jest.fn();
const mockGetCompany = jest.fn();
const mockGetPassenger = jest.fn();
const mockGetVehicle = jest.fn();
const mockGetUserOnFirebase = jest.fn();
const mockGetAllBusStations = jest.fn();

jest.mock('../src/service/CompanyFeedbackService', () => ({
	getAllFeedbacks: mockGetAllCompanyFeedbacks,
	saveFeedback: mockSaveCompanyFeedback,
}));
jest.mock('../src/service/MyBusFeedback', () => ({ saveFeedback: mockSaveAppFeedback }));
jest.mock('../src/service/BusStationsService', () => ({
	getAllBusStations: mockGetAllBusStations,
}));
jest.mock('../src/backend/Users/Company', () => ({ getCompany: mockGetCompany }));
jest.mock('../src/backend/Users/Passenger', () => ({ getPassenger: mockGetPassenger }));
jest.mock('../src/backend/vehicles/Vehicle', () => ({ getVehicle: mockGetVehicle }));
jest.mock('../src/backend/Login', () => ({ getUserOnFirebase: mockGetUserOnFirebase }));

const {
	getCompanyFeedbackBackend,
	saveCompanyFeedbackBackend,
} = require('../src/backend/feedbacks/CompanyFeedbacks');
const { saveAppFeedbackBackend } = require('../src/backend/feedbacks/MyBusFeedbacks');
const { getBusStopsLocalzations } = require('../src/backend/map/PassengerMap');

describe('Feedback and map backends', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('saves company feedback using a vehicle object or vehicle name', async () => {
		mockGetPassenger.mockResolvedValueOnce({ email: 'person@example.com', name: 'Person' });
		mockSaveCompanyFeedback.mockResolvedValueOnce(undefined);
		await expect(
			saveCompanyFeedbackBackend(
				'passenger-1',
				{
					name: 'Bus',
					registration_plate: 'ABC-123',
				},
				'',
				'Great'
			)
		).resolves.toEqual({ response: 'Feedback Registrado com Sucesso!' });
		expect(mockSaveCompanyFeedback).toHaveBeenCalledWith({
			email_sender: 'person@example.com',
			vehicle_name: 'Bus',
			vehicle_registration_plate: 'ABC-123',
			feedback: 'Great',
			name_sender: 'Person',
		});

		mockGetPassenger.mockResolvedValueOnce({ email: 'anonymous@example.com' });
		mockGetVehicle.mockResolvedValueOnce({ name: 'Express', registration_plate: 'XYZ-999' });
		mockSaveCompanyFeedback.mockResolvedValueOnce(undefined);
		await saveCompanyFeedbackBackend('passenger-2', '', 'Express', 'Fast');
		expect(mockGetVehicle).toHaveBeenCalledWith({ name: 'Express' });
		expect(mockSaveCompanyFeedback).toHaveBeenCalledWith({
			email_sender: 'anonymous@example.com',
			vehicle_name: 'Express',
			vehicle_registration_plate: 'XYZ-999',
			feedback: 'Fast',
		});
	});

	test('returns feedback belonging to a company', async () => {
		mockGetCompany.mockResolvedValueOnce({ linked_vehicles: ['ABC-123', 'XYZ-999'] });
		mockGetAllCompanyFeedbacks.mockResolvedValueOnce([
			{ vehicle_registration_plate: 'ABC-123', feedback: 'Good' },
			{ vehicle_registration_plate: 'OTHER', feedback: 'Ignore' },
			{ vehicle_registration_plate: 'XYZ-999', feedback: 'Fast' },
		]);
		await expect(getCompanyFeedbackBackend('company-1')).resolves.toEqual([
			{ vehicle_registration_plate: 'ABC-123', feedback: 'Good' },
			{ vehicle_registration_plate: 'XYZ-999', feedback: 'Fast' },
		]);

		mockGetCompany.mockResolvedValueOnce({});
		mockGetAllCompanyFeedbacks.mockResolvedValueOnce([]);
		await expect(getCompanyFeedbackBackend('company-2')).resolves.toEqual([]);
	});

	test('saves app feedback with optional user name', async () => {
		mockGetUserOnFirebase.mockResolvedValueOnce({ email: 'person@example.com', name: 'Person' });
		mockSaveAppFeedback.mockResolvedValueOnce(undefined);
		await expect(saveAppFeedbackBackend('user-1', 'Suggestion')).resolves.toEqual({
			response: 'Feedback Registrado com Sucesso!',
		});
		expect(mockSaveAppFeedback).toHaveBeenCalledWith({
			feedback: 'Suggestion',
			email: 'person@example.com',
			name: 'Person',
		});

		mockGetUserOnFirebase.mockResolvedValueOnce({ email: 'anonymous@example.com' });
		mockSaveAppFeedback.mockResolvedValueOnce(undefined);
		await saveAppFeedbackBackend('user-2', 'Another suggestion');
		expect(mockSaveAppFeedback).toHaveBeenCalledWith({
			feedback: 'Another suggestion',
			email: 'anonymous@example.com',
		});
	});

	test('collects bus stop locations for matching vehicles', async () => {
		mockGetAllBusStations.mockResolvedValueOnce([
			{
				registration_plate: 'ABC-123',
				busPoints: [{ latitude: -23.5, longitude: -46.6 }],
			},
		]);
		await expect(
			getBusStopsLocalzations([
				{ registration_plate: 'ABC-123' },
				{ registration_plate: 'MISSING' },
			])
		).resolves.toEqual([{ latitude: -23.5, longitude: -46.6, vehicle_plate: 'ABC-123' }]);
	});
});
