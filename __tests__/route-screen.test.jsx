import { Text, View } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { WideButton } from '../src/components/WideButton';
import { createRouteScreen } from '../src/navigation/RouteScreen';
import { hydrateRouteParams } from '../src/navigation/routeParams';
jest.mock('../src/backend/Login', () => ({ getUserOnFirebase: jest.fn() }));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicle: jest.fn(),
	getVehicleFunction: jest.fn(),
}));
jest.mock('../src/navigation/routeParams', () => ({
	...jest.requireActual('../src/navigation/routeParams'),
	hydrateRouteParams: jest.fn(),
}));
const Page = ({ navigation, route }) => (
	<View>
		<Text>{route.params?.uid}</Text>
		<WideButton
			textButton="Map"
			onPress={() => navigation.navigate('MapPassenger', { user: { uid: 'p', name: 'private' } })}
		/>
		<WideButton textButton="Login" onPress={() => navigation.navigate('Login')} />
	</View>
);
const navigation = () => ({ navigate: jest.fn(), reset: jest.fn() });
test('public authentication resets history and only forwards identifier params', () => {
	const Login = createRouteScreen(Page, 'Login');
	const nav = navigation();
	const view = render(<Login navigation={nav} route={{}} />);
	fireEvent.press(view.getByText('Map'));
	expect(nav.reset).toHaveBeenCalledWith({
		index: 0,
		routes: [{ name: 'MapPassenger', params: { uid: 'p' } }],
	});
	fireEvent.press(view.getByText('Login'));
	expect(nav.navigate).toHaveBeenCalledWith('Login', {});
});
test('shows loading, a recoverable error and successfully retries hydration', async () => {
	const Map = createRouteScreen(Page, 'MapPassenger');
	const nav = navigation();
	let reject;
	hydrateRouteParams.mockReturnValueOnce(
		new Promise((resolve, rejectRequest) => {
			reject = rejectRequest;
		})
	);
	const view = render(<Map navigation={nav} route={{ params: {} }} />);
	expect(view.getByLabelText('Carregando tela')).toBeTruthy();
	await act(async () => reject(new Error('missing params')));
	expect(view.getByRole('alert')).toBeTruthy();
	fireEvent.press(view.getByText('Voltar ao início'));
	expect(nav.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'InitialPage' }] });
	hydrateRouteParams.mockResolvedValueOnce({ uid: 'p' });
	fireEvent.press(view.getByText('Tentar novamente'));
	await waitFor(() => expect(view.getByText('p')).toBeTruthy());
	fireEvent.press(view.getByText('Map'));
	expect(nav.navigate).toHaveBeenCalledWith('MapPassenger', { uid: 'p' });
});
test.each(['resolve', 'reject'])('ignores late %s after leaving the screen', async (outcome) => {
	let done;
	hydrateRouteParams.mockReturnValueOnce(
		new Promise((resolve, reject) => {
			done = outcome === 'resolve' ? resolve : reject;
		})
	);
	const PageWithData = createRouteScreen(Page, 'MapPassenger');
	const view = render(<PageWithData navigation={navigation()} route={{ params: {} }} />);
	view.unmount();
	await act(async () => done({ uid: 'late' }));
});
