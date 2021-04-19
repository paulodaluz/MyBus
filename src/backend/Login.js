import { loadStorage, removeStorage, saveStorage } from '../service/AsyncStorage';
import { getCompany } from './users/Company';
import { getPassenger } from './users/Passenger';

export async function getUserOnFirebase(uid) {
	const passenger = await getPassenger(uid);

	if (passenger) {
		return passenger;
	}

	const company = await getCompany(uid);

	if (company) {
		return company;
	}
}

export async function driverLoginIsValid(registrationPlate, password, allVehicles) {
	const vehicleDriver = allVehicles.find(
		(vehicle) => vehicle.registration_plate === registrationPlate
	);

	if (vehicleDriver) {
		return vehicleDriver.password_to_share_localization === password;
	}
	return false;
}

export async function createSession(uid) {
	await saveStorage('uid', uid);
	return;
}

export async function getSession() {
	const uid = await loadStorage('uid');
	if (uid) {
		return uid;
	}
	return;
}

export async function removeSession() {
	await removeStorage('uid');
	return;
}
