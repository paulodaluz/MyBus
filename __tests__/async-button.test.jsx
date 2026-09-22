import { Alert, TouchableOpacity } from 'react-native';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { WideButton } from '../src/components/WideButton';
test('async actions expose loading, prevent duplicates and allow retry after failure', async () => {
	const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
	let reject;
	const action = jest.fn(
		() =>
			new Promise((resolve, failed) => {
				reject = failed;
			})
	);
	const view = render(<WideButton textButton="Submit" onPress={action} />);
	const press = view.UNSAFE_getByType(TouchableOpacity).props.onPress;
	await act(async () => {
		press();
		press();
	});
	expect(action).toHaveBeenCalledTimes(1);
	expect(view.getByRole('button').props.accessibilityState).toEqual({ busy: true, disabled: true });
	act(() => view.UNSAFE_getByType(TouchableOpacity).props.onPress());
	await act(async () => reject(new Error('offline')));
	expect(alert).toHaveBeenCalled();
	action.mockResolvedValueOnce('ok');
	await act(async () => fireEvent.press(view.getByText('Submit')));
	expect(view.getByRole('button').props.accessibilityState.busy).toBe(false);
	action.mockImplementationOnce(() => {
		throw new Error('sync failure');
	});
	fireEvent.press(view.getByText('Submit'));
	expect(alert).toHaveBeenCalledTimes(2);
	action.mockReturnValueOnce(1);
	fireEvent.press(view.getByText('Submit'));
	alert.mockRestore();
});
test('does not update an unmounted button after pending work settles', async () => {
	let done;
	const action = jest.fn(
		() =>
			new Promise((resolve) => {
				done = resolve;
			})
	);
	const view = render(<WideButton textButton="Submit" onPress={action} />);
	fireEvent.press(view.getByText('Submit'));
	await waitFor(() => expect(action).toHaveBeenCalled());
	view.unmount();
	await act(async () => done());
});
