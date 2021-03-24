export function mountBodyToFirebase({typeOfVehicleListed, name, vehicleCode, bornDate, cpf}) {
	const infosToUpdate = {};

	if(vehicleCode) Object.assign(infosToUpdate, {codes_private_vehicles: vehicleCode});

	if(name) Object.assign(infosToUpdate, {name});

	if(typeOfVehicleListed) Object.assign(infosToUpdate, {type_of_vehicle_listed: typeOfVehicleListed});

	if(bornDate) Object.assign(infosToUpdate, {born_date: bornDate});

	if(cpf) Object.assign(infosToUpdate, {cpf});

	return infosToUpdate;
}

export function generateRandomPassword(length) {
	/* var password = generator.generate({
		length,
		numbers: true,
		uppercase: true
	});

	return password; */
	return 'HB1F5^OP@qC^';
}
