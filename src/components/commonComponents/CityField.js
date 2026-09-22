import { Text, View } from 'react-native';
import { Input } from '../Input';
import { DEFAULT_CITY, isValidCity } from '../../service/RegionService';

export function CityField({ value, onChangeText }) {
	return (
		<View style={containerStyle}>
			<Text>Cidade inicial do mapa (padrão: {DEFAULT_CITY})</Text>
			<Input
				placeholder="Cidade/UF"
				value={value}
				onChangeText={onChangeText}
				error={
					isValidCity(value) ? undefined : 'Informe a cidade e a UF, por exemplo: Curitiba/PR.'
				}
			/>
		</View>
	);
}
const containerStyle = { width: '100%', paddingHorizontal: 16, marginVertical: 16 };
