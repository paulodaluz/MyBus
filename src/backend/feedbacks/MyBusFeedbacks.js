import { saveFeedback } from '../../service/MyBusFeedback';
import { getUserOnFirebase } from '../Login';

export async function saveAppFeedbackBackend(uid, feedback) {
    let opinion = { feedback };

		const user = await getUserOnFirebase(uid);

    opinion.email = user.email;

		if(user.name)	opinion.name = user.name_person;

    await saveFeedback(opinion);

    return ({ response: "Feedback Registrado com Sucesso!" });
};
