import { get, onValue, ref, set } from 'firebase/database';
import { realtimeDb } from '../database/FirebaseConfiguration';
const databaseName = 'real_time_database';

export const registerRealTimeLocalVehicle = (accessDatabase, infosVehicle) =>
	set(
		ref(realtimeDb, `/${databaseName}/${accessDatabase.companyUid}/${accessDatabase.vehiclePlate}`),
		{
			latitude: infosVehicle.latitude,
			longitude: infosVehicle.longitude,
			status: infosVehicle.status,
		}
	);

const readLocation = async (path) => {
	const snapshot = await get(ref(realtimeDb, path));
	return snapshot.val() || undefined;
};
export const getLocalizationVehicles = (companyUid) =>
	readLocation(`/${databaseName}/${companyUid}`);
export const getAllLocalizationVehicles = () => readLocation(`/${databaseName}`);
export const getSpecificVehicle = (companyUid, vehiclePlate) =>
	readLocation(`/${databaseName}/${companyUid}/${vehiclePlate}`);

// The caller owns the subscription and must return this disposer from its effect.
export const subscribeVehicleLocations = (onData, onError) =>
	onValue(ref(realtimeDb, `/${databaseName}`), (snapshot) => onData(snapshot.val()), onError);
