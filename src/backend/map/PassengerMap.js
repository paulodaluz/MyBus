import { getAllBusStations } from '../../service/BusStationsService';

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
