import {
	NavigationContainer,
	createNavigatorFactory,
	StackRouter,
	useNavigationBuilder,
} from '@react-navigation/native';

// Keep React Navigation's router, history and events; replace only native transitions.
function TestNavigator({ children, initialRouteName }) {
	const { state, descriptors, NavigationContent } = useNavigationBuilder(StackRouter, {
		children,
		initialRouteName,
	});
	return (
		<NavigationContent>{descriptors[state.routes[state.index].key].render()}</NavigationContent>
	);
}
export const TestStack = createNavigatorFactory(TestNavigator)();
export function NavigationHarness({ children, navigationRef, initialRouteName }) {
	return (
		<NavigationContainer ref={navigationRef}>
			<TestStack.Navigator initialRouteName={initialRouteName}>{children}</TestStack.Navigator>
		</NavigationContainer>
	);
}
