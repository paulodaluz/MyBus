const axios = require('axios');

export const registerAppFeedback = async (nameSender, emailSender, feedback) => {
	const body = {nameSender, emailSender, feedback};

	await axios.post(`${process.env.URL_BACKEND}/my-bus/v1/feedback/app`, body)
		.catch(function (error) {
			console.log(`[FeedbackService] - registerAppFeedback - ERROR = ${error}`);

			throw error;
		});

	return;
}
