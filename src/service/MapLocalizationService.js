import * as firebase from "firebase";
const databaseName = 'real_time_database';

export const registerRealTimeLocalVehicle = (vehicleUid, vehicleRegistrationPlate) => {
  firebase.database().ref(`/${databaseName}/vehicleUid/EXT`).set({
    latitude: '-28.2660607',
    longitude: '-52.4155144',
		status: 'Operando Normalmente'
  });
}

export const getLocalizationVehicles = (companyUid) => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref(`/${databaseName}/${companyUid}`)
			.on('value', snapchot => {
					let dados = snapchot.val()
					if (dados) {
						resolve(dados);
					} else {
						resolve(undefined);
					}
			})
	})
}
