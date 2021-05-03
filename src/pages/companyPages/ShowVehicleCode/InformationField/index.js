import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const InformationField = ({ fieldName, info, onPress }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.fieldName}>{fieldName}</Text>

			<TouchableOpacity style={styles.fieldContainer} onPress={onPress}>
				<Text style={styles.fieldInfo}>{info}</Text>
			</TouchableOpacity>
		</View>
	);
};

export { InformationField };

