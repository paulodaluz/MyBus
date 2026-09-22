import { fireEvent, render } from '@testing-library/react-native';
import { CityField } from '../src/components/commonComponents/CityField';
import {
	DEFAULT_CITY,
	isValidCity,
	normalizeCity,
	profileCity,
} from '../src/service/RegionService';
test('validates city/state without precise location and supports legacy profiles', () => {
	for (const city of [undefined, '', 'A/RS', 'Curitiba', 'Curitiba/XX', 'City/RS/BR']) {
		expect(isValidCity(city)).toBe(false);
	}
	expect(() => normalizeCity('unknown')).toThrow('Cidade/UF');
	expect(normalizeCity(' São Paulo / sp ')).toBe('São Paulo/SP');
	expect(profileCity(undefined)).toBe(DEFAULT_CITY);
	expect(profileCity('Curitiba/PR')).toBe('Curitiba/PR');
	const change = jest.fn();
	const view = render(<CityField value="" onChangeText={change} />);
	expect(view.getByRole('alert')).toBeTruthy();
	fireEvent.changeText(view.getByPlaceholderText('Cidade/UF'), 'Curitiba/PR');
	expect(change).toHaveBeenCalledWith('Curitiba/PR');
	view.rerender(<CityField value="Curitiba/PR" onChangeText={change} />);
	expect(view.queryByRole('alert')).toBeNull();
});
