import { db } from "../database/FirebaseConfiguration";

export const saveUser = async (user, chave = "") => {
    return db.collection("users")
        .add(user)
        .then((result) => {return(result)})
        .catch((error) => {return(error)});
};

export const updateUser = async (uid, newStatus) => {
    return await db.collection("users")
        .doc(uid)
        .update(newStatus)
        .then((result) => {return(result)})
        .catch((error) => {return(error)})
};

export const getAllUsers = async () => {
    let users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
        users.push(doc.data());
    });

    return users;
};