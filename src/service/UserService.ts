import axios from 'axios';

export const registerUser = async (
	email: string,
	name: string,
	isPassenger: boolean,
	uid: string,
	linkedVehicles: Array<string>,
	cnpj?: string
) => {
	const body = { email, name, isPassenger, uid, linkedVehicles };

	if (cnpj) Object.assign(body, { cnpj });

	await axios
		.post(`${process.env.URL_BACKEND}/my-bus/v1/feedback/app`, body)
		.catch(function (error: any) {
			console.log(`[FeedbackService] - registerAppFeedback - ERROR = ${error}`);

			throw error;
		});

	return;
};
