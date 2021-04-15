import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getCompanyFeedbackBackend } from "../../../backend/feedbacks/CompanyFeedbacks";
import { purple, white, black } from "../../../styles/colors";
import { styles } from './style';

export default function ReceivedFeedbacks({ navigation, route }) {
	const { uid } = route.params;
	const [feedbacks, setFeedbacks] = useState([]);

	useEffect(() => {

		async function getFeedbacks() {
			setFeedbacks(await getCompanyFeedbackBackend(uid));
		}

		getFeedbacks();

  }, []);

	const renderItem = ({ item }) => (
    <View style={styles.boxOpinion}>
			<Text style={styles.titleNameOfVehiclee}>{item.vehicle_name}</Text>

			<Text style={styles.nameOfItem}>Remetente</Text>
			<Text style={styles.valueOfItem}>{item.name_person}</Text>

			<Text style={styles.nameOfItem}>Email</Text>
			<Text style={styles.valueOfItem}>{item.email}</Text>

			<Text style={styles.nameOfItem}>Feedback:</Text>
			<Text style={styles.valueOfItem}>{item.feedback}</Text>
		</View>
  );

	return (
    <View>
			<View style={styles.boxTitle}>
					<Text style={styles.title}>Feedbacks</Text>
					<Text style={styles.secondTitle}>Recebidos</Text>
			</View>
			{
				feedbacks.length < 1 &&
				<Text style={styles.dontHaveFeedback}>Não há feedbacks até o momento!</Text>
			}
			<View style={styles.body}>
				<FlatList
					data={feedbacks}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
			</View>
    </View>
  );
}
