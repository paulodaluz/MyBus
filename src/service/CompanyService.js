import { collection, doc, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../database/FirebaseConfiguration';

export const saveCompany = async (company) => {
	return await addDoc(collection(db, 'companies'), company)
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
	const snapshot = await getDocs(collection(db, 'companies'));
	snapshot.forEach((document) => {
		let company = document.data();
		company.id = document.id;
		companies.push(company);
	});

	return companies;
};

export const updateCompany = async (id, infosToUpdate) => {
	return new Promise((resolve, reject) => {
		updateDoc(doc(db, 'companies', id), infosToUpdate)
			.then(() => resolve())
			.catch((error) => {
				console.log(`CompanyService - updateCompany - ERROR = ${error}`);
				reject(error);
			});
	});
};
