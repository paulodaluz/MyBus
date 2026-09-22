export function hasCoordinates(value) {
	return (
		!!value &&
		Number.isFinite(value.latitude) &&
		Number.isFinite(value.longitude) &&
		Math.abs(value.latitude) <= 90 &&
		Math.abs(value.longitude) <= 180
	);
}

export function selectVehicleLocations(locations, plates = []) {
	const vehicles = new Map();
	for (const company of Object.values(locations || {})) {
		if (!company) {
			continue;
		}
		for (const plate of plates) {
			if (hasCoordinates(company[plate])) {
				vehicles.set(plate, { ...company[plate], registration_plate: plate });
			}
		}
	}
	return [...vehicles.values()];
}
