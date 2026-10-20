import { collection, addDoc } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const saveFeedback = async (feedback) => {
	return await addDoc(collection(db, 'opinions_app'), feedback)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`MyBusFeedback - saveFeedback - ERROR = ${error}`);
			return error;
		});
};
