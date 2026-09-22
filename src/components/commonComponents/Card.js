import { View } from 'react-native';
import { tokens } from '../../styles/tokens';

export function Card({ children, style }) {
	return (
		<View
			style={[
				{
					backgroundColor: tokens.colors.surface,
					borderRadius: tokens.radius,
					padding: tokens.space.medium,
					marginVertical: tokens.space.small,
				},
				style,
			]}
		>
			{children}
		</View>
	);
}
