import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getCompanyFeedbackBackend } from "../../backend/feedbacks/CompanyFeedbacks";
import { purple, white, black } from "../../styles/colors";

export default function ReceivedFeedbacks({ navigation, route }) {

	const DATA = [{
		name: "Paulo da Luz1",
		feedback: 'Muito bom, mas motorista corre muito.',
		email: "paulo.daluz@email.com",
		idVehicle: "#4608",
		nameVehicle: 'Hipica Planaltina',
	},
	{
		name: "Paulo da Luz2",
		feedback: 'Bem, eu não seria capaz de saber como poderia chegar aos meus lugares sem este aplicativo incrível, quando seu ...',
		email: "paulo.daluz@email.com",
		idVehicle: "#4609",
		nameVehicle: 'Hipica Planaltina',
	},
	{
		name: "Paulo da Luz3",
		feedback: 'Muito bom, mas motorista corre muito.',
		email: "paulo.daluz@email.com",
		idVehicle: "#4610",
		nameVehicle: 'Hipica Planaltina',
	}
	]

	const [feedbacks, setFeedbacks] = useState([])

	useEffect(() => {

		async function getFeedbacks() {
			setFeedbacks(await getCompanyFeedbackBackend('TGTeU5cvOaYcxmGIvrA6RSpbpxm2'));
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

const styles = StyleSheet.create({
	container: {
		display: "flex"
	},
	boxTitle: {
		backgroundColor: purple,
		height: "17%",
		width: "100%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	title: {
		fontSize: 45,
		color: white,
		fontWeight: "bold",
		paddingTop: "12%",
		paddingLeft: "10%"
	},
	secondTitle: {
		fontSize: 45,
		color: white,
		fontWeight: "bold",
		paddingLeft: "28%"
	},
	body: {
		height: "100%",
		alignItems: "center"
	},
	boxOpinion: {
		backgroundColor: purple,
		width: "98%",
		borderRadius: 30,
		paddingTop: "10%",
		paddingBottom: "10%",
		marginTop: "14%"
	},
	titleNameOfVehiclee: {
		color: white,
		textAlign: "center",
		fontSize: 40,
		fontWeight: "bold",
	},
	nameOfItem: {
		color: black,
		fontWeight: "bold",
		paddingLeft: "10%",
		paddingRight: "10%",
		paddingTop: "6%",
		fontSize: 15
	},
	valueOfItem: {
		color: white,
		fontWeight: "bold",
		fontSize: 20,
		paddingLeft: "10%",
		paddingRight: "10%",
		fontSize: 22
	}
});
