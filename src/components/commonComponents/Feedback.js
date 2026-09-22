import { Text } from 'react-native';
import { tokens } from '../../styles/tokens';

export function Feedback({ children }) {
	return (
		<Text
			accessibilityRole="alert"
			style={{
				color: tokens.colors.error,
				fontSize: tokens.type.body,
				marginVertical: tokens.space.small,
			}}
		>
			{children}
		</Text>
	);
}
