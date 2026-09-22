import * as Notifications from 'expo-notifications';

export const notificationHandler = async () => ({
	shouldShowBanner: true,
	shouldShowList: true,
	shouldPlaySound: true,
	shouldSetBadge: false,
});
Notifications.setNotificationHandler({ handleNotification: notificationHandler });

export async function scheduleVehicleReminder() {
	await Notifications.setNotificationChannelAsync('reminders', {
		name: 'Lembretes',
		importance: Notifications.AndroidImportance.DEFAULT,
	});
	let permission = await Notifications.getPermissionsAsync();
	if (permission.status !== 'granted') {
		permission = await Notifications.requestPermissionsAsync();
	}
	if (permission.status !== 'granted') {
		throw new Error('Permissão de notificações negada.');
	}
	return Notifications.scheduleNotificationAsync({
		content: {
			title: 'Lembrete do MyBus',
			body: 'Abra o mapa para conferir a localização do veículo.',
			sound: true,
		},
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
			seconds: 60,
			repeats: false,
			channelId: 'reminders',
		},
	});
}
export const cancelVehicleReminder = (id) => Notifications.cancelScheduledNotificationAsync(id);
