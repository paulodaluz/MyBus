import {
	hydrateRouteParams,
	normalizeRouteParams,
	validRouteParams,
} from '../src/navigation/routeParams';
import { getUserOnFirebase } from '../src/backend/Login';
import { getVehicle, getVehicleFunction } from '../src/backend/vehicles/Vehicle';
jest.mock('../src/backend/Login', () => ({ getUserOnFirebase: jest.fn() }));
jest.mock('../src/backend/vehicles/Vehicle', () => ({
	getVehicle: jest.fn(),
	getVehicleFunction: jest.fn(),
}));
test('stores only scalar identifiers and validates required route params', () => {
	expect(normalizeRouteParams()).toEqual({});
	expect(
		normalizeRouteParams({
			user: { uid: 'p', name: 'Private' },
			vehicle: { registration_plate: 'A', password: 'secret' },
			status: 'running',
			callback: () => {},
		})
	).toEqual({ uid: 'p', registrationPlate: 'A', status: 'running' });
	expect(
		normalizeRouteParams({ company: { uid: 'c' }, receivedVehicle: { registration_plate: 'B' } })
	).toEqual({ uid: 'c', registrationPlate: 'B' });
	for (const params of [
		null,
		{},
		{ uid: 1 },
		{ uid: ' ' },
		{ uid: 'p' },
		{ uid: 'p', registrationPlate: ' ' },
		{ uid: 'p', registrationPlate: 'A', backPage: 'Login' },
	]) {
		expect(validRouteParams('MapDriver', params)).toBe(false);
	}
	expect(
		validRouteParams('SettingsDriver', {
			uid: 'c',
			registration_Plate: 'A',
			backPage: 'SettingsDriver',
		})
	).toBe(true);
	expect(validRouteParams('Login')).toBe(true);
});
test('hydrates supported screen params and reports missing backend records', async () => {
	await expect(hydrateRouteParams('MapPassenger', {})).rejects.toThrow('Parâmetros');
	await expect(hydrateRouteParams('Login')).resolves.toEqual({});
	getUserOnFirebase.mockResolvedValueOnce(undefined);
	await expect(hydrateRouteParams('MapPassenger', { uid: 'p' })).rejects.toThrow('Perfil');
	getUserOnFirebase.mockResolvedValueOnce({ uid: 'p' });
	await expect(hydrateRouteParams('ChooseTypeOfVehicle', { uid: 'p' })).resolves.toMatchObject({
		user: { uid: 'p' },
	});
	getVehicle.mockResolvedValueOnce(undefined);
	await expect(
		hydrateRouteParams('ShowVehicleCode', { uid: 'c', registrationPlate: 'A' })
	).rejects.toThrow('Veículo');
	getVehicle.mockResolvedValue({ registration_plate: 'A' });
	await expect(
		hydrateRouteParams('ShowVehicleCode', { uid: 'c', registrationPlate: 'A' })
	).resolves.toMatchObject({ vehicle: { registration_plate: 'A' } });
	getUserOnFirebase.mockResolvedValueOnce(undefined);
	await expect(
		hydrateRouteParams('MapDriver', { uid: 'c', registrationPlate: 'A' })
	).rejects.toThrow('motorista');
	getUserOnFirebase.mockResolvedValue({ uid: 'c' });
	getVehicleFunction.mockResolvedValueOnce(undefined);
	await expect(
		hydrateRouteParams('MapDriver', { uid: 'c', registrationPlate: 'A' })
	).rejects.toThrow('motorista');
	getVehicleFunction.mockResolvedValueOnce({ wifi: true });
	await expect(
		hydrateRouteParams('MapDriver', { uid: 'c', registrationPlate: 'A' })
	).resolves.toMatchObject({ company: { uid: 'c' }, vehicleFunctions: { wifi: true } });
	await expect(
		hydrateRouteParams('EditVehicle', { uid: 'c', registration_Plate: 'A' })
	).resolves.toMatchObject({ params: { uid: 'c', registration_Plate: 'A' } });
	await expect(hydrateRouteParams('EditProfileCompany', { uid: 'c' })).resolves.toEqual({
		uid: 'c',
	});
});
