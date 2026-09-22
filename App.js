import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { configurationError } from './src/database/FirebaseConfiguration';

export default function App() {
	if (configurationError) {
		return (
			<View style={configurationStyle}>
				<Text accessibilityRole="alert">{configurationError}</Text>
			</View>
		);
	}
	return (
		<SafeAreaProvider>
			<Routes />
		</SafeAreaProvider>
	);
}

const configurationStyle = { flex: 1, justifyContent: 'center', padding: 24 };
