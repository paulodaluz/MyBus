import { db } from "../database/FirebaseConfiguration";

export const saveUser = (user, chave = "") => {
    if (!chave) {
        return new Promise((resolve, reject) => {
            db.collection("users")
                .add(user)
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    };

    return new Promise((resolve, reject) => {
        db.collection("users")
            .doc(chave)
            .update(user)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};
