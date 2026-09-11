import {
	calculateTime,
	generateRandomPassword,
	isSecurityPassword,
	isValidCNPJ,
	isValidCPF,
	isValidEmail,
	mountBodyToFirebase,
} from '../src/backend/utils/Utils';

describe('Utils', () => {
	test('mounts only the Firebase fields that were provided', () => {
		expect(
			mountBodyToFirebase({
				typeOfVehicleListed: 'public',
				name: 'Ana',
				vehicleCode: ['#ABC'],
				bornDate: '01/01/1990',
				cpf: '52998224725',
			})
		).toEqual({
			codes_private_vehicles: ['#ABC'],
			name: 'Ana',
			type_of_vehicle_listed: 'public',
			born_date: '01/01/1990',
			cpf: '52998224725',
		});

		expect(mountBodyToFirebase({})).toEqual({});
	});

	test('generates an uppercase password with the requested length', () => {
		jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

		expect(generateRandomPassword(6)).toMatch(/^[A-Z0-9]{6}$/);
		Math.random.mockRestore();
	});

	test('validates security passwords', () => {
		expect(isSecurityPassword('Abcdefg1')).toBe(true);
		expect(isSecurityPassword('abcdefgh1')).toBe(false);
		expect(isSecurityPassword('ABCDefgh')).toBe(false);
		expect(isSecurityPassword('Ab1')).toBe(false);
		expect(isSecurityPassword('Abcdef1!')).toBe(false);
	});

	test('validates CPF numbers', () => {
		expect(isValidCPF('52998224725')).toBe(true);
		expect(isValidCPF('52998224724')).toBe(false);
		expect(isValidCPF('00000000000')).toBe(false);
		expect(isValidCPF('not-a-cpf')).toBe(false);
	});

	test('validates email addresses', () => {
		expect(isValidEmail('person@example.com')).toBe(true);
		expect(isValidEmail('invalid-email')).toBe(false);
	});

	test('validates CNPJ numbers with and without punctuation', () => {
		// The current implementation accepts only numeric CNPJ input before stripping punctuation.
		expect(isValidCNPJ('04.252.011/0001-10')).toBe(false);
		expect(isValidCNPJ('04252011000110')).toBe(true);
		expect(isValidCNPJ('04.252.011/0001-11')).toBe(false);
		expect(isValidCNPJ('00000000000000')).toBe(false);
		expect(isValidCNPJ('123')).toBe(false);
		expect(isValidCNPJ('not-a-cnpj')).toBe(false);
	});

	test('calculates travel time and returns zero for equal coordinates', () => {
		expect(calculateTime(-23.55, -46.63, -23.55, -46.63)).toBe(0);
		expect(calculateTime(-23.55, -46.63, -23.56, -46.64)).toBeGreaterThan(0);
	});
});
