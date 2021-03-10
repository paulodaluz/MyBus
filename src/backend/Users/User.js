import * as authService from '../../service/AuthService';
import { saveUser } from '../../service/UserService';

export async function createUserBackend(email, password, name) {
    const registeredAuthenticationUser = await authService.register(email, password).catch(error => {
        return ({error});
    });
    
    if(registeredAuthenticationUser.error)
        return registeredAuthenticationUser.error;
    
    const registeredOnFirestoreUser = await saveUser({ email, name, uuid: registeredAuthenticationUser.user.uid }).catch(error => {
        return ({error});
    });

    if(registeredOnFirestoreUser.error)
        return registeredOnFirestoreUser.error;
    
    return ({ response: "Usuário Cadastrado com Sucesso." })
};