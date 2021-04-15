import { db } from '../database/FirebaseConfiguration';

export const saveCompany = async (company) => {
	return await db
		.collection('companies')
		.add(company)
		.then((result) => {
			return result;
		})
		.catch((error) => {
			console.log(`CompanyService - saveCompany - ERROR = ${error}`);
			return error;
		});
};

export const getAllCompanies = async () => {
	let companies = [];
	const snapshot = await db.collection('companies').get();
	snapshot.forEach((doc) => {
		let company = doc.data();
		company.id = doc.id;
		companies.push(company);
	});

	return companies;
};

export const updateCompany = async (id, infosToUpdate) => {
	return new Promise((resolve, reject) => {
		db.collection('companies')
			.doc(id)
			.update(infosToUpdate)
			.then(() => resolve())
			.catch((error) => {
				console.log(`CompanyService - updateCompany - ERROR = ${error}`);
				reject(error);
			});
	});
};
