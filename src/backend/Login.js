import { getPassager } from '../backend/Users/Passager';
import { getCompany } from '../backend/Users/Company';

export async function loginOnFirebase(uid) {
    const passager = await getPassager(uid);

    if(passager)
      return passager;

    const company = await getCompany(uid);

    if(company)
      return company;
};