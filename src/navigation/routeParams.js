import { getUserOnFirebase } from '../backend/Login';
import { getVehicle, getVehicleFunction } from '../backend/vehicles/Vehicle';

export const publicRoutes = [
	'InitialPage',
	'Login',
	'ForgotMyPassword',
	'RegisterPassenger',
	'RegisterCompany',
	'LoginDriver',
];
export const parameterlessRoutes = [...publicRoutes, 'SettingsPassenger', 'SettingsCompany'];
const userRoutes = ['MapPassenger', 'MapCompany', 'ChooseTypeOfVehicle'];
const vehicleRoutes = [
	'AskShowVehicleCode',
	'ShowVehicleCode',
	'AskPointsVehicleWillPass',
	'ChoicePointsVehicleWillPass',
];

// Pages may still use domain objects internally. The navigator stores identifiers only.
export function normalizeRouteParams(params = {}) {
	const result = {};
	for (const key of [
		'uid',
		'registrationPlate',
		'registration_Plate',
		'vehicleRegistration',
		'status',
		'backPage',
	]) {
		if (typeof params[key] === 'string') {
			result[key] = params[key];
		}
	}
	const uid = params.user?.uid || params.company?.uid;
	const plate = params.vehicle?.registration_plate || params.receivedVehicle?.registration_plate;
	if (uid) {
		result.uid = uid;
	}
	if (plate) {
		result.registrationPlate = plate;
	}
	return result;
}

export function validRouteParams(name, params) {
	if (parameterlessRoutes.includes(name)) {
		return true;
	}
	if (!params || typeof params.uid !== 'string' || !params.uid.trim()) {
		return false;
	}
	const plateKey = ['EditVehicle', 'SettingsDriver'].includes(name)
		? 'registration_Plate'
		: 'registrationPlate';
	if (
		[
			...vehicleRoutes,
			'MapDriver',
			'ListVehicleInfosPassenger',
			'ListVehicleInfosCompany',
			'EditVehicle',
			'SettingsDriver',
		].includes(name)
	) {
		if (typeof params[plateKey] !== 'string' || !params[plateKey].trim()) {
			return false;
		}
	}
	if (params.backPage && !['MapDriver', 'SettingsDriver'].includes(params.backPage)) {
		return false;
	}
	return true;
}

export async function hydrateRouteParams(name, params) {
	if (!validRouteParams(name, params)) {
		throw new Error('Parâmetros de navegação inválidos.');
	}
	if (parameterlessRoutes.includes(name)) {
		return {};
	}
	if (userRoutes.includes(name)) {
		const user = await getUserOnFirebase(params.uid);
		if (!user?.uid) {
			throw new Error('Perfil indisponível.');
		}
		return { ...params, user };
	}
	if (vehicleRoutes.includes(name) || name === 'MapDriver') {
		const vehicle = await getVehicle({ registrationPlate: params.registrationPlate });
		if (!vehicle?.registration_plate) {
			throw new Error('Veículo indisponível.');
		}
		if (name === 'MapDriver') {
			const [company, vehicleFunctions] = await Promise.all([
				getUserOnFirebase(params.uid),
				getVehicleFunction({ registrationPlate: params.registrationPlate }),
			]);
			if (!company?.uid || !vehicleFunctions) {
				throw new Error('Dados do motorista indisponíveis.');
			}
			return { ...params, company, vehicle, vehicleFunctions };
		}
		return { ...params, vehicle };
	}
	if (name === 'EditVehicle') {
		return {
			...params,
			params: {
				uid: params.uid,
				registrationPlate: params.registration_Plate,
				registration_Plate: params.registration_Plate,
			},
		};
	}
	return params;
}
