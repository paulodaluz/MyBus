import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import map from '../../../../assets/icons/png/map.png';
import bus_icon from '../../../../assets/icons/png/map/bus_icon.png';
import settings from '../../../../assets/icons/png/settings.png';
import { styles } from './style';

const Menu = ({ onPressShareLocalizationButton, onPressConfigButton, onPressShowVehicleInfos }) => (
	<View style={styles.container}>
		<TouchableOpacity style={styles.button} onPress={onPressShareLocalizationButton}>
			<View style={styles.containerIcon}>
				<Image style={styles.icon} source={map} />
			</View>
			<Text style={styles.buttonText}>COMPARTILHAR LOCALIZAÇÃO</Text>
		</TouchableOpacity>

		<TouchableOpacity style={styles.mainButton} onPress={onPressShowVehicleInfos}>
			<View style={styles.mainIcon}>
				<Image style={styles.busIconMenu} source={bus_icon} />
			</View>
		</TouchableOpacity>

		<TouchableOpacity style={styles.button} onPress={onPressConfigButton}>
			<View style={styles.containerIcon}>
				<Image style={styles.icon} source={settings} />
			</View>
			<Text style={styles.buttonText}>CONFIGURAÇÕES</Text>
		</TouchableOpacity>
	</View>
);

export { Menu };

