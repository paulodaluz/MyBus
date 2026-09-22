import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Screen } from '../components/commonComponents/Screen';
import { WideButton } from '../components/WideButton';
import {
	hydrateRouteParams,
	normalizeRouteParams,
	parameterlessRoutes,
	publicRoutes,
} from './routeParams';

export function createRouteScreen(Component, name) {
	function RouteScreen({ navigation, route }) {
		const [params, setParams] = useState(null);
		const [failed, setFailed] = useState(false);
		const [attempt, setAttempt] = useState(0);
		const adaptedNavigation = useMemo(
			() => ({
				...navigation,
				navigate: (destination, data) => {
					const next = { name: destination, params: normalizeRouteParams(data) };
					if (
						publicRoutes.includes(name) &&
						['MapPassenger', 'MapCompany', 'MapDriver', 'ChooseTypeOfVehicle'].includes(destination)
					) {
						navigation.reset({ index: 0, routes: [next] });
					} else {
						navigation.navigate(destination, next.params);
					}
				},
			}),
			[navigation]
		);
		useEffect(() => {
			if (parameterlessRoutes.includes(name)) {
				return;
			}
			let active = true;
			setFailed(false);
			setParams(null);
			hydrateRouteParams(name, route.params)
				.then((value) => {
					if (active) {
						setParams(value);
					}
				})
				.catch(() => {
					if (active) {
						setFailed(true);
					}
				});
			return () => {
				active = false;
			};
		}, [route.params, attempt]);
		if (parameterlessRoutes.includes(name)) {
			return <Component navigation={adaptedNavigation} route={route} />;
		}
		if (failed) {
			return (
				<Screen>
					<Text accessibilityRole="alert">
						Não foi possível abrir esta tela. Verifique os dados e a conexão.
					</Text>
					<WideButton textButton="Tentar novamente" onPress={() => setAttempt(attempt + 1)} />
					<WideButton
						textButton="Voltar ao início"
						onPress={() => navigation.reset({ index: 0, routes: [{ name: 'InitialPage' }] })}
					/>
				</Screen>
			);
		}
		if (!params) {
			return (
				<Screen>
					<ActivityIndicator accessibilityLabel="Carregando tela" />
				</Screen>
			);
		}
		return <Component navigation={adaptedNavigation} route={{ ...route, params }} />;
	}
	return RouteScreen;
}
