import * as firebase from "firebase";
const databaseName = 'real_time_database';

export const registerRealTimeLocalVehicle = (accessDatabase, infosVehicle) => {
  firebase.database().ref(`/${databaseName}/${accessDatabase.companyUid}/${accessDatabase.vehiclePlate}`)
		.set({
			latitude: infosVehicle.latitude,
			longitude: infosVehicle.longitude,
			status: infosVehicle.status
		});
}

export const getLocalizationVehicles = (companyUid) => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref(`/${databaseName}/${companyUid}`)
			.on('value', snapchot => {
				let dados = snapchot.val();
				if (dados) {
					return resolve(dados);
				}
				console.log(`MapLocalizationService - getLocalizationVehicles - ERROR = ${error}`);
				return resolve(undefined);
			})
	})
}

export const getAllLocalizationVehicles = () => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref(`/${databaseName}`)
			.on('value', snapchot => {
				let dados = snapchot.val();
				if (dados) {
					return resolve(dados);
				}
				console.log(`MapLocalizationService - getAllLocalizationVehicles - ERROR = ${error}`);
				return resolve(undefined);
			})
	})
}

export const getSpecificVehicle = (companyUid, vehiclePlate) => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref(`/${databaseName}/${companyUid}/${vehiclePlate}`)
			.on('value', snapchot => {
				let dados = snapchot.val();
				if (dados) {
					return resolve(dados);
				}
				console.log(`MapLocalizationService - getSpecificVehicle - ERROR = ${error}`);
				return resolve(undefined);
			})
	})
}
