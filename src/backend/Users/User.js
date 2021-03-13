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

export async function changeTypeOfVehicleToList(user, typeOfVehicleListed, vehicleCode='') {
    const completeUser = await getUser(user.uid);

    const addAtrybuteOnFirestoreUser = await updateUser(completeUser.id, typeOfVehicleListed, vehicleCode).catch(error => {
        console.log(`changeTypeOfVehicleToList - addAtrybuteOnFirestoreUser - ERROR = ${error}`)
        return ({error});
    });

    if(addAtrybuteOnFirestoreUser && addAtrybuteOnFirestoreUser.error)
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
