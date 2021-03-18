import { saveFeedback } from '../../service/CompanyFeedback';
import { getPassenger } from '../users/Passenger';

export async function saveCompanyFeedbackBackend(uid, vehicleId='', vehicleName, feedback) {
	if(vehicleId) {
		// TODO buscar o nome do veículo
	}
	let opinion = { vehicle_name: vehicleName, feedback };

	if(vehicleId) Object.assign(opinion, {id_vehicle: vehicleId});

	const user = await getPassenger(uid);

	opinion.email = user.email;

	if(user.name)	opinion.name_person = user.name;

	console.log('bola', opinion);
	await saveFeedback(opinion);

	return ({ response: "Feedback Registrado com Sucesso!" });
};
