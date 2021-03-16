import { db } from "../database/FirebaseConfiguration";

export const saveUser = async (user, chave = "") => {
    return await db.collection("users")
        .add(user)
        .then((result) => {return(result)})
        .catch((error) => {return(error)});
};

export const updateUser = async (id, infosToUpdate) => {
		return new Promise((resolve, reject) => {
				db.collection("users")
						.doc(id)
						.update(infosToUpdate)
						.then(() => resolve())
						.catch((error) => {
								console.log(`updateUser ERROR = ${error}`);
								reject(error);
						});
		});
}

export const getAllUsers = async () => {
    let users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id
        users.push(user);
    });

    return users;
};
