import { ActivityIndicator, TextInput, View } from 'react-native';
import { tokens } from '../../styles/tokens';
import { Feedback } from '../commonComponents/Feedback';

const Input = ({
	value,
	onChangeText,
	placeholder,
	textContentType,
	keyboardType = 'default',
	secureTextEntry = false,
	disabled = false,
	loading = false,
	error,
	...props
}) => (
	<View style={inputContainer}>
		<TextInput
			{...props}
			accessibilityLabel={placeholder}
			accessibilityState={{ disabled: disabled || loading, busy: loading }}
			style={{
				minHeight: tokens.controlHeight,
				...inputBorder,
				borderColor: error ? tokens.colors.error : tokens.colors.border,
				paddingHorizontal: tokens.space.medium,
				paddingVertical: tokens.space.small,
				fontSize: tokens.type.body,
			}}
			editable={!disabled && !loading}
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
			textContentType={textContentType}
			keyboardType={keyboardType}
			secureTextEntry={secureTextEntry}
		/>
		{loading && <ActivityIndicator />}
		{error && <Feedback>{error}</Feedback>}
	</View>
);
export { Input };

const inputContainer = { width: '100%' };
const inputBorder = { borderWidth: 1 };
