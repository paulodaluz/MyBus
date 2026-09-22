import { act, renderHook } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useLogout } from '../src/hooks/useLogout';
import { logout } from '../src/service/AuthService';
jest.mock('../src/service/AuthService', () => ({ logout: jest.fn() }));

test('logout prevents duplicate requests and supports retry after failure', async () => {
	const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
	const navigation = { reset: jest.fn() };
	let reject;
	logout.mockReturnValueOnce(
		new Promise((resolve, rejectRequest) => {
			reject = rejectRequest;
		})
	);
	const { result } = renderHook(() => useLogout(navigation));
	let pending;
	await act(async () => {
		pending = result.current();
		await result.current();
	});
	expect(logout).toHaveBeenCalledTimes(1);
	await act(async () => {
		reject(new Error('offline'));
		await pending;
	});
	expect(alert).toHaveBeenCalled();
	expect(navigation.reset).not.toHaveBeenCalled();
	logout.mockResolvedValueOnce(undefined);
	await act(async () => result.current());
	expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'InitialPage' }] });
	alert.mockRestore();
});
