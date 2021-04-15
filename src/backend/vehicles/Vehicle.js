import { getAllCompanies } from '../../service/CompanyService';
import { getAllUsers, updateUser } from '../../service/PassengerService';
import { deleteVehicleFunctions, getAllFunctionsVehicles, saveFunctionsVehicle, updateFunctionsVehicle } from '../../service/VehicleFunctionsService';
import { getAllVehicles, saveVehicle, updateVehicle, deleteVehicle } from '../../service/VehicleService';
import { removeVehicleInCompany } from '../users/Company';
import { generateRandomPassword, mountBodyToFirebase } from '../utils/Utils';

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
	let user;
	let userVehicles;

	const [allUsers, allCompanies] = await Promise.all([getAllUsers(), getAllCompanies()]);

	const passenger = allUsers.find((oneUser) => oneUser.uid === uid);
	const company = allCompanies.find((oneCompany) => oneCompany.uid === uid);

	if(passenger) {
		user = passenger;
	}

	if(company) {
		user = company;
	}

	const allVehicles = await getAllVehicles();

	// passenger
	if(user.isPassenger) {
		userVehicles = user.codes_private_vehicles.filter(vehicleCode => {
			return allVehicles.filter(userVehicle =>  userVehicle.id_to_passagers === vehicleCode);
		});

		userVehicles.forEach(vehicleCode => {

			allVehicles.forEach(vehicle => {
				if(vehicle.id_to_passagers === vehicleCode || vehicle.registration_plate === vehicleCode) {
					myVehicles.push(vehicle)
				}
			});

		});

		return myVehicles;
	}

	userVehicles = user.linked_vehicles.filter(vehicleCode => {
		return allVehicles.filter(userVehicle =>  userVehicle.id_to_share_localization === vehicleCode);
	});

	userVehicles.forEach(vehicleCode => {
		allVehicles.forEach(vehicle => {
			if(vehicle.id_to_share_localization === vehicleCode) {
				myVehicles.push(vehicle)
			}
		});

	});

	return myVehicles;
}

export async function deleteVehicleFromAllDatabases(completeUser, idToPassengersToRemove, vehiclePlateToRemove) {
	const [allVehicleFunctions, allVehicles, allUsers] = await Promise.all([getAllFunctionsVehicles(), getAllVehicles(), getAllUsers()]);

	// remover da tabela do usuário passageiro
	allUsers.map(async user => {
		const isThereCodeToRemove = user.codes_private_vehicles.includes(idToPassengersToRemove);

		if(isThereCodeToRemove) {
			await deleteVehicleFromUser(user, idToPassengersToRemove);
		}
	});

	// remover o veiculo da tabela da empresa
	await removeVehicleInCompany(completeUser.uid, vehiclePlateToRemove);

	// remover o veiculo da tabela de funções
	const vehicleFunctionsToRemove = allVehicleFunctions.find((vehicleFunctions) => vehicleFunctions.registration_plate === vehiclePlateToRemove);

	await deleteVehicleFunctions(vehicleFunctionsToRemove.id);

	// remover o veiculo da tabela de veiculos
	const vehicleToRemove = allVehicles.find((vehicle) => vehicle.registration_plate === vehiclePlateToRemove);

	await deleteVehicle(vehicleToRemove.id);

	return ({ response: "Veículo Removido com Sucesso." });
}

export async function deleteVehicleFromUser(completeUser, idToPassengersToRemove) {
	let allVehicleCodes = [];

	allVehicleCodes = completeUser.codes_private_vehicles.filter(vehicleCode => vehicleCode !== idToPassengersToRemove)

	const infosToUpdate = mountBodyToFirebase({vehicleCode: allVehicleCodes});

	const addAtrybuteOnFirestoreUser = await updateUser(completeUser.id, infosToUpdate);

	if(addAtrybuteOnFirestoreUser && addAtrybuteOnFirestoreUser.error)
		return addAtrybuteOnFirestoreUser.error;

	return ({ response: "Usuário Atualizado com Sucesso." });
}
