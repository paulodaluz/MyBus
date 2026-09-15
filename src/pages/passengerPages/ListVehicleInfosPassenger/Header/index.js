import { Image, Text, View } from 'react-native';
import GreenBusIcon from '../../../../assets/icons/png/green_bus_icon.png';
import { styles } from './style';

const Header = ({ name, time }) => {
	return (
		<View style={styles.header}>
			<View>
				<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
				<Text style={styles.infoTitle}>{name}</Text>
			</View>
			<View>
				<Image style={styles.busIcon} source={GreenBusIcon} />
			</View>
		</View>
	);
};

export { Header };
