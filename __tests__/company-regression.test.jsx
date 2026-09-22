jest.mock('../src/service/AuthService', () => ({ logout: mockLogout }));
import { Alert, Linking, TouchableOpacity } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

const mockGetCompany = jest.fn();
const mockUpdateCompanyProfile = jest.fn();
const mockGetVehicle = jest.fn();
const mockGetVehicleFunction = jest.fn();
const mockEditVehicle = jest.fn();
const mockUpdatePlateVehicleCompany = jest.fn();
const mockGetAllFunctionsVehicles = jest.fn();
const mockCreateNewVehicle = jest.fn();
const mockAddFunctionsToVehicle = jest.fn();
const mockAddNewVehicleInCompany = jest.fn();
const mockSaveNewBusStation = jest.fn();
const mockGetCompanyFeedback = jest.fn();
const mockSaveAppFeedback = jest.fn();
const mockGetSession = jest.fn();
const mockLogout = jest.fn();
const mockClipboardSetString = jest.fn();
const mockDatabaseOn = jest.fn();
const mockDatabaseRef = jest.fn(() => ({ on: mockDatabaseOn }));

jest.mock('../src/backend/Users/Company', () => ({
	getCompany: mockGetCompany,
	updateAllInfosOfCompany: mockUpdateCompanyProfile,
	updatePlateVehicleCompany: mockUpdatePlateVehicleCompany,
	addNewVehicleInCompany: mockAddNewVehicleInCompany,
}));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicle: mockGetVehicle,
	getVehicleFunction: mockGetVehicleFunction,
	editVehicle: mockEditVehicle,
	createNewVehicle: mockCreateNewVehicle,
	addFunctionsToVehicle: mockAddFunctionsToVehicle,
}));
jest.mock('../src/service/VehicleFunctionsService', () => ({
	getAllFunctionsVehicles: mockGetAllFunctionsVehicles,
}));
jest.mock('../src/service/BusStationsService', () => ({
	saveNewBusStation: mockSaveNewBusStation,
}));
jest.mock('../src/backend/feedbacks/CompanyFeedbacks', () => ({
	getCompanyFeedbackBackend: mockGetCompanyFeedback,
}));
jest.mock('../src/backend/feedbacks/MyBusFeedbacks', () => ({
	saveAppFeedbackBackend: mockSaveAppFeedback,
}));
jest.mock('../src/backend/Login', () => ({
	getSession: mockGetSession,
}));
jest.mock('expo-clipboard', () => ({ setString: mockClipboardSetString }));
jest.mock('../src/database/FirebaseConfiguration', () => ({
	firebase: { database: () => ({ ref: mockDatabaseRef }) },
}));
jest.mock('react-native-maps', () => {
	const { View } = require('react-native');
	const MapView = ({ children, ...props }) => (
		<View testID="map-view" {...props}>
			{children}
		</View>
	);
	const Marker = ({ children, onPress, title }) => (
		<View accessibilityRole="button" accessibilityLabel={title} onPress={onPress}>
			{children}
		</View>
	);
	return { __esModule: true, default: MapView, Marker };
});

const AskPointsVehicleWillPass =
	require('../src/pages/companyPages/AskPointsVehicleWillPass').default;
const AskShowVehicleCode = require('../src/pages/companyPages/AskShowVehicleCode').default;
const ChoicePointsVehicleWillPass =
	require('../src/pages/companyPages/ChoicePointsVehicleWillPass').default;
const CreateNewVehicle = require('../src/pages/companyPages/CreateNewVehicle').default;
const EditProfileCompany = require('../src/pages/companyPages/EditProfileCompany').default;
const EditVehicle = require('../src/pages/companyPages/EditVehicle').default;
const LeaveYourOpinionCompany =
	require('../src/pages/companyPages/LeaveYourOpinionCompany').default;
const ListVehicleInfosCompany =
	require('../src/pages/companyPages/ListVehicleInfosCompany').default;
const MapCompany = require('../src/pages/companyPages/MapCompany').default;
const ReceivedFeedbacks = require('../src/pages/companyPages/ReceivedFeedbacks').default;
const SettingsCompany = require('../src/pages/companyPages/SettingsCompany').default;
const ShowVehicleCode = require('../src/pages/companyPages/ShowVehicleCode').default;

const route = (params) => ({ params });
const makeNavigation = () => ({ reset: jest.fn(), navigate: jest.fn(), goBack: jest.fn() });

