import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const Header = ({ vehicleName }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
			<Text style={styles.infoTitle}>{vehicleName}</Text>

			{/* <Image
					style={{width: 30, height: 30}}
					source={MyBusIcon}
				/> */}
		</View>
	);
};

export { Header };

