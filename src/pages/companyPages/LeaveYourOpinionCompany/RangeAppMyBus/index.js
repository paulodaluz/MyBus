import React from 'react';
import { Image, Text, View } from 'react-native';
import AppIcon from '../../../../assets/icons/png/appIcon.png';
import { styles } from './style';

const RangeAppMyBus = () => {
	return (
		<View style={styles.container}>
			<View style={styles.buttonFeedbackApp}>
				<Image style={styles.iconByButton} source={AppIcon} />

				<Text style={styles.textFeedbackApp}>Aplicativo MyBus</Text>
			</View>
		</View>
	);
};

export { RangeAppMyBus };

