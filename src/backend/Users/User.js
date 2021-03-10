import * as authService from '../../service/AuthService';
import { saveUser, updateUser } from '../../service/UserService';

export async function createUserBackend(email, password, name) {
    let user = {email, name};

    const registeredAuthenticationUser = await authService.register(email, password).catch(error => {
        return ({error});
    });
    
    if(registeredAuthenticationUser.error)
        return registeredAuthenticationUser.error;
    
    const registeredOnFirestoreUser = await saveUser({ email, name, uid: registeredAuthenticationUser.user.uid }).catch(error => {
        return ({error});
    });

    user.uid = registeredAuthenticationUser.user.uid;

    if(registeredOnFirestoreUser.error)
        return registeredOnFirestoreUser.error;
    
    return ({ response: user });
};

export async function changeTypeOfVehicleToList(user, newStatus) {
    
    const addAtrybuteOnFirestoreUser = await updateUser({ uid: user.uuid, newStatus }).catch(error => {
        return ({error});
    });

    if(addAtrybuteOnFirestoreUser.error)
        return addAtrybuteOnFirestoreUser.error;
    
    return ({ response: "Usuário Atualizado com Sucesso." })
};