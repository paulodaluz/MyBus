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
	const opacity = blocked ? 0.55 : 1;
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
				...buttonLayout,
				borderRadius: tokens.radius,
				backgroundColor,
				opacity,
			}}
		>
			{loading && <ActivityIndicator color={textColor} />}
			<Text
				style={{
					...textLayout,
					color: textColor,
					fontSize: tokens.type.button,
				}}
			>
				{textButton}
			</Text>
		</TouchableOpacity>
	);
}

const buttonLayout = { justifyContent: 'center' };
const textLayout = { textAlign: 'center', flexShrink: 1 };
