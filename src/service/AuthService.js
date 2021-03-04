import { firebase } from '../database/FirebaseConfiguration';

export const register = (email, password) => {

    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(retorno => resolve(retorno))
            .catch(erro => reject(console.log(erro)))
    })
};

export const login = (email, password) => {

    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(retorno => resolve(retorno))
            .catch(erro => reject(erro))
    })
};