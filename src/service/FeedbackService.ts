import axios from 'axios';

export const registerAppFeedback = async (
	nameSender: string,
	emailSender: string,
	feedback: string
): Promise<void> => {
	const body = { nameSender, emailSender, feedback };

	await axios
		.post(`${process.env.URL_BACKEND}/my-bus/v1/feedback/app`, body)
		.catch(function (error: any) {
			console.log(`[FeedbackService] - registerAppFeedback - ERROR = ${error}`);

			throw error;
		});

	return;
};

export const registerVehicleFeedback = async (
	nameSender: string,
	emailSender: string,
	feedback: string,
	vehicleName: string,
	vehicleRegistrationPlate?: string
): Promise<void> => {
	const body = { nameSender, emailSender, feedback, vehicleName };

	if (vehicleRegistrationPlate) Object.assign(body, { vehicleRegistrationPlate });

	await axios
		.post(`${process.env.URL_BACKEND}/my-bus/v1/feedback/vehicle`, body)
		.catch(function (error: any) {
			console.log(`[FeedbackService] - registerVehicleFeedback - ERROR = ${error}`);

			throw error;
		});

	return;
};
