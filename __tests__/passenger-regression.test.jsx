jest.mock('../src/hooks/useMapRegion', () => ({
	useMapRegion: () => ({
		mapRef: { current: null },
		initialRegion: {},
		onMapGesture: jest.fn(),
		recenter: jest.fn(),
	}),
}));
jest.mock('../src/service/AuthService', () => ({ logout: mockLogout }));
import { Alert, Linking, Modal } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

const mockGetPassenger = jest.fn();
const mockUpdateUserAllInfos = jest.fn();
const mockAddNewPrivateVehicle = jest.fn();
const mockRemovePrivateVehicle = jest.fn();
const mockGetVehicle = jest.fn();
const mockGetVehicleFunction = jest.fn();
const mockGetMyVehicles = jest.fn();
const mockSaveCompanyFeedback = jest.fn();
const mockSaveAppFeedback = jest.fn();
const mockGetBusStops = jest.fn();
const mockGetSession = jest.fn();
const mockLogout = jest.fn();
const mockRequestPermissions = jest.fn();
const mockGetCurrentPosition = jest.fn();
const mockScheduleNotification = jest.fn();
const mockDatabaseOn = jest.fn();
const mockDatabaseOff = jest.fn();
const mockDatabaseRef = jest.fn(() => ({ on: mockDatabaseOn, off: mockDatabaseOff }));
const mockAsyncStorage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};

jest.mock('../src/backend/Users/Passenger', () => ({
	getPassenger: mockGetPassenger,
	updateUserAllInfos: mockUpdateUserAllInfos,
	addNewPrivateVehicle: mockAddNewPrivateVehicle,
	removePrivateVehicle: mockRemovePrivateVehicle,
}));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicle: mockGetVehicle,
	getVehicleFunction: mockGetVehicleFunction,
	getMyVehicles: mockGetMyVehicles,
}));
jest.mock('../src/backend/feedbacks/CompanyFeedbacks', () => ({
	saveCompanyFeedbackBackend: mockSaveCompanyFeedback,
}));
jest.mock('../src/backend/feedbacks/MyBusFeedbacks', () => ({
	saveAppFeedbackBackend: mockSaveAppFeedback,
}));
jest.mock('../src/backend/map/PassengerMap', () => ({
	getBusStopsLocalzations: mockGetBusStops,
}));
jest.mock('../src/backend/Login', () => ({
	getSession: mockGetSession,
}));
jest.mock('expo-location', () => ({
	requestForegroundPermissionsAsync: mockRequestPermissions,
	getCurrentPositionAsync: mockGetCurrentPosition,
}));
jest.mock('expo-notifications', () => ({
	AndroidNotificationPriority: { HIGH: 'high' },
	AndroidImportance: { DEFAULT: 3 },
	SchedulableTriggerInputTypes: { TIME_INTERVAL: 'timeInterval' },
	setNotificationHandler: jest.fn(),
	setNotificationChannelAsync: jest.fn(),
	getPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
	cancelScheduledNotificationAsync: jest.fn(async () => {}),
	scheduleNotificationAsync: mockScheduleNotification,
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
	__esModule: true,
	default: mockAsyncStorage,
}));
jest.mock('../src/database/FirebaseConfiguration', () => ({
	firebase: { database: () => ({ ref: mockDatabaseRef }) },
}));
jest.mock('react-native-maps', () => {
	const { View } = require('react-native');
	const MapView = ({ children }) => <View testID="map-view">{children}</View>;
	const Marker = ({ children, onPress, title }) => (
		<View accessibilityRole="button" accessibilityLabel={title} onPress={onPress}>
			{children}
		</View>
	);
	return { __esModule: true, default: MapView, Marker };
});

const AddNewPrivateVehicle = require('../src/pages/passengerPages/AddNewPrivateVehicle').default;
const ChooseTypeOfVehicle = require('../src/pages/passengerPages/ChooseTypeOfVehicle').default;
const EditProfilePassenger = require('../src/pages/passengerPages/EditProfilePassenger').default;
const LeaveYourOpinionPassenger =
	require('../src/pages/passengerPages/LeaveYourOpinionPassenger').default;
