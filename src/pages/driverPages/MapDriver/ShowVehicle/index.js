import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import cross_button from '../../../../assets/icons/png/cross_button.png';
import bus_icon from '../../../../assets/icons/png/map/bus_icon.png';
import { Divisor } from '../../../../components/Divisor';
import { FunctionBarOfVehicle } from '../../../../components/FunctionBarOfVehicle';
import { MiddleButton } from '../../../../components/MiddleButton';
import { orange } from '../../../../styles/colors';
import { styles } from './style';

const ShowVehicle = ({
	onPressCloseButton,
	vehicleFunctions,
	onPressUpdateVehiclesInfo,
	vehicleInfos,
	statusVehicle,
}) => (
	<View style={styles.container}>
		<TouchableOpacity style={styles.closeButtonContainer} onPress={onPressCloseButton}>
			<Image style={styles.icon} source={cross_button} />
		</TouchableOpacity>

		<View style={styles.title}>
			<Image style={styles.icon} source={bus_icon} />
			<Text style={styles.info}>{vehicleInfos.name}</Text>
		</View>

		<Text style={styles.typeOfInfo}>Situação Atual</Text>
		<Text style={styles.info}>{statusVehicle}</Text>

		<Text style={styles.typeOfInfo}>Código do Veículo</Text>
		<Text style={styles.info}>{vehicleInfos.id_to_passengers}</Text>

		<Text style={styles.typeOfInfo}>Usuário do Motorista</Text>
		<Text style={styles.info}>{vehicleInfos.id_to_share_localization}</Text>

		<Text style={styles.typeOfInfo}>Senha do Motorista</Text>
		<Text style={styles.info}>{vehicleInfos.password_to_share_localization}</Text>

		<FunctionBarOfVehicle
			thereIsWifi={vehicleFunctions.wifi}
			thereIsWheelchairSupport={vehicleFunctions.suport_wheelchair}
			thereIsBathroom={vehicleFunctions.washrooms}
			thereIsAirConditioning={vehicleFunctions.air_conditioning}
			price={vehicleFunctions.price_transport}
		/>

		<Divisor />

		<View style={styles.button}>
			<MiddleButton
				onPress={onPressUpdateVehiclesInfo}
				textButton={'EDITAR'}
				backgroundColor={orange}
			/>
		</View>
	</View>
);

export { ShowVehicle };

