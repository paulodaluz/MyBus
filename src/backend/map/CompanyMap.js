import { getLocalizationVehicles } from '../../service/MapLocalizationService';
import { getAllVehicles } from '../../service/VehicleService';

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

export async function getVehiclesLocalization(userUid, vehicles) {
	if(!vehicles.length) {
		return [];
	}

	let completeVehicles = [];

	const realtimeInfos = await getLocalizationVehicles(userUid);

	vehicles.map((vehicle) => {
		let realtimeInfosVehicle = realtimeInfos[vehicle.registration_plate]

		let oneVehicle = vehicle;

		oneVehicle.coordinate = {
			latitude: realtimeInfosVehicle.latitude,
			longitude: realtimeInfosVehicle.longitude
		}
		oneVehicle.status = realtimeInfosVehicle.status;

		completeVehicles.push(oneVehicle);
	})

	return completeVehicles;
}