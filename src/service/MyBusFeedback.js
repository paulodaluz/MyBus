import { db } from '../database/FirebaseConfiguration';

export const saveFeedback = async (feedback) => {
	return await db
		.collection('opinions_app')
		.add(feedback)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`MyBusFeedback - saveFeedback - ERROR = ${error}`);
			return error;
		});
};
