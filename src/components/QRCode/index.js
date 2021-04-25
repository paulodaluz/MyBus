import React from 'react';
import { Image, Text, View } from 'react-native';
import QRCodeIcon from '../../assets/icons/png/qr_code.png';
import { styles } from './style';

const QRCode = () => (
	<View style={styles.container}>
		<Image style={styles.qrCodeIcon} source={QRCodeIcon} />
		<Text style={styles.text}>Escanear QR-CODE</Text>
	</View>
);

export { QRCode };