describe('company regressions', () => {
	let alert;
	let openURL;

	beforeEach(() => {
		jest.clearAllMocks();
		alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
		openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
		mockGetAllFunctionsVehicles.mockResolvedValue([]);
		mockCreateNewVehicle.mockResolvedValue({ response: { registration_plate: 'ABC-123' } });
		mockAddFunctionsToVehicle.mockResolvedValue({ response: 'functions' });
		mockAddNewVehicleInCompany.mockResolvedValue({ response: 'company' });
		mockSaveNewBusStation.mockResolvedValue(undefined);
		mockSaveAppFeedback.mockResolvedValue(undefined);
		mockGetSession.mockResolvedValue('company-1');
		mockLogout.mockResolvedValue(undefined);
		mockUpdateCompanyProfile.mockResolvedValue(undefined);
		mockEditVehicle.mockResolvedValue({ response: { registration_plate: 'NEW-123' } });
		mockUpdatePlateVehicleCompany.mockResolvedValue({ response: 'updated' });
		mockClipboardSetString.mockReset();
	});

	afterEach(() => {
		alert.mockRestore();
		openURL.mockRestore();
	});

	test('navigates through the two vehicle setup questions', () => {
		const vehicle = { registration_plate: 'ABC-123' };
		const firstNavigation = makeNavigation();
		const first = render(
			<AskShowVehicleCode navigation={firstNavigation} route={route({ uid: 'c', vehicle })} />
		);
		fireEvent.press(first.getByText('Sim'));
		fireEvent.press(first.getByText('Mais Tarde'));
		expect(firstNavigation.navigate).toHaveBeenCalledWith('ShowVehicleCode', { uid: 'c', vehicle });
		expect(firstNavigation.navigate).toHaveBeenCalledWith('AskPointsVehicleWillPass', {
			uid: 'c',
			vehicle,
		});

		const secondNavigation = makeNavigation();
		const second = render(
			<AskPointsVehicleWillPass
				navigation={secondNavigation}
				route={route({ uid: 'c', vehicle })}
			/>
		);
		fireEvent.press(second.getByText('Sim'));
		fireEvent.press(second.getByText('Mais Tarde'));
		expect(secondNavigation.navigate).toHaveBeenCalledWith('ChoicePointsVehicleWillPass', {
			uid: 'c',
			vehicle,
		});
		expect(secondNavigation.navigate).toHaveBeenCalledWith('ListVehicleInfosCompany', {
			uid: 'c',
			receivedVehicle: vehicle,
		});
	});

	test('adds, removes and saves bus stations', async () => {
		const vehicle = { registration_plate: 'ABC-123' };
		const nav = makeNavigation();
		const view = render(
			<ChoicePointsVehicleWillPass navigation={nav} route={route({ uid: 'c', vehicle })} />
		);
		fireEvent(view.getByTestId('map-view'), 'press', {
			nativeEvent: { coordinate: { latitude: 1, longitude: 2 } },
		});
		fireEvent(view.getByTestId('map-view'), 'press', {
			nativeEvent: { coordinate: { latitude: 3, longitude: 4 } },
		});
		await waitFor(() => expect(view.getAllByLabelText('Ponto de Embarque').length).toBe(2));
		fireEvent.press(view.getAllByLabelText('Ponto de Embarque')[0]);
		await act(async () => fireEvent.press(view.getByText('FINALIZAR')));
		expect(mockSaveNewBusStation).toHaveBeenCalledWith({
			busPoints: [{ latitude: 3, longitude: 4 }],
			registration_plate: 'ABC-123',
		});
		expect(nav.navigate).toHaveBeenCalledWith('ListVehicleInfosCompany', {
			uid: 'c',
			receivedVehicle: vehicle,
		});
	});

	test('validates vehicle creation, detects duplicates, and handles service errors', async () => {
		const nav = makeNavigation();
		const view = render(<CreateNewVehicle navigation={nav} route={route({ uid: 'company-1' })} />);
		fireEvent.press(view.getByText('Cadastrar'));
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique os campos e tente novamente!');

		const fill = () => {
			fireEvent.changeText(view.getByPlaceholderText('Digite o nome'), 'Bus');
			fireEvent.changeText(view.getByPlaceholderText('Digite o valor'), '5');
			fireEvent.changeText(view.getByPlaceholderText('Digite a placa'), 'ABC-123');
		};
		fill();
		view.getAllByRole('switch').forEach((control) => fireEvent(control, 'valueChange', true));
		mockGetAllFunctionsVehicles.mockResolvedValueOnce([{ registration_plate: 'ABC-123' }]);
		await act(async () => fireEvent.press(view.getByText('Cadastrar')));
		expect(alert).toHaveBeenCalledWith('Usuário já existe');

		mockGetAllFunctionsVehicles.mockRejectedValueOnce(new Error('lookup failed'));
		await act(async () => fireEvent.press(view.getByText('Cadastrar')));
		expect(alert).toHaveBeenCalledWith('Erro ao verificar os veículos cadastrados.');

		mockGetAllFunctionsVehicles.mockResolvedValueOnce([]);
		mockCreateNewVehicle.mockResolvedValueOnce({ error: new Error('create failed') });
		await act(async () => fireEvent.press(view.getByText('Cadastrar')));
		expect(alert).toHaveBeenCalledWith('Erro ao criar usuário.');

		mockCreateNewVehicle.mockResolvedValueOnce({ response: { registration_plate: 'ABC-123' } });
		await act(async () => fireEvent.press(view.getByText('Cadastrar')));
		await waitFor(() =>
			expect(nav.navigate).toHaveBeenCalledWith('AskShowVehicleCode', expect.any(Object))
		);
	});

	test('loads and updates the company profile', async () => {
		mockGetCompany.mockResolvedValueOnce({
			id: 'company-doc',
			name: 'Company',
			email: 'c@example.com',
			cnpj: '04252011000110',
		});
		const nav = makeNavigation();
		const view = render(
			<EditProfileCompany navigation={nav} route={route({ uid: 'company-1' })} />
		);
		await waitFor(() =>
			expect(view.getByPlaceholderText('Nome completo').props.value).toBe('Company')
		);
		fireEvent.changeText(view.getByPlaceholderText('Nome completo'), 'New Company');
		fireEvent.changeText(view.getByPlaceholderText('CNPJ'), '04252011000111');
		fireEvent.changeText(view.getByPlaceholderText('Cidade/UF'), 'invalid');
		expect(view.getByRole('button', { name: 'Atualizar' }).props.accessibilityState.disabled).toBe(
			true
		);
		fireEvent.changeText(view.getByPlaceholderText('Cidade/UF'), 'Curitiba/PR');
		await act(async () => fireEvent.press(view.getByText('Atualizar')));
		expect(mockUpdateCompanyProfile).toHaveBeenCalledWith(
			'company-doc',
			'New Company',
			'04252011000111',
			'Curitiba/PR'
		);
		expect(nav.navigate).toHaveBeenCalledWith('SettingsCompany', { uid: 'company-1' });
	});

	test('loads, validates, updates and navigates from vehicle editing', async () => {
		mockGetVehicle.mockResolvedValueOnce({
			id: 'vehicle-doc',
			name: 'Bus',
			is_public: false,
			registration_plate: 'ABC-123',
		});
		mockGetVehicleFunction.mockResolvedValueOnce({
			id: 'functions-doc',
			price_transport: 5,
			suport_wheelchair: false,
			wifi: true,
			air_conditioning: false,
			washrooms: true,
		});
		const nav = makeNavigation();
		const view = render(
			<EditVehicle navigation={nav} route={route({ uid: 'c', registration_Plate: 'ABC-123' })} />
		);
		await waitFor(() => expect(view.getByPlaceholderText('Digite o nome').props.value).toBe('Bus'));
		fireEvent.changeText(view.getByPlaceholderText('Digite o valor'), '6');
		fireEvent.changeText(view.getByPlaceholderText('Digite a placa'), 'NEW-123');
		view.getAllByRole('switch').forEach((control) => fireEvent(control, 'valueChange', true));
		fireEvent.changeText(view.getByPlaceholderText('Digite o nome'), '');
		fireEvent.press(view.getByText('Atualizar'));
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique os campos e tente novamente!');

		fireEvent.changeText(view.getByPlaceholderText('Digite o nome'), 'New Bus');
		await act(async () => fireEvent.press(view.getByText('Atualizar')));
		await waitFor(() =>
			expect(nav.navigate).toHaveBeenCalledWith('ListVehicleInfosCompany', expect.any(Object))
		);

		mockGetVehicle.mockResolvedValueOnce({
			id: 'vehicle-doc',
			name: 'Bus',
			is_public: false,
			registration_plate: 'ABC-123',
		});
		mockGetVehicleFunction.mockResolvedValueOnce({
			id: 'functions-doc',
			price_transport: 5,
			suport_wheelchair: false,
			wifi: true,
			air_conditioning: false,
			washrooms: true,
		});
		const backNav = makeNavigation();
		const backView = render(
			<EditVehicle
				navigation={backNav}
				route={route({
					uid: 'c',
					registration_Plate: 'ABC-123',
					backPage: 'SettingsDriver',
					params: { uid: 'c' },
				})}
			/>
		);
		await waitFor(() =>
			expect(backView.getByPlaceholderText('Digite o nome').props.value).toBe('Bus')
		);
		mockGetVehicleFunction.mockResolvedValueOnce({ id: 'functions-doc', price_transport: 5 });
		await act(async () => fireEvent.press(backView.getByText('Atualizar')));
		await waitFor(() =>
			expect(backNav.navigate).toHaveBeenCalledWith('SettingsDriver', expect.any(Object))
		);

		mockGetVehicle.mockResolvedValueOnce({
			id: 'vehicle-doc',
			name: 'Bus',
			is_public: false,
			registration_plate: 'ABC-123',
		});
		mockGetVehicleFunction.mockResolvedValueOnce({ id: 'functions-doc', price_transport: 5 });
		mockUpdatePlateVehicleCompany.mockResolvedValueOnce({ error: new Error('update failed') });
		const errorNav = makeNavigation();
		const errorView = render(
			<EditVehicle
				navigation={errorNav}
				route={route({ uid: 'c', registration_Plate: 'ABC-123' })}
			/>
		);
		await waitFor(() =>
			expect(errorView.getByPlaceholderText('Digite o nome').props.value).toBe('Bus')
		);
		await act(async () => fireEvent.press(errorView.getByText('Atualizar')));
		expect(alert).toHaveBeenCalledWith('Erro ao atualizar usuário.');
	});

	test('saves company feedback after requiring text', async () => {
		const view = render(<LeaveYourOpinionCompany route={route({ uid: 'company-1' })} />);
		fireEvent.press(view.getByText('Enviar'));
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique-os e tente novamente!');
		fireEvent.changeText(view.getByPlaceholderText('Digite seu feedback'), 'Great app');
		await act(async () => fireEvent.press(view.getByText('Enviar')));
		expect(mockSaveAppFeedback).toHaveBeenCalledWith('company-1', 'Great app');
		expect(alert).toHaveBeenCalledWith('Feedback registrado!');
	});

	test('loads company vehicle information from either route shape', async () => {
		const vehicle = {
			name: 'Bus',
			id_to_passengers: '#BUS',
			id_to_share_localization: 'ABC-123',
			password_to_share_localization: 'SECRET',
			registration_plate: 'ABC-123',
		};
		mockGetVehicleFunction.mockResolvedValueOnce({
			washrooms: true,
			air_conditioning: false,
			wifi: true,
			suport_wheelchair: false,
			price_transport: 5,
		});
		const receivedNav = makeNavigation();
		const received = render(
			<ListVehicleInfosCompany
				navigation={receivedNav}
				route={route({ uid: 'c', receivedVehicle: vehicle })}
			/>
		);
		await waitFor(() => expect(received.getAllByText('Bus').length).toBeGreaterThan(0));
		fireEvent.press(received.UNSAFE_getAllByType(TouchableOpacity)[0]);
		fireEvent.press(received.getByText('EDITAR'));
		expect(receivedNav.navigate).toHaveBeenCalledWith('EditVehicle', expect.any(Object));

		mockGetVehicle.mockResolvedValueOnce(vehicle);
		mockGetVehicleFunction.mockResolvedValueOnce({
			washrooms: false,
			air_conditioning: true,
			wifi: false,
			suport_wheelchair: true,
			price_transport: 4,
		});
		const directNav = makeNavigation();
		const direct = render(
			<ListVehicleInfosCompany
				navigation={directNav}
				route={route({ uid: 'c', registrationPlate: 'ABC-123' })}
			/>
		);
		await waitFor(() => expect(direct.getAllByText('Bus').length).toBeGreaterThan(0));
		fireEvent.press(direct.getByText('EDITAR'));
		expect(directNav.navigate).toHaveBeenCalledWith('EditVehicle', expect.any(Object));
	});

	test('shows company map markers and menu actions', async () => {
		mockDatabaseOn.mockImplementationOnce((event, callback) =>
			callback({
				val: () => ({ company: { 'ABC-123': { latitude: 1, longitude: 2, status: 'moving' } } }),
			})
		);
		const nav = makeNavigation();
		const view = render(
			<MapCompany
				navigation={nav}
				route={route({ user: { uid: 'c', linked_vehicles: ['ABC-123'] } })}
			/>
		);
		await waitFor(() => expect(view.getByLabelText('ABC-123')).toBeTruthy());
		fireEvent.press(view.getByLabelText('ABC-123'));
		expect(nav.navigate).toHaveBeenCalledWith('ListVehicleInfosCompany', {
			registrationPlate: 'ABC-123',
			uid: 'c',
			status: 'moving',
		});
		fireEvent.press(view.getByText('CADASTRAR NOVO VEÍCULO'));
		fireEvent.press(view.getByText('CONFIGURAÇÕES'));
		expect(nav.navigate).toHaveBeenCalledWith('CreateNewVehicle', { uid: 'c' });
		expect(nav.navigate).toHaveBeenCalledWith('SettingsCompany');

		mockDatabaseOn.mockImplementationOnce((event, callback) =>
			callback({ val: () => ({ other: {} }) })
		);
		render(
			<MapCompany
				navigation={makeNavigation()}
				route={route({ user: { uid: 'c', linked_vehicles: ['MISSING'] } })}
			/>
		);
		mockDatabaseOn.mockImplementationOnce((event, callback) => callback({ val: () => undefined }));
		render(
			<MapCompany
				navigation={makeNavigation()}
				route={route({ user: { uid: 'c', linked_vehicles: [] } })}
			/>
		);
	});

	test('renders feedback empty and populated states', async () => {
		jest.useFakeTimers();

		try {
			mockGetCompanyFeedback.mockResolvedValueOnce([]);
			const empty = render(<ReceivedFeedbacks route={route({ uid: 'c' })} />);
			await waitFor(() => expect(empty.getByText('Não há feedbacks até o momento!')).toBeTruthy());
			empty.unmount();

			mockGetCompanyFeedback.mockResolvedValueOnce([
				{ id: 'f1', name_sender: 'Ana', feedback: 'Good' },
			]);
			const populated = render(<ReceivedFeedbacks route={route({ uid: 'c' })} />);
			await waitFor(() => expect(populated.getByText('Good')).toBeTruthy());
			await act(async () => jest.runOnlyPendingTimers());
			populated.unmount();
		} finally {
			jest.useRealTimers();
		}
	});

	test('navigates company settings and logs out', async () => {
		const nav = makeNavigation();
		const view = render(<SettingsCompany navigation={nav} />);
		await waitFor(() => expect(mockGetSession).toHaveBeenCalled());
		fireEvent.press(view.getByText('Cadastrar novo veículo'));
		fireEvent.press(view.getByText('Listar veículos'));
		fireEvent.press(view.getByText('Feedbacks recebidos'));
		fireEvent.press(view.getByText('Editar perfil'));
		fireEvent.press(view.getByText('Deixe sua opinião'));
		fireEvent.press(view.getByText('Entre em contato conosco'));
		fireEvent.press(view.getByText('Sair da conta'));
		await waitFor(() =>
			expect(nav.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'InitialPage' }] })
		);
		expect(openURL).toHaveBeenCalledWith('https://api.whatsapp.com/send?phone=55540808');
	});

	test('copies vehicle credentials and continues', () => {
		const vehicle = { registration_plate: 'ABC-123', password_to_share_localization: 'SECRET' };
		const nav = makeNavigation();
		const view = render(<ShowVehicleCode navigation={nav} route={route({ uid: 'c', vehicle })} />);
		fireEvent.press(view.getByText('ABC-123'));
		fireEvent.press(view.getByText('SECRET'));
		fireEvent.press(view.getByText('Continuar'));
		expect(mockClipboardSetString).toHaveBeenNthCalledWith(1, 'ABC-123');
		expect(mockClipboardSetString).toHaveBeenNthCalledWith(2, 'SECRET');
		expect(nav.navigate).toHaveBeenCalledWith('AskPointsVehicleWillPass', { uid: 'c', vehicle });
	});
});
