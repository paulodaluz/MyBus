import { hasCoordinates, selectVehicleLocations } from '../src/service/MapDataService';
test('rejects missing and invalid coordinates and deduplicates linked vehicles', () => {
	for (const value of [
		null,
		{},
		{ latitude: 1 },
		{ latitude: NaN, longitude: 1 },
		{ latitude: 91, longitude: 1 },
		{ latitude: 1, longitude: 181 },
	]) {
		expect(hasCoordinates(value)).toBe(false);
	}
	expect(selectVehicleLocations(null)).toEqual([]);
	expect(
		selectVehicleLocations(
			{
				one: null,
				two: { A: { latitude: 1, longitude: 2 }, B: {} },
				three: { A: { latitude: 2, longitude: 3 } },
			},
			['A', 'B']
		)
	).toEqual([{ registration_plate: 'A', latitude: 2, longitude: 3 }]);
});
