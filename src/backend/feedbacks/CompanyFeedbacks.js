import { getAllFeedbacks, saveFeedback } from '../../service/CompanyFeedbackService';
import { getCompany } from '../users/Company';
import { getPassenger } from '../users/Passenger';
import { getVehicle } from '../vehicles/Vehicle';

export async function saveCompanyFeedbackBackend(uid, vehicle = '', vehicleName, feedback) {
	const user = await getPassenger(uid);

	let vehicleInfos;

	if (vehicle) {
		vehicleInfos = vehicle;
	}

	if (!vehicle) {
		vehicleInfos = await getVehicle({ name: vehicleName });
	}

	let opinion = {
		email_sender: user.email,
		vehicle_name: vehicleInfos.name,
		vehicle_registration_plate: vehicleInfos.registration_plate,
		feedback,
	};

	if (user.name) {
		opinion.name_sender = user.name;
	}

	await saveFeedback(opinion);

	return { response: 'Feedback Registrado com Sucesso!' };
}

export async function getCompanyFeedbackBackend(uidCompany) {
	let feedbacksForThisCompany = [];

	const company = await getCompany(uidCompany);

	const vehiclesRegistration = company.linked_vehicles;

	const allFeedbacks = await getAllFeedbacks();

	if (!vehiclesRegistration) {
		return [];
	}

	vehiclesRegistration.forEach((vehicleRegistration) => {
		const companyFeedbacks = allFeedbacks.filter(
			(feedback) => feedback.vehicle_registration_plate === vehicleRegistration
		);
		feedbacksForThisCompany = feedbacksForThisCompany.concat(companyFeedbacks);
	});

	return feedbacksForThisCompany;
}
