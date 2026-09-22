import { useEffect } from 'react';
import { cancelVehicleReminder, scheduleVehicleReminder } from '../service/NotificationService';

export function useVehicleReminder(enabled, onError) {
	useEffect(() => {
		if (!enabled) {
			return;
		}
		let cancelled = false;
		let identifier;
		scheduleVehicleReminder()
			.then(async (id) => {
				if (cancelled) {
					await cancelVehicleReminder(id);
				} else {
					identifier = id;
				}
			})
			.catch(onError);
		return () => {
			cancelled = true;
			if (identifier) {
				cancelVehicleReminder(identifier).catch(onError);
			}
		};
	}, [enabled, onError]);
}
