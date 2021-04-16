import { getAllBusStations } from '../../service/BusStationsService';
import { getLocalizationVehicles } from '../../service/MapLocalizationService';
import { getAllVehicles } from '../../service/VehicleService';

export async function getVehiclesInfos(companyVehiclesPlate) {
	let companyVehiclesInfos = [];

	const allVehicles = await getAllVehicles();

	companyVehiclesPlate.map((companyVehiclePlate) => {
		let existsVehicle = allVehicles.find(
			(vehicle) => vehicle.registration_plate == companyVehiclePlate
		);

		if (existsVehicle) {
			companyVehiclesInfos.push(existsVehicle);
		}
	});

	return companyVehiclesInfos;
}

export async function getVehiclesLocalization(userUid, vehicles) {
	if (!vehicles.length) {
		return [];
	}

	let completeVehicles = [];

	const realtimeInfos = await getLocalizationVehicles(userUid);

	vehicles.map((vehicle) => {
		let realtimeInfosVehicle = realtimeInfos[vehicle.registration_plate];

		let oneVehicle = vehicle;

		oneVehicle.coordinate = {
			latitude: realtimeInfosVehicle.latitude,
			longitude: realtimeInfosVehicle.longitude,
		};
		oneVehicle.status = realtimeInfosVehicle.status;

		completeVehicles.push(oneVehicle);
	});

	return completeVehicles;
}

export async function getBusStopsLocalzations(vehicles) {
	const myBusStops = [];

	const allBusStops = await getAllBusStations();
	vehicles.forEach((vehicle) => {
		let existsBusStop = allBusStops.find(
			(busStop) => busStop.vehicle_plate === vehicle.registration_plate
		);
		if (existsBusStop) {
			myBusStops.push(existsBusStop);
		}
	});

	return myBusStops;
}
