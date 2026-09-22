import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../styles/tokens';

export function Screen({ children, scroll = true, style }) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.background }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				{scroll ? (
					<ScrollView
						keyboardShouldPersistTaps="handled"
						contentContainerStyle={{ flexGrow: 1, paddingBottom: tokens.space.large }}
					>
						<View
							style={[
								{
									width: '100%',
									maxWidth: tokens.contentWidth,
									alignSelf: 'center',
									alignItems: 'center',
									gap: tokens.space.medium,
								},
								style,
							]}
						>
							{children}
						</View>
					</ScrollView>
				) : (
					<View style={[{ flex: 1 }, style]}>{children}</View>
				)}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
