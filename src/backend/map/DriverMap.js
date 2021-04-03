import { registerRealTimeLocalVehicle } from "../../service/MapLocalizationService";

export async function sendLocalizationToFirebase(accessDatabase, infosVehicle) {
	registerRealTimeLocalVehicle(accessDatabase, infosVehicle);

	return;
}
