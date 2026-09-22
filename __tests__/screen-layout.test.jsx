import { render } from '@testing-library/react-native';
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '../src/components/commonComponents/Screen';

test.each(['ios', 'android'])('screen protects content, scroll and keyboard on %s', (os) => {
	const original = Platform.OS;
	Platform.OS = os;
	const view = render(
		<Screen>
			<Text>Submit</Text>
		</Screen>
	);
	expect(view.UNSAFE_getByType(SafeAreaView)).toBeTruthy();
	expect(view.UNSAFE_getByType(ScrollView).props.keyboardShouldPersistTaps).toBe('handled');
	expect(view.UNSAFE_getByType(KeyboardAvoidingView).props.behavior).toBe(
		os === 'ios' ? 'padding' : 'height'
	);
	view.rerender(
		<Screen scroll={false}>
			<Text>List</Text>
		</Screen>
	);
	expect(view.UNSAFE_queryByType(ScrollView)).toBeNull();
	Platform.OS = original;
});
