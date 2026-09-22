import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity } from 'react-native';
import { tokens } from '../../styles/tokens';

export function Button({
	onPress,
	textButton,
	backgroundColor = tokens.colors.primary,
	textColor = tokens.colors.surface,
	disabled = false,
	loading = false,
}) {
	const [pending, setPending] = useState(false);
	const inFlight = useRef(false);
	const mounted = useRef(true);
	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);
	const busy = loading || pending;
	const blocked = disabled || busy;
	const reportError = () =>
		Alert.alert('Não foi possível concluir. Verifique sua conexão e tente novamente.');
	const handlePress = () => {
		if (blocked || inFlight.current) {
			return;
		}
		let result;
		try {
			result = onPress();
		} catch {
			reportError();
			return;
		}
		if (!result || typeof result.then !== 'function') {
			return result;
		}
		inFlight.current = true;
		setPending(true);
		return result.catch(reportError).finally(() => {
			inFlight.current = false;
			if (mounted.current) {
				setPending(false);
			}
		});
	};
	const opacity = blocked ? 0.55 : 1;
	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityLabel={textButton}
			accessibilityState={{ disabled: blocked, busy }}
			disabled={blocked}
			onPress={handlePress}
			style={{
				minHeight: tokens.controlHeight,
				padding: tokens.space.medium,
				...buttonLayout,
				borderRadius: tokens.radius,
				backgroundColor,
				opacity,
			}}
		>
			{busy && <ActivityIndicator color={textColor} />}
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
