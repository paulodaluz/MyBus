import axios from 'axios';
import { Vehicle } from '../interfaces/VehicleInterface';

export const getVehicle = async (registrationPlate: string): Promise<Vehicle> => {
	const response = await axios
		.get(`${process.env.URL_BACKEND}/my-bus/v1/vehicles/get-vehicle-info/${registrationPlate}`)
		.catch(function (error: any) {
			console.log(`[VehicleService] - getVehicle - ERROR = ${error}`);

			throw error;
		});

	return response.data;
};

export const getVehiclesInfos = async (
	registrationPlates: Array<string>
): Promise<Array<Vehicle>> => {
	const body = {
		registrationPlates,
	};

	const response = await axios
		.post(`${process.env.URL_BACKEND}/my-bus/v1/vehicles/get-vehicles-infos`, body)
		.catch(function (error: any) {
			console.log(`[VehicleService] - getVehiclesInfos - ERROR = ${error}`);

			throw error;
		});

	return response.data;
};
