import { db } from "../database/FirebaseConfiguration";

export const saveFeedback = async (feedback) => {
	console.log('BOLA')
    return await db.collection("opinions_vehicle")
        .add(feedback)
        .then((result) => {return(result)})
        .catch((error) => {return(error)});
};
