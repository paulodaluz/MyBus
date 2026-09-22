import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { tokens } from '../../styles/tokens';

export function Button({
	onPress,
	textButton,
	backgroundColor = tokens.colors.primary,
	textColor = tokens.colors.surface,
	disabled = false,
	loading = false,
}) {
	const blocked = disabled || loading;
	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityLabel={textButton}
			accessibilityState={{ disabled: blocked, busy: loading }}
			disabled={blocked}
			onPress={onPress}
			style={{
				minHeight: tokens.controlHeight,
				padding: tokens.space.medium,
				justifyContent: 'center',
				borderRadius: tokens.radius,
				backgroundColor,
				opacity: blocked ? 0.55 : 1,
			}}
		>
			{loading && <ActivityIndicator color={textColor} />}
			<Text
				style={{
					textAlign: 'center',
					color: textColor,
					fontSize: tokens.type.button,
					flexShrink: 1,
				}}
			>
				{textButton}
			</Text>
		</TouchableOpacity>
	);
}
