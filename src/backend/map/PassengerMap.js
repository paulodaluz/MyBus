import { getAllBusStations } from '../../service/BusStationsService';

export async function getBusStopsLocalzations(vehicles) {
	const myBusStops = [];

	const allBusStops = await getAllBusStations();

	vehicles.map((vehicle) => {
		let existsBusStop = allBusStops.find(
			(busStop) => busStop.vehiclePlate === vehicle.registration_plate
		);

		if (existsBusStop) {
			existsBusStop.busPoints.forEach((busStop) => {
				busStop.vehicle_plate = existsBusStop.vehiclePlate;
				myBusStops.push(busStop);
			});
		}
	});

	return myBusStops;
}
