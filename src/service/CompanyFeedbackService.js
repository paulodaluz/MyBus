import { db } from "../database/FirebaseConfiguration";

export const saveFeedback = async (feedback) => {
	return await db.collection("opinions_vehicle")
		.add(feedback)
		.then((result) => {return(result)})
		.catch((error) => {return(error)});
};

export const getAllFeedbacks = async () => {
	let feedbacks = [];
	const snapshot = await db.collection('opinions_vehicle').get();
	snapshot.forEach((doc) => {
			let feedback = doc.data();
			feedback.id = doc.id;
			feedbacks.push(feedback);
	});

	return feedbacks;
};
