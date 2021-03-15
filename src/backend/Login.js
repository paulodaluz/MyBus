import { getPassenger } from './users/Passenger';
import { getCompany } from './users/Company';
import { saveStorage, loadStorage, removeStorage } from '../service/AsyncStorage';

export async function loginOnFirebase(uid) {
    const passenger = await getPassenger(uid);

    if(passenger) {
      return passenger;
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