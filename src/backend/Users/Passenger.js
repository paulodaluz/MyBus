import * as authService from '../../service/AuthService';
import { saveUser, updateUser, getAllUsers } from '../../service/PassengerService';
import { mountBodyToFirebase } from '../utils/Utils';

export async function createPassengerBackend(email, password, name) {
    let user = {email, name};

    const registeredAuthenticationUser = await authService.register(email, password).catch(error => {
        return ({error});
    });

    if(registeredAuthenticationUser.error)
        return registeredAuthenticationUser;

		user.uid = registeredAuthenticationUser.user.uid;

		const registeredOnFirestoreUser = await saveUser({ email, name, uid: registeredAuthenticationUser.user.uid, isPassenger: true }).catch(error => {
				return ({error});
		});

		user.id = registeredOnFirestoreUser._delegate._key.path.segments.find(segment => segment !== 'passengers');

    if(registeredOnFirestoreUser.error)
        return registeredOnFirestoreUser;

    return ({ response: user });
}

export async function getPassenger(uid) {
	const allUsers = await getAllUsers().catch(error => {
		return ({error});
	});

	if(allUsers && allUsers.error)
		return allUsers.error;

	const passenger = allUsers.find((user) => user.uid === uid);

	return passenger;
}

export async function updateUserAllInfos(id, name = '', cpf = '', bornDate = '', typeOfVehicleListed = '') {
	const infosToUpdate = mountBodyToFirebase({ name, cpf, bornDate, typeOfVehicleListed });

	const addAtrybuteOnFirestoreUser = await updateUser(id, infosToUpdate).catch(error => {
			console.log(`changeTypeOfVehicleToList - addAtrybuteOnFirestoreUser - ERROR = ${error}`);
			return ({error});
	});

	if(addAtrybuteOnFirestoreUser && addAtrybuteOnFirestoreUser.error)
			return addAtrybuteOnFirestoreUser.error;

	return ({ response: "Usuário Atualizado com Sucesso." })
}

export async function addNewPrivateVehicle(uid, newVehicleCode) {
	let allVehicleCodes = [];

	const completeUser = await getPassenger(uid);

	allVehicleCodes.push(newVehicleCode);

	if(completeUser.codes_private_vehicles && completeUser.codes_private_vehicles.length > 0) {
		allVehicleCodes = allVehicleCodes.concat(completeUser.codes_private_vehicles);
	}

	const infosToUpdate = mountBodyToFirebase({vehicleCode: allVehicleCodes});

	const addAtrybuteOnFirestoreUser = await updateUser(completeUser.id, infosToUpdate).catch(error => {
		console.log(`changeTypeOfVehicleToList - addAtrybuteOnFirestoreUser - ERROR = ${error}`);
		return ({error});
	});

	if(addAtrybuteOnFirestoreUser && addAtrybuteOnFirestoreUser.error)
		return addAtrybuteOnFirestoreUser.error;

	return ({ response: "Usuário Atualizado com Sucesso." });
}

export async function removePrivateVehicle(uid, idToPassengers) {
	let allVehicleCodes = [];

	const completeUser = await getPassenger(uid);

	allVehicleCodes = completeUser.codes_private_vehicles.filter(vehicleCode => vehicleCode !== idToPassengers)

	const infosToUpdate = mountBodyToFirebase({vehicleCode: allVehicleCodes});

	const addAtrybuteOnFirestoreUser = await updateUser(completeUser.id, infosToUpdate).catch(error => {
		console.log(`removePrivateVehicle - ERROR = ${error}`);
		return ({error});
	});

	if(addAtrybuteOnFirestoreUser && addAtrybuteOnFirestoreUser.error)
		return addAtrybuteOnFirestoreUser.error;

	return ({ response: "Usuário Atualizado com Sucesso." });
}
