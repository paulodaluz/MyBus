export const DEFAULT_CITY = 'Passo Fundo/RS';
const states = new Set([
	'AC',
	'AL',
	'AP',
	'AM',
	'BA',
	'CE',
	'DF',
	'ES',
	'GO',
	'MA',
	'MT',
	'MS',
	'MG',
	'PA',
	'PB',
	'PR',
	'PE',
	'PI',
	'RJ',
	'RN',
	'RS',
	'RO',
	'RR',
	'SC',
	'SP',
	'SE',
	'TO',
]);
export function isValidCity(city) {
	if (typeof city !== 'string') {
		return false;
	}
	const parts = city.trim().split('/');
	return (
		parts.length === 2 &&
		/^[\p{L}][\p{L}\s.'-]{1,79}$/u.test(parts[0].trim()) &&
		states.has(parts[1].trim().toUpperCase())
	);
}
export function normalizeCity(city) {
	if (!isValidCity(city)) {
		throw new Error('Informe Cidade/UF, por exemplo: Passo Fundo/RS.');
	}
	const [name, state] = city.trim().split('/');
	return `${name.trim()}/${state.trim().toUpperCase()}`;
}
export const profileCity = (city) => (isValidCity(city) ? normalizeCity(city) : DEFAULT_CITY);
