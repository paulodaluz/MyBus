import { Alert } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';

const mockGetSession = jest.fn();
const mockGetUserOnFirebase = jest.fn();
const mockCreateSession = jest.fn();
const mockAuthLogin = jest.fn();
const mockRequestPasswordReset = jest.fn();
const mockCreatePassengerBackend = jest.fn();
const mockCreateCompanyBackend = jest.fn();

jest.mock('../src/backend/Login', () => ({
	getSession: mockGetSession,
	getUserOnFirebase: mockGetUserOnFirebase,
	createSession: mockCreateSession,
}));
jest.mock('../src/service/AuthService', () => ({
	login: mockAuthLogin,
	requestPasswordReset: mockRequestPasswordReset,
}));
jest.mock('../src/backend/Users/Passenger', () => ({
	createPassengerBackend: mockCreatePassengerBackend,
}));
jest.mock('../src/backend/Users/Company', () => ({
	createCompanyBackend: mockCreateCompanyBackend,
}));

const InitialPage = require('../src/pages/commonPages/InitialPage').default;
const Login = require('../src/pages/commonPages/Login').default;
const ForgotMyPassword = require('../src/pages/commonPages/ForgotMyPassword').default;
const RegisterPassenger = require('../src/pages/passengerPages/RegisterPassenger').default;
const RegisterCompany = require('../src/pages/companyPages/RegisterCompany').default;

const navigation = () => ({ navigate: jest.fn() });

