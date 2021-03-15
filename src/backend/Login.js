import { getPassager } from '../backend/Users/Passager';
import { getCompany } from '../backend/Users/Company';
import { saveStorage, loadStorage, removeStorage } from '../service/AsyncStorage';

export async function loginOnFirebase(uid) {
    const passager = await getPassager(uid);

    if(passager) {
      return passager;
    }

    const company = await getCompany(uid);

    if(company)
      return company;
};

export async function createSession(uid) {
  await saveStorage('uid', uid);
  return;
}

export async function getSession() {
  const uid = await loadStorage('uid');
  if(uid)
    return uid;
  return;
}

export async function removeSession() {
  await removeStorage('uid');
  return;
}