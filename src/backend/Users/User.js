import * as authService from '../../service/AuthService';
import { saveUser, updateUser, getAllUsers } from '../../service/UserService';

export async function createUserBackend(email, password, name) {
    let user = {email, name};

    const registeredAuthenticationUser = await authService.register(email, password).catch(error => {
        return ({error});
    });
    
    if(registeredAuthenticationUser.error)
        return registeredAuthenticationUser;
    
    const registeredOnFirestoreUser = await saveUser({ email, name, uid: registeredAuthenticationUser.user.uid }).catch(error => {
        return ({error});
    });

    user.uid = registeredAuthenticationUser.user.uid;

    if(registeredOnFirestoreUser.error)
        return registeredOnFirestoreUser;
    
    return ({ response: user });
};

export async function changeTypeOfVehicleToList(user, newStatus) {
    const addAtrybuteOnFirestoreUser = await updateUser({ uid: user.uid, newStatus }).catch(error => {
        return ({error});
    });

    if(addAtrybuteOnFirestoreUser.error)
        return addAtrybuteOnFirestoreUser.error;
    
    return ({ response: "Usuário Atualizado com Sucesso." })
};

export async function getUser(uid) {
    
    const allUsers = await getAllUsers().catch(error => {
        return ({error});
    });

    if(allUsers.error)
        return allUsers.error;
    
    const user = allUsers.find((user) => user.uid === uid);

    return user;
};
