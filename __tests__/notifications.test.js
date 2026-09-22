import { act, renderHook } from '@testing-library/react-native';
import * as Notifications from 'expo-notifications';
import { notificationHandler, scheduleVehicleReminder } from '../src/service/NotificationService';
import { useVehicleReminder } from '../src/hooks/useVehicleReminder';
jest.mock('expo-notifications', () => ({
	AndroidImportance: { DEFAULT: 3 },
	SchedulableTriggerInputTypes: { TIME_INTERVAL: 'timeInterval' },
	setNotificationHandler: jest.fn(),
	setNotificationChannelAsync: jest.fn(),
	getPermissionsAsync: jest.fn(),
	requestPermissionsAsync: jest.fn(),
	scheduleNotificationAsync: jest.fn(),
	cancelScheduledNotificationAsync: jest.fn(async () => {}),
}));
beforeEach(() => {
	jest.clearAllMocks();
	Notifications.getPermissionsAsync.mockResolvedValue({ status: 'granted' });
	Notifications.scheduleNotificationAsync.mockResolvedValue('reminder-1');
});
test('uses current handler, channel, trigger and permission APIs', async () => {
	expect(await notificationHandler()).toEqual({
		shouldShowBanner: true,
		shouldShowList: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	});
	await expect(scheduleVehicleReminder()).resolves.toBe('reminder-1');
	expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
		expect.objectContaining({
			trigger: { type: 'timeInterval', seconds: 60, repeats: false, channelId: 'reminders' },
		})
	);
	Notifications.getPermissionsAsync.mockResolvedValue({ status: 'denied' });
	Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
	await expect(scheduleVehicleReminder()).resolves.toBe('reminder-1');
	Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });
	await expect(scheduleVehicleReminder()).rejects.toThrow('Permissão');
});
test('cancels on disable, unmount and a late scheduling response', async () => {
	const error = jest.fn();
	const view = renderHook(({ enabled }) => useVehicleReminder(enabled, error), {
		initialProps: { enabled: false },
	});
	await act(async () => view.rerender({ enabled: true }));
	await act(async () => view.rerender({ enabled: false }));
	expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith('reminder-1');
	let resolve;
	Notifications.scheduleNotificationAsync.mockReturnValueOnce(
		new Promise((done) => {
			resolve = done;
		})
	);
	await act(async () => view.rerender({ enabled: true }));
	view.unmount();
	await act(async () => resolve('late-reminder'));
	expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith('late-reminder');
	Notifications.scheduleNotificationAsync.mockRejectedValueOnce(new Error('unavailable'));
	renderHook(() => useVehicleReminder(true, error));
	await act(async () => {});
	expect(error).toHaveBeenCalledWith(new Error('unavailable'));
});