const ListMyLinkedVehicles = require('../src/pages/passengerPages/ListMyLinkedVehicles').default;
const ListVehicleInfosPassenger =
	require('../src/pages/passengerPages/ListVehicleInfosPassenger').default;
const MapPassenger = require('../src/pages/passengerPages/MapPassenger').default;
const SettingsPassenger = require('../src/pages/passengerPages/SettingsPassenger').default;

const makeNavigation = () => ({ reset: jest.fn(), navigate: jest.fn(), goBack: jest.fn() });
const route = (params) => ({ params });

describe('passenger regressions', () => {
	let alert;
	let openURL;

	beforeEach(() => {
		jest.clearAllMocks();
		alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
		openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
		mockGetSession.mockResolvedValue('passenger-1');
		mockDatabaseOn.mockImplementation((event, callback) => callback({ val: () => null }));
		mockUpdateUserAllInfos.mockResolvedValue(undefined);
		mockAddNewPrivateVehicle.mockResolvedValue(undefined);
		mockRemovePrivateVehicle.mockResolvedValue(undefined);
		mockSaveCompanyFeedback.mockResolvedValue(undefined);
		mockSaveAppFeedback.mockResolvedValue(undefined);
		mockScheduleNotification.mockResolvedValue(undefined);
		mockGetMyVehicles.mockResolvedValue([]);
		mockGetBusStops.mockResolvedValue([]);
	});

	afterEach(() => {
		alert.mockRestore();
		openURL.mockRestore();
	});

	test('adds only a private vehicle and clears the input after success', async () => {
		const view = render(<AddNewPrivateVehicle route={route({ uid: 'passenger-1' })} />);
		fireEvent.changeText(view.getByPlaceholderText('Código de seu Veículo'), '#PUBLIC');
		mockGetVehicle.mockResolvedValueOnce({ is_public: true });
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		expect(alert).toHaveBeenCalledWith('Código do veículo inálido!');

		mockGetVehicle.mockResolvedValueOnce({
			is_public: false,
			registration_plate: 'ABC-123',
		});
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		await waitFor(() =>
			expect(mockAddNewPrivateVehicle).toHaveBeenCalledWith('passenger-1', 'ABC-123')
		);
		expect(alert).toHaveBeenCalledWith(
			'Veículo adicionado com sucesso! Para visualizar volte ao mapa!'
		);
		expect(view.getByPlaceholderText('Código de seu Veículo').props.value).toBe('');
	});

	test('supports public and private vehicle selection', async () => {
		const user = { id: 'passenger-doc', uid: 'passenger-1' };
		const nav = makeNavigation();
		const view = render(<ChooseTypeOfVehicle navigation={nav} route={route({ user })} />);
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		await waitFor(() => expect(nav.navigate).toHaveBeenCalledWith('MapPassenger', { user }));
		expect(mockUpdateUserAllInfos).toHaveBeenCalledWith(
			'passenger-doc',
			null,
			null,
			null,
			'public'
		);

		await act(async () => {
			fireEvent.press(view.getByText('Privado'));
		});
		expect(view.getByPlaceholderText('Código do seu Veículo')).toBeTruthy();
		fireEvent.changeText(view.getByPlaceholderText('Código do seu Veículo'), '#MISSING');
		mockGetVehicle.mockResolvedValueOnce({ is_public: true });
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		expect(alert).toHaveBeenCalledWith('Código do veículo inálido!');

		mockGetVehicle.mockResolvedValueOnce({ is_public: false, registration_plate: 'ABC-123' });
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		await waitFor(() =>
			expect(mockAddNewPrivateVehicle).toHaveBeenCalledWith('passenger-1', 'ABC-123')
		);
		expect(user.codes_private_vehicles).toEqual(['ABC-123']);
		await act(async () => fireEvent.press(view.getByText('Público')));
	});

	test('loads and validates a passenger profile before saving', async () => {
		mockGetPassenger.mockResolvedValueOnce({
			id: 'passenger-doc',
			name: 'Ana',
			email: 'ana@example.com',
			cpf: '52998224725',
			born_date: '01/01/1990',
		});
		const nav = makeNavigation();
		const view = render(
			<EditProfilePassenger navigation={nav} route={route({ uid: 'passenger-1' })} />
		);
		await waitFor(() => expect(view.getByPlaceholderText('Nome completo').props.value).toBe('Ana'));

		fireEvent.changeText(view.getByPlaceholderText('Nome completo'), 'Ana');
		fireEvent.changeText(view.getByPlaceholderText('CPF'), '52998224724');
		fireEvent.changeText(view.getByPlaceholderText('Data de Nascimento'), '02/02/1991');
		await act(async () => {
			fireEvent.press(view.getByText('Atualizar'));
		});
		expect(alert).toHaveBeenCalledWith('CPF inválido! O CPF deve conter apenas numeros!');

		fireEvent.changeText(view.getByPlaceholderText('CPF'), '52998224725');
		await act(async () => fireEvent.press(view.getByText('Atualizar')));
		await waitFor(() =>
			expect(nav.navigate).toHaveBeenCalledWith('SettingsPassenger', { uid: 'passenger-1' })
		);
		expect(mockUpdateUserAllInfos).toHaveBeenCalledWith(
			'passenger-doc',
			'Ana',
			'52998224725',
			'02/02/1991',
			undefined,
			'Passo Fundo/RS'
		);

		mockGetPassenger.mockResolvedValueOnce({
			id: 'other',
			name: 'Other',
			email: 'other@example.com',
		});
		const otherNavigation = makeNavigation();
		const otherView = render(
			<EditProfilePassenger navigation={otherNavigation} route={route({ uid: 'other' })} />
		);
		await waitFor(() =>
			expect(otherView.getByPlaceholderText('Nome completo').props.value).toBe('Other')
		);
		await act(async () => fireEvent.press(otherView.getByText('Atualizar')));
	});

	test('lists linked vehicles and refreshes after removal', async () => {
		const vehicle = { id: 'vehicle-doc', id_to_passengers: '#ABC', registration_plate: 'ABC-123' };
		mockGetMyVehicles.mockResolvedValueOnce([vehicle]).mockResolvedValueOnce([]);
		const view = render(<ListMyLinkedVehicles route={route({ uid: 'passenger-1' })} />);
		await waitFor(() => expect(view.getByText('#ABC')).toBeTruthy());
		await act(async () => {
			fireEvent.press(view.getByText('Remover'));
		});
		await waitFor(() =>
			expect(mockRemovePrivateVehicle).toHaveBeenCalledWith('passenger-1', '#ABC', 'ABC-123')
		);
		await waitFor(() => expect(mockGetMyVehicles).toHaveBeenCalledTimes(2));
	});

	test('saves company and app feedback, with and without a selected vehicle', async () => {
		const vehicle = { name: 'Bus', registration_plate: 'ABC-123' };
		mockGetVehicle.mockResolvedValueOnce(vehicle);
		const nav = makeNavigation();
		const view = render(
			<LeaveYourOpinionPassenger
				navigation={nav}
				route={route({ uid: 'passenger-1', vehicleRegistration: 'ABC-123' })}
			/>
		);
		await waitFor(() =>
			expect(view.getByPlaceholderText('Digite o nome do transporte').props.value).toBe('Bus')
		);
		await act(async () => {
			fireEvent.press(view.getByText('Enviar'));
		});
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique-os e tente novamente!');
		fireEvent.changeText(view.getByPlaceholderText('Digite seu feedback'), 'Good');
		await act(async () => fireEvent.press(view.getByText('Enviar')));
		expect(mockSaveCompanyFeedback).toHaveBeenCalledWith('passenger-1', vehicle, null, 'Good');
		expect(alert).toHaveBeenCalledWith('Feedback registrado!');

		await act(async () => {
			fireEvent.press(view.getByText('Aplicativo MyBus'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Enviar'));
		});
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique-os e tente novamente!');
		fireEvent.changeText(view.getByPlaceholderText('Digite seu feedback'), 'Suggestion');
		await act(async () => fireEvent.press(view.getByText('Enviar')));
		expect(mockSaveAppFeedback).toHaveBeenCalledWith('passenger-1', 'Suggestion');
		await act(async () => {
			fireEvent.press(view.getByText('Transporte'));
		});

		const noVehicleView = render(
			<LeaveYourOpinionPassenger
				navigation={makeNavigation()}
				route={route({ uid: 'passenger-1' })}
			/>
		);
		fireEvent.changeText(
			noVehicleView.getByPlaceholderText('Digite o nome do transporte'),
			'Express'
		);
		fireEvent.changeText(noVehicleView.getByPlaceholderText('Digite seu feedback'), 'Fast');
		await act(async () => fireEvent.press(noVehicleView.getByText('Enviar')));
		expect(mockSaveCompanyFeedback).toHaveBeenCalledWith('passenger-1', null, 'Express', 'Fast');
	});

	test('loads vehicle information, schedules a reminder, and navigates back or to feedback', async () => {
		mockGetVehicle.mockResolvedValueOnce({ name: 'Bus', id_to_passengers: '#BUS' });
		mockGetVehicleFunction.mockResolvedValueOnce({
			price_transport: 5,
			washrooms: true,
			air_conditioning: false,
			wifi: true,
			suport_wheelchair: false,
		});
		const nav = makeNavigation();
		const view = render(
			<ListVehicleInfosPassenger
				navigation={nav}
				route={route({ registrationPlate: 'ABC-123', uid: 'passenger-1', status: 'Running' })}
			/>
		);
		await waitFor(() => expect(view.getAllByText('Bus').length).toBeGreaterThan(0));
		fireEvent(view.getByRole('switch'), 'valueChange', true);
		await waitFor(() =>
			expect(mockScheduleNotification).toHaveBeenCalledWith(
				expect.objectContaining({
					trigger: { type: 'timeInterval', seconds: 60, repeats: false, channelId: 'reminders' },
				})
			)
		);
		await act(async () => {
			fireEvent.press(view.getByText('Dar um feedback'));
		});
		expect(nav.navigate).toHaveBeenCalledWith('LeaveYourOpinionPassenger', {
			uid: 'passenger-1',
			vehicleRegistration: 'ABC-123',
		});
		await act(async () => {
			fireEvent.press(view.getByText('Voltar ao mapa'));
		});
		expect(nav.goBack).toHaveBeenCalledTimes(1);

		const receivedView = render(
			<ListVehicleInfosPassenger
				navigation={makeNavigation()}
				route={route({ receivedVehicle: { name: 'Received', id_to_passengers: '#R', price: 3 } })}
			/>
		);
		await waitFor(() => expect(receivedView.getAllByText('Received').length).toBeGreaterThan(0));
		mockScheduleNotification.mockRejectedValueOnce(new Error('permission failed'));
		await act(async () => fireEvent(receivedView.getByRole('switch'), 'valueChange', true));
		expect(alert).toHaveBeenCalledWith(
			'Não foi possível configurar o lembrete. Verifique as permissões e tente novamente.'
		);
	});

	test('handles passenger map permission branches, markers and menu navigation', async () => {
		mockRequestPermissions.mockResolvedValueOnce({ status: 'denied' });
		const deniedNavigation = makeNavigation();
		render(
			<MapPassenger
				navigation={deniedNavigation}
				route={route({ user: { uid: 'p', codes_private_vehicles: [] } })}
			/>
		);
		await waitFor(() =>
			expect(alert).toHaveBeenCalledWith('Permissão de acesso a localização negado!')
		);

		const bus = {
			registration_plate: 'ABC-123',
			latitude: -23.5,
			longitude: -46.6,
			status: 'moving',
		};
		mockGetMyVehicles.mockResolvedValueOnce([bus]);
		mockGetBusStops.mockResolvedValueOnce([
			{ vehicle_plate: 'ABC-123', latitude: -23.5, longitude: -46.6 },
		]);
		mockRequestPermissions.mockResolvedValueOnce({ status: 'granted' });
		mockGetCurrentPosition.mockResolvedValueOnce({ coords: { latitude: -23.5, longitude: -46.6 } });
		mockDatabaseOn.mockImplementation((event, callback) =>
			callback({
				val: () => ({
					company: { 'ABC-123': { latitude: -23.5, longitude: -46.6, status: 'moving' } },
					other: {},
				}),
			})
		);
		const nav = makeNavigation();
		const view = render(
			<MapPassenger
				navigation={nav}
				route={route({ user: { uid: 'p', codes_private_vehicles: ['ABC-123'] } })}
			/>
		);
		await waitFor(() => expect(view.getByLabelText('Parada de Ônibus')).toBeTruthy());
		await act(async () => {
			fireEvent.press(view.getByLabelText('Parada de Ônibus'));
		});
		await waitFor(() => expect(view.getByText('Voltar ao mapa!')).toBeTruthy());
		await act(async () => {
			fireEvent.press(view.getByText('Voltar ao mapa!'));
		});
		await act(async () => view.UNSAFE_getByType(Modal).props.onRequestClose());
		await act(async () => {
			fireEvent.press(view.getByLabelText('Veículo'));
		});
		expect(nav.navigate).toHaveBeenCalledWith('ListVehicleInfosPassenger', expect.any(Object));
		await act(async () => {
			fireEvent.press(view.getByText('Adicionar veículo privado'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Configurações'));
		});
		expect(nav.navigate).toHaveBeenCalledWith('SettingsPassenger');

		mockRequestPermissions.mockResolvedValueOnce({ status: 'granted' });
		mockGetCurrentPosition.mockRejectedValueOnce(new Error('gps failed'));
		mockDatabaseOn.mockImplementationOnce((event, callback) => callback({ val: () => undefined }));
		const log = jest.spyOn(console, 'log').mockImplementation(() => {});
		render(
			<MapPassenger
				navigation={makeNavigation()}
				route={route({ user: { uid: 'p', codes_private_vehicles: [] } })}
			/>
		);
		await waitFor(() => expect(alert).toHaveBeenCalledWith('Erro ao acessar o GPS!'));
		log.mockRestore();
	});

	test('recovers from offline loads and handles absent location and missing links', async () => {
		mockGetMyVehicles.mockRejectedValueOnce(new Error('offline'));
		mockRequestPermissions.mockRejectedValueOnce(new Error('permission unavailable'));
		const view = render(
			<MapPassenger navigation={makeNavigation()} route={route({ user: { uid: 'p' } })} />
		);
		await waitFor(() => expect(view.getByText('Tentar novamente')).toBeTruthy());
		expect(alert).toHaveBeenCalledWith('Erro ao acessar o GPS!');
		await act(async () => fireEvent.press(view.getByText('Tentar novamente')));
		expect(view.getByText('Nenhum veículo vinculado.')).toBeTruthy();
		mockGetBusStops.mockResolvedValueOnce([
			{ latitude: 1, longitude: 2, vehicle_plate: 'missing' },
		]);
		const cancellation = mockDatabaseOn.mock.calls.at(-1)[2];
		await act(async () => cancellation(new Error('offline')));
		await act(async () => fireEvent.press(view.getByText('Tentar novamente')));
		await act(async () => {
			fireEvent.press(view.getByLabelText('Parada de Ônibus'));
		});
		expect(view.getByText('Localização indisponível')).toBeTruthy();
		expect(view.getByText('Veículo indisponível')).toBeTruthy();
		view.unmount();
		expect(mockDatabaseOff).toHaveBeenCalledWith('value', expect.any(Function));
	});

	test('loads the passenger settings and logs out', async () => {
		const nav = makeNavigation();
		const view = render(<SettingsPassenger navigation={nav} />);
		await waitFor(() => expect(mockGetSession).toHaveBeenCalled());
		fireEvent(view.getByRole('switch'), 'valueChange', false);
		await act(async () => {
			fireEvent.press(view.getByText('Adicionar novo veículo privado'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Listar meus veículos privados'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Editar perfil'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Deixe sua opinião'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Entre em contato conosco'));
		});
		await act(async () => {
			fireEvent.press(view.getByText('Sair da conta'));
		});
		await waitFor(() =>
			expect(nav.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'InitialPage' }] })
		);
		expect(openURL).toHaveBeenCalledWith('https://api.whatsapp.com/send?phone=55540808');
	});
});
