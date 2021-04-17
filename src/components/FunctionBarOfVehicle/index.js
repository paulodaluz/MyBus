import React from 'react';
import { Image, Text, View } from 'react-native';
import air_conditioner from '../../assets/icons/png/functions/air_conditioner.png';
import priceImg from '../../assets/icons/png/functions/price.png';
import toilet from '../../assets/icons/png/functions/toilet.png';
import wheelchair from '../../assets/icons/png/functions/wheelchair.png';
import wifi from '../../assets/icons/png/functions/wifi.png';
import { styles } from './style';

const FunctionBarOfVehicle = ({
	thereIsWifi,
	thereIsWheelchairSupport,
	thereIsBathroom,
	thereIsAirConditioning,
	price,
}) => {
	return (
		<View style={styles.vehicleFunctionsContainer}>
			{thereIsWifi ? <Image style={styles.standardIconStyle} source={wifi} /> : null}

			{thereIsWheelchairSupport ? (
				<Image style={styles.standardIconStyle} source={wheelchair} />
			) : null}

			{thereIsBathroom ? <Image style={styles.standardIconStyle} source={toilet} /> : null}

			{thereIsAirConditioning ? (
				<Image style={styles.standardIconStyle} source={air_conditioner} />
			) : null}

			<View style={styles.priceContainer}>
				<Image style={styles.priceIcon} source={priceImg} />

				<Text style={styles.priceText}>{price}</Text>
			</View>
		</View>
	);
};

export { FunctionBarOfVehicle };

