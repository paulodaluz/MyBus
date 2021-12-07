import axios from 'axios';
import { User } from '../interfaces/UserInterface';

export const registerUser = async (
	email: string,
	name: string,
	isPassenger: boolean,
	uid: string,
	linkedVehicles: Array<string>,
	cnpj?: string
): Promise<void> => {
	const body = { email, name, isPassenger, uid, linkedVehicles };

	if (cnpj) {
		Object.assign(body, { cnpj });
	}

	await axios
		.post(`${process.env.URL_BACKEND}/my-bus/v1/feedback/app`, body)
		.catch(function (error: any) {
			console.log(`[UserService] - registerUser - ERROR = ${error}`);

			throw error;
		});

	return;
};

export const getUser = async (uid: string): Promise<User> => {
	const response = await axios
		.get(`${process.env.URL_BACKEND}/my-bus/v1/user/get-user-info/${uid}`)
		.catch(function (error: any) {
			console.log(`[UserService] - getUser - ERROR = ${error}`);

			throw error;
		});

	return response.data;
};
