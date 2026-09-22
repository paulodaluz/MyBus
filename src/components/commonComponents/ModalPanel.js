import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tokens } from '../../styles/tokens';
import { Card } from './Card';

export function ModalPanel({ children, style }) {
	return (
		<SafeAreaView style={overlayStyle}>
			<View style={panelStyle}>
				<ScrollView keyboardShouldPersistTaps="handled">
					<Card style={style}>{children}</Card>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const overlayStyle = {
	flex: 1,
	justifyContent: 'center',
	padding: tokens.space.medium,
	backgroundColor: '#00000066',
};
const panelStyle = {
	maxHeight: '90%',
	width: '100%',
	maxWidth: tokens.contentWidth,
	alignSelf: 'center',
};
