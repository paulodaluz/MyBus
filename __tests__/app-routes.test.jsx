import { View } from 'react-native';
import { render } from '@testing-library/react-native';

jest.mock('../src/routes', () => {
	const ReactRuntime = require('react');
	const { View: NativeView } = require('react-native');
	return { __esModule: true, default: () => ReactRuntime.createElement(NativeView) };
});

const App = require('../App').default;

describe('application entry point', () => {
	test('renders the routes component', () => {
		const view = render(<App />);
		expect(view.UNSAFE_getByType(View)).toBeTruthy();
	});
});
