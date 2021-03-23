import { Text, View, Button, TextInput, StyleSheet, Alert, Switch } from 'react-native';
import React, { useState } from 'react';

import { purple, white, orange } from '../../styles/colors';


export default function CreateNewVehicle({ navigation, route }) {
	const [thereIsBathroom, setThereIsBathroom] = useState(false);
	const [thereIsAirConditioning, setThereIsAirConditioning] = useState(false);
	const [thereIsWifi, setThereIsWifi] = useState(false);
	const [thereIsWheelchairSupport, setThereIsWheelchairSupport] = useState(false);

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	const toggleSwitchBathroom = () => setThereIsBathroom(previousState => !previousState);
	const toggleSwitchAirC = () => setThereIsAirConditioning(previousState => !previousState);
	const toggleSwitchWifi = () => setThereIsWifi(previousState => !previousState);
	const toggleSwitchWheelchairSup = () => setThereIsWheelchairSupport(previousState => !previousState);

	const buttonColor = { false: '#343F4B', true: "#47525E" }

	return(
		<View>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>DIGITE AS INFORMAÇÕES DO VEICULO</Text>
			</View>

			<View style={styles.body}>
				<Text style={styles.inputName}>Nome do veiculo</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setName(text)}
					value={name}
					placeholder="Digite o nome"
					keyboardType="default"
      	/>

				<Text style={styles.inputName}>Valor do transporte</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setPrice(text)}
					value={price}
					placeholder="Digite o valor"
					keyboardType="numeric"
      	/>

				<View>
					<Text style={styles.selectResources}>Selecione os recursos disponíveis</Text>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>Banheiro</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor='#E5E9F2'
							onValueChange={toggleSwitchBathroom}
							value={thereIsBathroom}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>ar condicionado</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchAirC}
							value={thereIsAirConditioning}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>internet</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchWifi}
							value={thereIsWifi}
							tex
						/>
					</View>

					<View style={styles.optionFuntionOfVehicle}>
						<Text style={styles.functionOfVehicle}>suporte para cadeirantes</Text>
						<Switch
							style={styles.buttonListedVehicles}
							trackColor={buttonColor}
							ios_backgroundColor="#E5E9F2"
							onValueChange={toggleSwitchWheelchairSup}
							value={thereIsWheelchairSupport}
							tex
						/>
					</View>

				</View>

				<View style={styles.registerButton}>
        <Button
          onPress={() => console.log()}
          title="Cadastrar"
					color={white}
          />
      </View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	boxTitle: {
		width: "100%",
		backgroundColor: purple,
		height: "16%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: "10%"
	},
	title: {
		color: white,
		fontWeight: 'bold',
		textAlign: "center",
		paddingTop: "15%",
		fontSize: 25,
		paddingLeft: "13%",
		paddingRight: "13%"
	},
	body: {
		width: "92%",
		height: "75%",
		backgroundColor: purple,
		borderRadius: 30,
		paddingTop: "5%",
		paddingLeft: "10%",
		paddingRight: "10%",
		marginLeft: "4%",
		marginRight: "4%"
	},
	inputName: {
		color: white,
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase",
		paddingBottom: "2%"
	},
	input: {
		width: "90%",
		height: "7%",
		backgroundColor: white,
		borderRadius: 30,
		paddingLeft: "8%",
		paddingRight: "8%",
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: "9%",
		borderWidth: 1,
		borderColor: orange
	},
	selectResources: {
		color: white,
		fontSize: 23,
		fontWeight: "bold",
		textTransform: "uppercase",
		textAlign: "center",
	},
	optionFuntionOfVehicle: {
		width: "100%",
		flexDirection: "row",
		paddingTop: "7%",
		display: "flex",
	},
	functionOfVehicle: {
		color: white,
		fontSize: 25,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	buttonListedVehicles: {
		alignSelf: "center",
		position: 'relative',
		marginLeft: 'auto'
	},
	registerButton: {
		borderRadius: 30,
		marginTop: "10%",
		backgroundColor: orange,
		width: "60%",
		height: "8%",
		alignItems: "center",
		alignSelf: "center",
		paddingTop: "2%"
	}
});
