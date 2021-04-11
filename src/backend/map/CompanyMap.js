import { getAllLocalizationVehicles } from '../../service/MapLocalizationService';
import { getAllVehicles } from '../../service/VehicleService';

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

export async function getVehiclesInfos(companyVehiclesPlate) {
	let companyVehiclesInfos = [];

	const allVehicles = await getAllVehicles();

	companyVehiclesPlate.map((companyVehiclePlate) => {
		let existsVehicle = allVehicles.find(vehicle => vehicle.registration_plate == companyVehiclePlate);

		if(existsVehicle) {
			companyVehiclesInfos.push(existsVehicle);
		}
	})

	return companyVehiclesInfos;
}
