import * as Location from 'expo-location';
import { hasCoordinates } from './MapDataService';
import { DEFAULT_CITY, FALLBACK_REGION, profileCity } from './RegionService';

export async function resolveMapRegion(city) {
	const configuredCity = profileCity(city);
	if (configuredCity === DEFAULT_CITY) {
		return FALLBACK_REGION;
	}
	try {
		const permission = await Location.getForegroundPermissionsAsync();
		if (permission.status !== 'granted') {
			return FALLBACK_REGION;
		}
		const [coordinates] = await Location.geocodeAsync(configuredCity.replace('/', ', '));
		if (hasCoordinates(coordinates)) {
			return {
				...FALLBACK_REGION,
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
			};
		}
	} catch {
		return FALLBACK_REGION;
	}
	return FALLBACK_REGION;
}
