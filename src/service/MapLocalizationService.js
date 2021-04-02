import * as firebase from "firebase";
const databaseName = 'real_time_database';

export const registerRealTimeLocalVehicle = (vehicleUid, vehicleRegistrationPlate) => {
  firebase.database().ref(`/${databaseName}/${vehicleUid}/${vehicleRegistrationPlate}`).set({
    latitude: '-28.2660607',
    logitude: '-52.4155144',
		status: 'Operando Normalmente'
  });
}

export const getLocalizationVehicle = (vehicleUid, vehicleRegistrationPlate) => {
	return new Promise((resolve, reject) => {
		firebase
			.database()
			.ref(`/${databaseName}/${vehicleUid}/${vehicleRegistrationPlate}`)
			.on('value', snapchot => {
					let dados = snapchot.val()
					if (dados) {
						resolve(dados);
					} else {
						resolve({});
					}
			})
	})
}
