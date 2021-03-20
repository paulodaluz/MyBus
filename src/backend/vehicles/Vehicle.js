import { getAllVehicles } from '../../service/VehicleService';

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
};
