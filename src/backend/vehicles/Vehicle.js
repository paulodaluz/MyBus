import { getAllFunctionsVehicles, saveFunctionsVehicle, updateFunctionsVehicle } from '../../service/VehicleFunctionsService';
import { getAllVehicles, saveVehicle, updateVehicle, deleteVehicle } from '../../service/VehicleService';
import { getUserOnFirebase } from '../Login';
import { generateRandomPassword } from '../utils/Utils';

export async function createNewVehicle(vehicleInfos) {
	let vehicle = {
		id_to_share_localization: `${vehicleInfos.registrationPlate.toUpperCase()}`,
		password_to_share_localization: generateRandomPassword(9),
		name: vehicleInfos.name,
		id_to_passengers: `#${generateRandomPassword(6)}`,
		is_public: vehicleInfos.isPublic,
		registration_plate: vehicleInfos.registrationPlate.toUpperCase()
	};

	await saveVehicle(vehicle);

	return {response: vehicle};
}

export async function editVehicle(vehicleId, vehicleInfos, vehicleFunctionsId, functionsVehicleInfos) {
	let vehicle = {
		id_to_share_localization: `#${vehicleInfos.registrationPlate.toUpperCase()}`,
		name: vehicleInfos.name,
		is_public: vehicleInfos.isPublic,
		registration_plate: vehicleInfos.registrationPlate.toUpperCase()
	};

	let functionsVehicle = {
		wifi: functionsVehicleInfos.thereIsWifi,
		air_conditioning: functionsVehicleInfos.thereIsAirConditioning,
		washrooms: functionsVehicleInfos.thereIsBathroom,
		suport_wheelchair: functionsVehicleInfos.thereIsWheelchairSupport,
		price_transport: functionsVehicleInfos.price,
		registration_plate: functionsVehicleInfos.registrationPlate.toUpperCase()
	};

	await Promise.all([updateVehicle(vehicleId, vehicle),
		updateFunctionsVehicle(vehicleFunctionsId, functionsVehicle)])

	return {response: Object.assign(vehicle, functionsVehicle)};
}


export async function getVehicle({registrationPlate='', name='', idToPassengers=''}) {
	const allVehicles = await getAllVehicles().catch(error => {
		return ({error});
	});

	if(allVehicles && allVehicles.error)
		return allVehicles.error;

	if(registrationPlate) {
		return allVehicles.find((vehicle) => vehicle.registration_plate === registrationPlate);
	}

	if(idToPassengers) {
		return allVehicles.find((vehicle) => vehicle.id_to_passagers === idToPassengers);
	}

	return allVehicles.find((vehicle) => vehicle.name.toLowerCase().includes(name.toLowerCase()));
}

export async function addFunctionsToVehicle(newVehicleFunctions) {
	let functionsVehicle = {
		wifi: newVehicleFunctions.thereIsWifi,
		air_conditioning: newVehicleFunctions.thereIsAirConditioning,
		washrooms: newVehicleFunctions.thereIsBathroom,
		suport_wheelchair: newVehicleFunctions.thereIsWheelchairSupport,
		price_transport: newVehicleFunctions.price,
		registration_plate: newVehicleFunctions.registrationPlate.toUpperCase()
	};

	await saveFunctionsVehicle(functionsVehicle);

	return { response: "Funções do veículo cadastradas com sucesso!" };
}

export async function getVehicleFunction({registrationPlate=''}) {
	const allVehicleFunctions = await getAllFunctionsVehicles().catch(error => {
		return ({error});
	});

	if(allVehicleFunctions && allVehicleFunctions.error)
		return allVehicleFunctions.error;

	return allVehicleFunctions.find((vehicleFunctions) => vehicleFunctions.registration_plate === registrationPlate);
}

export async function getMyVehicles(uid) {
	let myVehicles = [];
	const [user, allVehicles] = await Promise.all([getUserOnFirebase(uid), getAllVehicles()]);

	// passenger
	if(user.isPassenger) {
		const userVehicles = user.codes_private_vehicles.filter(vehicleCode => {
			return allVehicles.filter(userVehicle =>  userVehicle.id_to_passagers === vehicleCode);
		});

		userVehicles.forEach(vehicleCode => {

			allVehicles.forEach(vehicle => {
				if(vehicle.id_to_passagers === vehicleCode) {
					myVehicles.push(vehicle)
				}
			});

		});
	}


	return myVehicles;
}
