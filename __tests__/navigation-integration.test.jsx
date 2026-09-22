import { Text, View } from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { NavigationHarness, TestStack } from '../test-support/NavigationHarness';
import { createRouteScreen } from '../src/navigation/RouteScreen';
import Login from '../src/pages/commonPages/Login';
import LoginDriver from '../src/pages/driverPages/LoginDriver';
import ForgotMyPassword from '../src/pages/commonPages/ForgotMyPassword';
import { useLogout } from '../src/hooks/useLogout';
import { WideButton } from '../src/components/WideButton';
import * as auth from '../src/service/AuthService';
import * as backend from '../src/backend/Login';
import { getAllVehicles } from '../src/service/VehicleService';
import { getCompanyByRegistrationPlate } from '../src/backend/Users/Company';
import { getVehicle, getVehicleFunction } from '../src/backend/vehicles/Vehicle';
jest.mock('../src/service/AuthService', () => ({
	login: jest.fn(),
	logout: jest.fn(),
	requestPasswordReset: jest.fn(),
}));
jest.mock('../src/backend/Login', () => ({
	createSession: jest.fn(),
	getUserOnFirebase: jest.fn(),
	driverLoginIsValid: jest.fn(),
}));
jest.mock('../src/service/VehicleService', () => ({ getAllVehicles: jest.fn() }));
jest.mock('../src/backend/Users/Company', () => ({ getCompanyByRegistrationPlate: jest.fn() }));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicle: jest.fn(),
	getVehicleFunction: jest.fn(),
}));
function Destination({ navigation, route }) {
	const logout = useLogout(navigation);
	return (
		<View>
			<Text>{route.name}</Text>
			<WideButton textButton="Sair" onPress={logout} />
		</View>
	);
}
const Initial = () => <Text>Área pública</Text>;
const pages = {
	InitialPage: Initial,
	Login: createRouteScreen(Login, 'Login'),
	LoginDriver: createRouteScreen(LoginDriver, 'LoginDriver'),
	ForgotMyPassword: createRouteScreen(ForgotMyPassword, 'ForgotMyPassword'),
	MapPassenger: createRouteScreen(Destination, 'MapPassenger'),
	MapCompany: createRouteScreen(Destination, 'MapCompany'),
	MapDriver: createRouteScreen(Destination, 'MapDriver'),
};
const mount = (start) => {
	const ref = createNavigationContainerRef();
	const view = render(
		<NavigationHarness navigationRef={ref} initialRouteName={start}>
			{Object.entries(pages).map(([name, component]) => (
				<TestStack.Screen key={name} name={name} component={component} />
			))}
		</NavigationHarness>
	);
	return { view, ref };
};
test.each([true, false])(
	'login and logout reset actual navigation history for passenger=%s',
	async (isPassenger) => {
		const user = { uid: 'account', isPassenger };
		auth.login.mockResolvedValueOnce({ user });
		backend.getUserOnFirebase.mockResolvedValue(user);
		const { view, ref } = mount('Login');
		fireEvent.changeText(view.getByPlaceholderText('Email'), 'test@example.com');
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'Password1');
		await act(async () => fireEvent.press(view.getByText('Entrar')));
		await waitFor(() =>
			expect(view.getByText(isPassenger ? 'MapPassenger' : 'MapCompany')).toBeTruthy()
		);
		expect(ref.canGoBack()).toBe(false);
		expect(ref.getCurrentRoute().params).toEqual({ uid: 'account' });
		await act(async () => fireEvent.press(view.getByText('Sair')));
		expect(view.getByText('Área pública')).toBeTruthy();
		expect(ref.canGoBack()).toBe(false);
	}
);
test('driver login hydrates identifier params and clears its login history', async () => {
	const vehicle = { registration_plate: 'ABC-123' };
	getAllVehicles.mockResolvedValue([vehicle]);
	backend.driverLoginIsValid.mockResolvedValueOnce(true);
	backend.getUserOnFirebase.mockResolvedValue({ uid: 'company' });
	getCompanyByRegistrationPlate.mockResolvedValue({ uid: 'company' });
	getVehicle.mockResolvedValue(vehicle);
	getVehicleFunction.mockResolvedValue({ wifi: true });
	const { view, ref } = mount('LoginDriver');
	await waitFor(() => expect(getAllVehicles).toHaveBeenCalled());
	fireEvent.changeText(view.getByPlaceholderText('Placa do veículo'), 'ABC-123');
	fireEvent.changeText(view.getByPlaceholderText('Senha'), 'driver-password');
	await act(async () => fireEvent.press(view.getByText('Entrar')));
	await waitFor(() => expect(view.getByText('MapDriver')).toBeTruthy());
	expect(ref.getCurrentRoute().params).toEqual({ uid: 'company', registrationPlate: 'ABC-123' });
	expect(ref.canGoBack()).toBe(false);
});
test('password recovery blocks duplicate sends and navigates back to login', async () => {
	let resolve;
	auth.requestPasswordReset.mockReturnValueOnce(
		new Promise((done) => {
			resolve = done;
		})
	);
	const { view, ref } = mount('Login');
	fireEvent.press(view.getByText('Esqueceu sua senha?'));
	await waitFor(() => expect(ref.getCurrentRoute().name).toBe('ForgotMyPassword'));
	fireEvent.changeText(view.getByPlaceholderText('Email'), 'test@example.com');
	await act(async () => {
		fireEvent.press(view.getByText('Continuar'));
	});
	expect(view.getByRole('button', { name: 'Continuar' }).props.accessibilityState).toMatchObject({
		busy: true,
		disabled: true,
	});
	fireEvent.press(view.getByText('Continuar'));
	expect(auth.requestPasswordReset).toHaveBeenCalledTimes(1);
	await act(async () => resolve());
	fireEvent.press(view.getByText('Entrar'));
	await waitFor(() => expect(ref.getCurrentRoute().name).toBe('Login'));
});
test('invalid protected params show a recoverable screen within the navigation container', async () => {
	const { view, ref } = mount('MapPassenger');
	await waitFor(() => expect(view.getByRole('alert')).toBeTruthy());
	fireEvent.press(view.getByText('Voltar ao início'));
	await waitFor(() => expect(ref.getCurrentRoute().name).toBe('InitialPage'));
});
