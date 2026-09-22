import { useEffect, useRef } from 'react';
import { getUserOnFirebase } from '../backend/Login';
import { FALLBACK_REGION } from '../service/RegionService';
import { resolveMapRegion } from '../service/MapRegionService';

export function useMapRegion(navigation, profile) {
	const mapRef = useRef(null);
	const interacted = useRef(false);
	const region = useRef(FALLBACK_REGION);
	const generation = useRef(0);
	const city = profile.city;
	const uid = profile.uid;
	useEffect(() => {
		let active = true;
		const refresh = async () => {
			const request = ++generation.current;
			let currentCity = city;
			try {
				const currentProfile = await getUserOnFirebase(uid);
				if (currentProfile?.city) {
					currentCity = currentProfile.city;
				}
			} catch {
				// Keep the route's last known city when the profile is offline.
			}
			const nextRegion = await resolveMapRegion(currentCity);
			if (!active || request !== generation.current) {
				return;
			}
			region.current = nextRegion;
			if (!interacted.current) {
				mapRef.current?.animateToRegion(nextRegion);
			}
		};
		refresh();
		const unsubscribe = navigation.addListener('focus', refresh);
		return () => {
			active = false;
			unsubscribe();
		};
	}, [city, uid, navigation]);
	return {
		mapRef,
		initialRegion: FALLBACK_REGION,
		onMapGesture: () => {
			interacted.current = true;
		},
		recenter: () => {
			interacted.current = false;
			mapRef.current?.animateToRegion(region.current);
		},
	};
}
