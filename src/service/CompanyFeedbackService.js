import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const saveFeedback = async (feedback) => {
	return await addDoc(collection(db, 'opinions_vehicle'), feedback)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`CompanyFeedbackService - saveFeedback - ERROR = ${error}`);
			return error;
		});
};

export const getAllFeedbacks = async () => {
	let feedbacks = [];
	const snapshot = await getDocs(collection(db, 'opinions_vehicle'));
	snapshot.forEach((document) => {
		let feedback = document.data();
		feedback.id = document.id;
		feedbacks.push(feedback);
	});

	return feedbacks;
};