describe('authentication and bootstrap regressions', () => {
	let alert;

	beforeEach(() => {
		jest.clearAllMocks();
		alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
	});

	afterEach(() => {
		alert.mockRestore();
	});

	test('keeps login available when bootstrap storage fails', async () => {
		mockGetSession.mockRejectedValueOnce(new Error('offline'));
		const nav = navigation();
		const view = render(<InitialPage navigation={nav} />);
		await waitFor(() =>
			expect(alert).toHaveBeenCalledWith(
				'Não foi possível restaurar a sessão. Faça login novamente.'
			)
		);
		expect(view.getByText('Login')).toBeTruthy();
		expect(nav.navigate).not.toHaveBeenCalled();
		mockGetSession.mockResolvedValueOnce('');
		render(<InitialPage navigation={nav} />);
	});

	test('keeps the initial page when there is no session or user record', async () => {
		mockGetSession.mockResolvedValueOnce('missing-session-user');
		mockGetUserOnFirebase.mockResolvedValueOnce(undefined);
		const nav = navigation();

		const view = render(<InitialPage navigation={nav} />);
		await waitFor(() => expect(mockGetUserOnFirebase).toHaveBeenCalledWith('missing-session-user'));
		fireEvent.press(view.getByText('Passageiro'));

		expect(nav.navigate).not.toHaveBeenCalled();
		expect(view.getByText('Login')).toBeTruthy();
	});

	test('bootstraps a passenger and a company from an existing session', async () => {
		const passenger = { uid: 'passenger-1', isPassenger: true };
		const passengerNavigation = navigation();
		mockGetSession.mockResolvedValueOnce('passenger-1');
		mockGetUserOnFirebase.mockResolvedValueOnce(passenger);

		render(<InitialPage navigation={passengerNavigation} />);
		await waitFor(() =>
			expect(passengerNavigation.navigate).toHaveBeenCalledWith('MapPassenger', { user: passenger })
		);

		const company = { uid: 'company-1', isPassenger: false };
		const companyNavigation = navigation();
		mockGetSession.mockResolvedValueOnce('company-1');
		mockGetUserOnFirebase.mockResolvedValueOnce(company);

		render(<InitialPage navigation={companyNavigation} />);
		await waitFor(() =>
			expect(companyNavigation.navigate).toHaveBeenCalledWith('MapCompany', { user: company })
		);
	});

	test('switches the initial page to company actions and navigates to driver login', async () => {
		mockGetSession.mockResolvedValueOnce(undefined);
		const nav = navigation();
		const view = render(<InitialPage navigation={nav} />);

		fireEvent.press(view.getByText('Login'));
		const gesture = view.UNSAFE_getByType(GestureRecognizer);
		await act(async () => {
			gesture.props.onSwipeLeft();
			gesture.props.onSwipeRight();
		});
		fireEvent.press(view.getByText('Passageiro'));
		expect(view.getByText('Empresas')).toBeTruthy();
		fireEvent.press(view.getByText('Login do Motorista'));
		fireEvent.press(view.getByText('Cadastre-se'));
		fireEvent.press(view.getByText('Empresas'));
		fireEvent.press(view.getByText('Cadastre-se'));

		expect(nav.navigate).toHaveBeenCalledWith('Login');
		expect(nav.navigate).toHaveBeenCalledWith('LoginDriver');
		expect(nav.navigate).toHaveBeenCalledWith('RegisterCompany');
		expect(nav.navigate).toHaveBeenCalledWith('RegisterPassenger');
	});

	test('handles invalid credentials and successful passenger/company login', async () => {
		const nav = navigation();
		const view = render(<Login navigation={nav} />);
		fireEvent.press(view.getByText('Entrar'));
		expect(alert).toHaveBeenCalledWith('Usuário ou senha inválida!');

		fireEvent.changeText(view.getByPlaceholderText('Email'), 'person@example.com');
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'Password1');
		mockAuthLogin.mockResolvedValueOnce({ message: 'invalid' });
		await act(async () => fireEvent.press(view.getByText('Entrar')));
		expect(alert).toHaveBeenCalledWith('Erro ao logar, verifique os dados e tente novamente!');

		mockAuthLogin.mockResolvedValueOnce({ user: { uid: 'passenger-1' } });
		mockGetUserOnFirebase.mockResolvedValueOnce({ uid: 'passenger-1', isPassenger: true });
		await act(async () => fireEvent.press(view.getByText('Entrar')));
		await waitFor(() =>
			expect(nav.navigate).toHaveBeenCalledWith('MapPassenger', { user: expect.any(Object) })
		);
		expect(mockCreateSession).toHaveBeenCalledWith('passenger-1');

		const companyNavigation = navigation();
		const companyView = render(<Login navigation={companyNavigation} />);
		fireEvent.changeText(companyView.getByPlaceholderText('Email'), 'company@example.com');
		fireEvent.changeText(companyView.getByPlaceholderText('Senha'), 'Password1');
		mockAuthLogin.mockResolvedValueOnce({ user: { uid: 'company-1' } });
		mockGetUserOnFirebase.mockResolvedValueOnce({ uid: 'company-1', isPassenger: false });
		await act(async () => fireEvent.press(companyView.getByText('Entrar')));
		await waitFor(() =>
			expect(companyNavigation.navigate).toHaveBeenCalledWith('MapCompany', {
				user: expect.any(Object),
			})
		);
	});

	test('shows an alert when authentication succeeds without an application user', async () => {
		const nav = navigation();
		const view = render(<Login navigation={nav} />);
		fireEvent.changeText(view.getByPlaceholderText('Email'), 'person@example.com');
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'Password1');
		mockAuthLogin.mockResolvedValueOnce({ user: { uid: 'unknown' } });
		mockGetUserOnFirebase.mockResolvedValueOnce(undefined);

		await act(async () => fireEvent.press(view.getByText('Entrar')));
		await waitFor(() => expect(alert).toHaveBeenCalledWith('Usuário ou senha inválida!'));
	});

	test('navigates to password recovery', () => {
		const nav = navigation();
		const view = render(<Login navigation={nav} />);
		fireEvent.press(view.getByText('Esqueceu sua senha?'));
		expect(nav.navigate).toHaveBeenCalledWith('ForgotMyPassword');
	});

	test('recovers passwords with validation, cooldown, loading and safe errors', async () => {
		const nav = navigation();
		const view = render(<ForgotMyPassword navigation={nav} />);
		fireEvent.press(view.getByText('Continuar'));
		expect(alert).toHaveBeenCalledWith('E-mail inválido!');
		fireEvent.changeText(view.getByPlaceholderText('Email'), 'invalid');
		fireEvent.press(view.getByText('Continuar'));
		expect(mockRequestPasswordReset).not.toHaveBeenCalled();
		fireEvent.changeText(view.getByPlaceholderText('Email'), 'person@example.com');
		mockRequestPasswordReset.mockRejectedValueOnce({ code: 'auth/network-request-failed' });
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		expect(alert).toHaveBeenCalledWith(
			'Não foi possível enviar. Verifique sua conexão e tente novamente.'
		);
		let resolve;
		mockRequestPasswordReset.mockReturnValueOnce(
			new Promise((done) => {
				resolve = done;
			})
		);
		const button = view.getByRole('button', { name: 'Continuar' });
		await act(async () => {
			fireEvent.press(button);
			fireEvent.press(button);
		});
		expect(view.getByRole('button', { name: 'Continuar' }).props.accessibilityState.busy).toBe(
			true
		);
		expect(view.getByPlaceholderText('Email').props.editable).toBe(false);
		await act(async () => resolve());
		expect(alert).toHaveBeenCalledWith(
			'Confira seu e-mail',
			expect.stringContaining('Se houver uma conta')
		);
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		expect(alert).toHaveBeenCalledWith('Aguarde um minuto antes de tentar novamente.');
		const now = jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 61000);
		mockRequestPasswordReset.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
		await act(async () => fireEvent.press(view.getByText('Continuar')));
		expect(alert).toHaveBeenCalledWith('Muitas tentativas. Aguarde antes de tentar novamente.');
		now.mockRestore();
		fireEvent.press(view.getByText('Entrar'));
		expect(nav.navigate).toHaveBeenCalledWith('Login');
	});

	test('validates and creates a passenger account', async () => {
		const nav = navigation();
		const view = render(<RegisterPassenger navigation={nav} />);
		for (const field of ['Nome completo', 'Email', 'Senha', 'Confirme sua senha']) {
			expect(view.getByPlaceholderText(field).props.value).toBe('');
		}
		fireEvent.changeText(view.getByPlaceholderText('Nome completo'), 'Passenger');
		fireEvent.changeText(view.getByPlaceholderText('Email'), '');
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique-os e tente novamente!');

		fireEvent.changeText(view.getByPlaceholderText('Email'), 'valid@example.com');
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'Password1');
		fireEvent.changeText(view.getByPlaceholderText('Confirme sua senha'), 'Different1');
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('As senhas não conferem!');

		fireEvent.changeText(view.getByPlaceholderText('Confirme sua senha'), 'Password1');
		fireEvent.changeText(view.getByPlaceholderText('Email'), 'invalid');
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('E-mail inválido!');

		fireEvent.changeText(view.getByPlaceholderText('Email'), 'valid@example.com');
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'weak');
		fireEvent.changeText(view.getByPlaceholderText('Confirme sua senha'), 'weak');
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith(
			'A senha deve conter oito caracteres, pelo menos uma letra maiúscula, minúscula e um número!'
		);

		mockCreatePassengerBackend.mockResolvedValueOnce({ error: new Error('already exists') });
		fireEvent.changeText(view.getByPlaceholderText('Senha'), 'Password1');
		fireEvent.changeText(view.getByPlaceholderText('Confirme sua senha'), 'Password1');
		await act(async () => fireEvent.press(view.getByText('Pronto')));
		expect(alert).toHaveBeenCalledWith('Erro ao criar o usuário');

		const user = { uid: 'passenger-1', name: 'Passenger' };
		mockCreatePassengerBackend.mockResolvedValueOnce({ response: user });
		await act(async () => fireEvent.press(view.getByText('Pronto')));
		await waitFor(() => expect(nav.navigate).toHaveBeenCalledWith('ChooseTypeOfVehicle', { user }));
		fireEvent.press(view.getAllByText('Entrar').at(-1));
		expect(nav.navigate).toHaveBeenCalledWith('Login');
	});

	test('validates and creates a company account', async () => {
		const nav = navigation();
		const view = render(<RegisterCompany navigation={nav} />);
		fireEvent.press(view.getAllByText('Entrar').at(-1));
		expect(nav.navigate).toHaveBeenCalledWith('Login');
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('Dados inválidos, verifique-os e tente novamente!');

		const fill = (values) => {
			Object.entries(values).forEach(([placeholder, value]) =>
				fireEvent.changeText(view.getByPlaceholderText(placeholder), value)
			);
		};
		fill({
			'Nome da empresa': 'Company',
			CNPJ: '04252011000110',
			Email: 'company@example.com',
			Senha: 'Password1',
			'Confirme sua senha': 'Different1',
		});
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('As senhas não conferem!');

		fill({ Email: 'invalid' });
		fireEvent.changeText(view.getByPlaceholderText('Confirme sua senha'), 'Password1');
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('E-mail inválido!');

		fill({ Email: 'company@example.com', Senha: 'weak', 'Confirme sua senha': 'weak' });
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith(
			'A senha deve conter oito caracteres, pelo menos uma letra maiúscula, minúscula e um número!'
		);

		fill({ Senha: 'Password1', 'Confirme sua senha': 'Password1', CNPJ: '123' });
		fireEvent.press(view.getByText('Pronto'));
		expect(alert).toHaveBeenCalledWith('CNPJ inválido! O CNPJ deve conter apenas numeros!');

		fill({ CNPJ: '04252011000110' });
		mockCreateCompanyBackend.mockResolvedValueOnce({ error: new Error('failed') });
		await act(async () => fireEvent.press(view.getByText('Pronto')));
		expect(alert).toHaveBeenCalledWith('Erro ao criar o usuário');

		const user = { uid: 'company-1', name: 'Company' };
		mockCreateCompanyBackend.mockResolvedValueOnce({ response: user });
		await act(async () => fireEvent.press(view.getByText('Pronto')));
		await waitFor(() => expect(nav.navigate).toHaveBeenCalledWith('MapCompany', { user }));
	});
});
