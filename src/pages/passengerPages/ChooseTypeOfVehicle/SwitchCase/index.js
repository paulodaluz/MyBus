import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const SwitchCase = ({ typeOfVehicleToList, onPressFirstSwitch, onPressSecondSwitch }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onPressFirstSwitch}
				style={
					typeOfVehicleToList === 'public'
						? [styles.button, styles.selectedButton]
						: [styles.button, styles.unselectedButton]
				}
			>
				<Text style={styles.textButton}>Público</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onPressSecondSwitch}
				style={
					typeOfVehicleToList === 'private'
						? [styles.button, styles.selectedButton]
						: [styles.button, styles.unselectedButton]
				}
			>
				<Text style={styles.textButton}>Privado</Text>
			</TouchableOpacity>
		</View>
	);
};

export { SwitchCase };
