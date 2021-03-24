import { saveFunctionsVehicle } from '../../service/VehicleFunctionsService';
import { getAllVehicles, saveVehicle } from '../../service/VehicleService';
import { generateRandomPassword } from '../utils/Utils';

export async function createNewVehicle(vehicleInfos) {
	let vehicle = {
		id_to_share_localization: `#${vehicleInfos.registrationPlate.toUpperCase()}`,
		password_to_share_localization: generateRandomPassword(8),
		name: vehicleInfos.name,
		id_to_passagers: `#${generateRandomPassword(6)}`,
		is_public: vehicleInfos.isPublic,
		registration_plate: vehicleInfos.registrationPlate.toUpperCase()
	};

	await saveVehicle(vehicle);

	return {response: "Veiculo cadastrado com sucesso!"};
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

export async function getVehicle({registrationPlate='', name=''}) {
	const allVehicles = await getAllVehicles().catch(error => {
		return ({error});
	});

	if(allVehicles && allVehicles.error)
		return allVehicles.error;

	if(registrationPlate) {
		return allVehicles.find((vehicle) => vehicle.registration_plate === registrationPlate);
	}

	return allVehicles.find((vehicle) => vehicle.name.toLowerCase().includes(name.toLowerCase()));
}
