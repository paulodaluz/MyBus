import { act, renderHook, waitFor } from '@testing-library/react-native';
import * as Location from 'expo-location';
import { getUserOnFirebase } from '../src/backend/Login';
import { resolveMapRegion } from '../src/service/MapRegionService';
import { FALLBACK_REGION } from '../src/service/RegionService';
import { useMapRegion } from '../src/hooks/useMapRegion';
jest.mock('expo-location', () => ({
	getForegroundPermissionsAsync: jest.fn(),
	geocodeAsync: jest.fn(),
}));
jest.mock('../src/backend/Login', () => ({ getUserOnFirebase: jest.fn() }));
beforeEach(() => {
	jest.clearAllMocks();
	Location.getForegroundPermissionsAsync.mockResolvedValue({ status: 'granted' });
});
test('uses configured city and deterministic fallback for denied, unknown or failed geocoding', async () => {
	await expect(resolveMapRegion()).resolves.toBe(FALLBACK_REGION);
	Location.getForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });
	await expect(resolveMapRegion('Curitiba/PR')).resolves.toBe(FALLBACK_REGION);
	Location.geocodeAsync.mockResolvedValueOnce([{ latitude: -25.43, longitude: -49.27 }]);
	await expect(resolveMapRegion('Curitiba/PR')).resolves.toEqual({
		...FALLBACK_REGION,
		latitude: -25.43,
		longitude: -49.27,
	});
	Location.geocodeAsync.mockResolvedValueOnce([]);
	await expect(resolveMapRegion('Desconhecida/RS')).resolves.toBe(FALLBACK_REGION);
	Location.geocodeAsync.mockRejectedValueOnce(new Error('offline'));
	await expect(resolveMapRegion('Curitiba/PR')).resolves.toBe(FALLBACK_REGION);
});
test('keeps user gestures, refreshes city on focus and recenters only explicitly', async () => {
	let focus;
	const off = jest.fn();
	const navigation = {
		addListener: jest.fn((event, callback) => {
			focus = callback;
			return off;
		}),
	};
	getUserOnFirebase.mockResolvedValue({ city: 'Curitiba/PR' });
	Location.geocodeAsync.mockResolvedValue([{ latitude: -25, longitude: -49 }]);
	const view = renderHook(() => useMapRegion(navigation, { uid: 'p', city: 'Passo Fundo/RS' }));
	const animate = jest.fn();
	view.result.current.mapRef.current = { animateToRegion: animate };
	await waitFor(() => expect(animate).toHaveBeenCalled());
	animate.mockClear();
	act(() => view.result.current.onMapGesture());
	await act(async () => focus());
	expect(animate).not.toHaveBeenCalled();
	act(() => view.result.current.recenter());
	expect(animate).toHaveBeenCalledWith(expect.objectContaining({ latitude: -25 }));
	getUserOnFirebase.mockRejectedValueOnce(new Error('offline'));
	await act(async () => focus());
	getUserOnFirebase.mockResolvedValueOnce(undefined);
	await act(async () => focus());
	view.result.current.mapRef.current = null;
	act(() => view.result.current.recenter());
	await act(async () => focus());
	let resolve;
	getUserOnFirebase.mockReturnValueOnce(
		new Promise((done) => {
			resolve = done;
		})
	);
	let pending;
	act(() => {
		pending = focus();
	});
	await act(async () => focus());
	await act(async () => {
		resolve(undefined);
		await pending;
	});
	getUserOnFirebase.mockReturnValueOnce(
		new Promise((done) => {
			resolve = done;
		})
	);
	act(() => {
		pending = focus();
	});
	view.unmount();
	await act(async () => {
		resolve(undefined);
		await pending;
	});
	expect(off).toHaveBeenCalled();
});
