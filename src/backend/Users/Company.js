import * as authService from '../../service/AuthService';
import { saveCompany, getAllCompanies, updateCompany } from '../../service/CompanyService';

export async function createCompanyBackend(email, password, name, cnpj) {
    let company = {email, name, cnpj};

    const registeredAuthenticationUser = await authService.register(email, password).catch(error => {
        return ({error});
    });

    if(registeredAuthenticationUser && registeredAuthenticationUser.error)
        return registeredAuthenticationUser;

    company.uid = registeredAuthenticationUser.user.uid;

    const registeredOnFirestoreUser = await saveCompany(company).catch(error => {
        return ({error});
    });

    if(registeredOnFirestoreUser.error)
        return registeredOnFirestoreUser;

    return ({ response: company });
};

export async function getCompany(uid) {

    const allCompanies = await getAllCompanies().catch(error => {
        return ({error});
    });

    if(allCompanies && allCompanies.error)
        return allCompanies.error;

    const company = allCompanies.find((user) => user.uid === uid);

    return company;
};

export async function updateAllInfosOfCompany(id, name = '', cnpj = '') {
	const infosToUpdate = { name, cnpj };

	const addAtrybuteOnFirestoreCompany = await updateCompany(id, infosToUpdate).catch(error => {
			console.log(`updateAllInfosOfCompany - ERROR = ${error}`);
			return ({error});
	});

	if(addAtrybuteOnFirestoreCompany && addAtrybuteOnFirestoreCompany.error)
			return addAtrybuteOnFirestoreCompany.error;

	return ({ response: "Empresa Atualizada com Sucesso." })
};
