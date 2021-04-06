import { getAllLocalizationVehicles } from '../../service/MapLocalizationService';

export async function getVehiclesLocalization(vehiclesPlate) {
	const allLocalizations = await getAllLocalizationVehicles();

	const myVehicles = [];

	vehiclesPlate.forEach((vehiclePlate) => {

		for(let index in allLocalizations) {
			if(allLocalizations[index][vehiclePlate]) {
				let vehicle = {registration_plate: vehiclePlate, ...allLocalizations[index][vehiclePlate]}
				myVehicles.push(vehicle);
			}
		}
	})

	return myVehicles;
}
