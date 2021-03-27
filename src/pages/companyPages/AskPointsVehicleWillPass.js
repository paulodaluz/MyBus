import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { purple, white, orange } from '../../styles/colors';

export default function AskPointsVehicleWillPass({ navigation, route }) {
	const { vehicle } = route.params;

	return(
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.question}>deseja selecionar os pontos por onde o veiculo ira passar?</Text>

				<View style={styles.buttons}>

					<View style={styles.button}>
						<TouchableOpacity onPress={() => navigation.navigate('ChoicePointsVehicleWillPass', { vehicle })}>
							<Text style={styles.buttonText}>Sim</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.button}>
						<TouchableOpacity onPress={() => navigation.navigate('ListVehicleInfosCompany', { vehicle })}>
							<Text style={styles.buttonText}>Mais Tarde</Text>
							</TouchableOpacity>
					</View>

				</View>

			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	boxTitle: {
		width: "100%",
		backgroundColor: purple,
		height: "18%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: "6%"
	},
	title: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		paddingTop: "11%",
		fontSize: 25,
		paddingLeft: "13%",
		paddingRight: "13%"
	},
	body: {
		width: "92%",
		height: "36%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "10%",
		paddingBottom: "10%",
		marginLeft: "4%",
		marginRight: "4%",
		marginTop: "40%"
	},
	question: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		fontSize: 24,
		textTransform: "uppercase",
		paddingLeft: "8%",
		paddingRight: "8%",
		marginBottom: "2%"
	},
	buttons: {
		flexDirection: "row",
		marginLeft: "5%",
		height: "56%",
		width: "100%",
		marginBottom: "1%"
	},
	button: {
		borderRadius: 30,
		backgroundColor: orange,
		width: "35%",
		height: "50%",
		alignItems: "center",
		alignSelf: "center",
		marginLeft: "7%",
		paddingTop: "1%",
	},
	buttonText: {
		color: white,
		fontSize: 22,
		fontWeight: "bold",
		paddingTop: "5%",
	},
	observation: {
		color: white,
		fontSize: 16,
		textAlign: "center",
		paddingRight: "5%",
		paddingLeft: "5%",
		fontWeight: "bold"
	}
});
