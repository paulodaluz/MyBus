import { db } from "../database/FirebaseConfiguration";

export const saveCompany = async (company, chave = "") => {
    return await db.collection("company")
        .add(company)
        .then((result) => {return(result)})
        .catch((error) => {return(error)});
};

export const getAllCompanies = async () => {
    let companies = [];
    const snapshot = await db.collection('company').get();
    snapshot.forEach((doc) => {
        let company = doc.data();
        company.id = doc.id
        companies.push(company);
    });

    return companies;
};
