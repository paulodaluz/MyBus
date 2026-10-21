import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../styles/tokens';

type ScreenProps = { children: ReactNode; scroll?: boolean; style?: StyleProp<ViewStyle> };

export function Screen({ children, scroll = true, style }: ScreenProps) {
	return (
		<SafeAreaView style={safeAreaStyle}>
			<KeyboardAvoidingView
				style={fillStyle}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				{scroll ? (
					<ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollContent}>
						<View style={[contentStyle, style]}>{children}</View>
					</ScrollView>
				) : (
					<View style={[fillStyle, style]}>{children}</View>
				)}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const safeAreaStyle = { flex: 1, backgroundColor: tokens.colors.background };
const contentStyle: ViewStyle = {
	width: '100%',
	maxWidth: tokens.contentWidth,
	alignSelf: 'center',
	alignItems: 'center',
	gap: tokens.space.medium,
};
const fillStyle = { flex: 1 };

const scrollContent = { flexGrow: 1, paddingBottom: tokens.space.large };
