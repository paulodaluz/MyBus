jest.mock('../src/service/AuthService', () => ({ logout: mockLogout }));
import { Alert, Linking, Modal, TouchableOpacity } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

const mockDriverLoginIsValid = jest.fn();
const mockGetAllVehicles = jest.fn();
const mockGetCompanyByRegistrationPlate = jest.fn();
const mockGetVehicleFunction = jest.fn();
const mockLogout = jest.fn();
const mockRequestPermissions = jest.fn();
const mockGetCurrentPosition = jest.fn();
const mockSetLocation = jest.fn();
const mockDatabaseRef = jest.fn(() => ({ set: mockSetLocation }));

jest.mock('../src/backend/Login', () => ({
	driverLoginIsValid: mockDriverLoginIsValid,
}));
jest.mock('../src/service/VehicleService', () => ({ getAllVehicles: mockGetAllVehicles }));
jest.mock('../src/backend/Users/Company', () => ({
	getCompanyByRegistrationPlate: mockGetCompanyByRegistrationPlate,
}));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicleFunction: mockGetVehicleFunction,
}));
jest.mock('expo-location', () => ({
	requestForegroundPermissionsAsync: mockRequestPermissions,
	getCurrentPositionAsync: mockGetCurrentPosition,
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

const LoginDriver = require('../src/pages/driverPages/LoginDriver').default;
const MapDriver = require('../src/pages/driverPages/MapDriver').default;
const SettingsDriver = require('../src/pages/driverPages/SettingsDriver').default;
const DriverMenu = require('../src/pages/driverPages/MapDriver/Menu').Menu;

const route = (params) => ({ params });
const makeNavigation = () => ({ reset: jest.fn(), navigate: jest.fn() });

describe('driver regressions', () => {
	let alert;
	let openURL;

	beforeEach(() => {
		jest.clearAllMocks();
		alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
		openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
		mockGetAllVehicles.mockResolvedValue([]);
		mockRequestPermissions.mockResolvedValue({ status: 'denied' });
		mockLogout.mockResolvedValue(undefined);
		mockGetCompanyByRegistrationPlate.mockResolvedValue({ uid: 'company-1' });
		mockGetVehicleFunction.mockResolvedValue({ registration_plate: 'ABC-123' });
		mockSetLocation.mockResolvedValue(undefined);
	});

	afterEach(() => {
		alert.mockRestore();
		openURL.mockRestore();
	});

	test('validates driver credentials and navigates with company and vehicle data', async () => {
		const vehicle = { registration_plate: 'ABC-123', password_to_share_localization: 'SECRET' };
		mockGetAllVehicles.mockResolvedValueOnce([vehicle]);
		const nav = makeNavigation();
		const view = render(<LoginDriver navigation={nav} />);
		await waitFor(() => expect(mockGetAllVehicles).toHaveBeenCalled());
		fireEvent.press(view.getByText('Entrar'));
		expect(alert).toHaveBeenCalledWith('Usuário ou senha inválida!');

		fireEvent.changeText(view.getByPlaceholderText('Placa do veículo'), 'ABC-123');
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'SECRET');
		mockDriverLoginIsValid.mockResolvedValueOnce(false);
		await act(async () => fireEvent.press(view.getByText('Entrar')));
		expect(alert).toHaveBeenCalledWith('Dados inválidos!');

		mockDriverLoginIsValid.mockResolvedValueOnce(true);
		await act(async () => fireEvent.press(view.getByText('Entrar')));
		await waitFor(() =>
			expect(nav.navigate).toHaveBeenCalledWith('MapDriver', {
				company: { uid: 'company-1' },
				vehicle,
				vehicleFunctions: { registration_plate: 'ABC-123' },
			})
		);
	});

	test('handles denied location, shares location after permission, and edits vehicle', async () => {
		const vehicle = {
			name: 'Bus',
			registration_plate: 'ABC-123',
			id_to_passengers: '#BUS',
			id_to_share_localization: 'ABC-123',
			password_to_share_localization: 'SECRET',
		};
		const vehicleFunctions = {
			wifi: true,
			air_conditioning: false,
			washrooms: true,
			suport_wheelchair: false,
			price_transport: 5,
		};
		const deniedNav = makeNavigation();
		render(
			<MapDriver
				navigation={deniedNav}
				route={route({ company: { uid: 'company-1' }, vehicle, vehicleFunctions })}
			/>
		);
		await waitFor(() =>
			expect(alert).toHaveBeenCalledWith('Permissão de acesso a localização negado!')
		);

		let releasePosition;
		const position = new Promise((resolve) => {
			releasePosition = resolve;
		});
		mockRequestPermissions.mockResolvedValueOnce({ status: 'granted' });
		mockGetCurrentPosition.mockReturnValueOnce(position);
		const nav = makeNavigation();
		const view = render(
			<MapDriver
				navigation={nav}
				route={route({ company: { uid: 'company-1' }, vehicle, vehicleFunctions })}
			/>
		);
		fireEvent.press(view.getByText('COMPARTILHAR LOCALIZAÇÃO'));
		releasePosition({ coords: { latitude: -23.5, longitude: -46.6 } });
		await waitFor(() => expect(view.getByText('Compartilhando a localização...')).toBeTruthy());
		await waitFor(() =>
			expect(mockSetLocation).toHaveBeenCalledWith({
				latitude: -23.5,
				longitude: -46.6,
				status: 'Operando Normalmente',
			})
		);
		await act(async () =>
			view.UNSAFE_getByType(Modal).props.children.props.onPressUpdateVehiclesInfo()
		);
		await act(async () => view.UNSAFE_getByType(DriverMenu).props.onPressShowVehicleInfos());
		await waitFor(() => expect(view.UNSAFE_getByType(Modal).props.visible).toBe(true));
		await act(async () => view.UNSAFE_getByType(Modal).props.onRequestClose());
		expect(view.UNSAFE_getByType(Modal).props.visible).toBe(false);
		await act(async () => view.UNSAFE_getByType(DriverMenu).props.onPressShowVehicleInfos());
		await act(async () => fireEvent.press(view.getByText('EDITAR')));

		const menuButtons = view.UNSAFE_getAllByType(TouchableOpacity);
		fireEvent.press(menuButtons[menuButtons.length - 2]);
		fireEvent.press(view.getByText('EDITAR'));
		expect(nav.navigate).toHaveBeenCalledWith('EditVehicle', {
			uid: 'company-1',
			registration_Plate: 'ABC-123',
			backPage: 'MapDriver',
			params: { company: { uid: 'company-1' }, vehicle, vehicleFunctions },
		});
		fireEvent.press(view.UNSAFE_getAllByType(TouchableOpacity)[1]);
		fireEvent.press(view.UNSAFE_getAllByType(TouchableOpacity)[0]);
		fireEvent.press(view.getByText('CONFIGURAÇÕES'));
		expect(nav.navigate).toHaveBeenCalledWith('SettingsDriver', {
			uid: 'company-1',
			registration_Plate: 'ABC-123',
		});

		mockRequestPermissions.mockResolvedValueOnce({ status: 'granted' });
		mockGetCurrentPosition.mockRejectedValueOnce(new Error('gps failed'));
		const log = jest.spyOn(console, 'log').mockImplementation(() => {});
		render(
			<MapDriver
				navigation={makeNavigation()}
				route={route({ company: { uid: 'company-1' }, vehicle, vehicleFunctions })}
			/>
		);
		await waitFor(() => expect(alert).toHaveBeenCalledWith('Erro ao acessar o GPS!'));
		log.mockRestore();
	});

	test('logs a driver out and exposes all settings actions', async () => {
		const nav = makeNavigation();
		const view = render(
			<SettingsDriver
				navigation={nav}
				route={route({ uid: 'company-1', registration_Plate: 'ABC-123' })}
			/>
		);
		fireEvent.press(view.getByText('Feedbacks recebidos'));
		fireEvent.press(view.getByText('Editar informações do veículo'));
		fireEvent.press(view.getByText('Deixe sua opinião'));
		fireEvent.press(view.getByText('Entre em contato conosco'));
		fireEvent.press(view.getByText('Sair da conta'));
		await waitFor(() =>
			expect(nav.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'InitialPage' }] })
		);
		expect(nav.navigate).toHaveBeenCalledWith('ReceivedFeedbacks', { uid: 'company-1' });
		expect(nav.navigate).toHaveBeenCalledWith('LeaveYourOpinionCompany', { uid: 'company-1' });
		expect(openURL).toHaveBeenCalledWith('https://api.whatsapp.com/send?phone=55540808');
	});
});
