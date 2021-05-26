export function mountBodyToFirebase({ typeOfVehicleListed, name, vehicleCode, bornDate, cpf }) {
	const infosToUpdate = {};

	if (vehicleCode) {
		Object.assign(infosToUpdate, { codes_private_vehicles: vehicleCode });
	}

	if (name) {
		Object.assign(infosToUpdate, { name });
	}

	if (typeOfVehicleListed) {
		Object.assign(infosToUpdate, { type_of_vehicle_listed: typeOfVehicleListed });
	}

	if (bornDate) {
		Object.assign(infosToUpdate, { born_date: bornDate });
	}

	if (cpf) {
		Object.assign(infosToUpdate, { cpf });
	}

	return infosToUpdate;
}

export function generateRandomPassword(length) {
	return Math.random().toString(36).slice(-length).toUpperCase();
}

export function isSecurityPassword(password) {
	let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	if (regex.test(password)) {
		return true;
	}

	return false;
}

export function isValidCPF(cpf) {
	if (!Number(cpf)) {
		return false;
	}

	let Soma = 0;
	let Resto;

	if (cpf == '00000000000') {
		return false;
	}

	for (let i = 1; i <= 9; i++) {
		Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	}
	Resto = (Soma * 10) % 11;

	if (Resto == 10 || Resto == 11) {
		Resto = 0;
	}
	if (Resto != parseInt(cpf.substring(9, 10))) {
		return false;
	}

	Soma = 0;
	for (let i = 1; i <= 10; i++) {
		Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	}
	Resto = (Soma * 10) % 11;

	if (Resto == 10 || Resto == 11) {
		Resto = 0;
	}
	if (Resto != parseInt(cpf.substring(10, 11))) {
		return false;
	}
	return true;
}

export function isValidEmail(email) {
	const regex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return regex.test(email);
}

export function isValidCNPJ(cnpj) {
	if (!Number(cnpj)) {
		return false;
	}

	cnpj = cnpj.replace(/[^\d]+/g, '');

	if (cnpj == '') {
		return false;
	}

	if (cnpj.length != 14) {
		return false;
	}

	if (
		cnpj == '00000000000000' ||
		cnpj == '11111111111111' ||
		cnpj == '22222222222222' ||
		cnpj == '33333333333333' ||
		cnpj == '44444444444444' ||
		cnpj == '55555555555555' ||
		cnpj == '66666666666666' ||
		cnpj == '77777777777777' ||
		cnpj == '88888888888888' ||
		cnpj == '99999999999999'
	) {
		return false;
	}

	let tamanho = cnpj.length - 2;
	let numeros = cnpj.substring(0, tamanho);
	let digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}

	let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado != digitos.charAt(0)) {
		return false;
	}

	tamanho = tamanho + 1;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}
	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado != digitos.charAt(1)) {
		return false;
	}

	return true;
}

export function calculateTime(lat1, lon1, lat2, lon2) {
	let dist;

	const unit = 'K';
	if (lat1 == lat2 && lon1 == lon2) {
		return 0;
	} else {
		var radlat1 = (Math.PI * lat1) / 180;
		var radlat2 = (Math.PI * lat2) / 180;
		var theta = lon1 - lon2;
		var radtheta = (Math.PI * theta) / 180;
		dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit == 'K') {
			dist = dist * 1.609344;
		}
		if (unit == 'N') {
			dist = dist * 0.8684;
		}
	}

	const distancia = dist;

	const secondsTime = Number(distancia.toFixed(2)) / 26;

	const minutsTime = secondsTime * 60;

	return Math.floor(minutsTime);
}
