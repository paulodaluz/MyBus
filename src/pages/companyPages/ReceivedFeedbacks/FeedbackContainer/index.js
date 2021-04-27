import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const FeedbackContainer = ({ feedback }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{feedback.vehicle_name}</Text>

			<Text style={styles.nameOfItem}>Remetente</Text>
			<Text style={styles.valueOfItem}>{feedback.name_sender}</Text>

			<Text style={styles.nameOfItem}>Email</Text>
			<Text style={styles.valueOfItem}>{feedback.email_sender}</Text>

			<Text style={styles.nameOfItem}>Feedback</Text>
			<Text style={styles.valueOfItem}>{feedback.feedback}</Text>
		</View>
	);
};

export { FeedbackContainer };

