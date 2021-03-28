import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { purple, white, orange, black } from '../../styles/colors';
import MyBusIcon from '../../assets/icons/svg/my_bus_icon.svg';

export default function ListVehicleInfosCompany({ navigation, route }) {
	const vehicle = {
		name: '07 Hípica / Planaltina',
		plateId: '#ISA6529',
		password: '#8257E6',
		registration_plate: 'ISA6529',
		id_to_passagers: '#3869ABCD',
		status: 'Operando Normalmente',
		price: '3,89'
	}

	return(
		<View>
			<View style={styles.header}>
				{/* <Image
						style={{width: 30, height: 30}}
						source={MyBusIcon}
					/> */}
				<Text style={styles.infoNameTitle}>Nome do Veículo:</Text>
				<Text style={styles.infoTitle}>{vehicle.name}</Text>

			</View>

			<View style={styles.body}>

				<View style={{paddingLeft: "8%"}}>
					<Text style={styles.info}>{vehicle.name}</Text>

					<Text style={styles.infoName}>Situação Atual</Text>
					<Text style={styles.info}>{vehicle.status}</Text>

					<Text style={styles.infoName}>Código do Veículo</Text>
					<Text style={styles.info}>{vehicle.id_to_passagers}</Text>

					<Text style={styles.infoName}>Usuário do Motorista</Text>
					<Text style={styles.info}>{vehicle.plateId}</Text>

					<Text style={styles.infoName}>Senha do Motorista</Text>
					<Text style={styles.info}>{vehicle.password}</Text>

					<View style={styles.vehicleFunctions}>
						<Text style={styles.price}>{vehicle.price}</Text>
					</View>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => console.log()}>
						<Text style={styles.textButton}>EDITAR</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "17%",
		backgroundColor: purple,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		paddingTop: "14%",
		paddingLeft: "6%"
	},
	infoNameTitle: {
		color: white,
		fontWeight: "bold",
		fontSize: 12
	},
	infoTitle: {
		color: white,
		fontSize: 28,
		fontWeight: "bold"
	},
	body: {
		backgroundColor: purple,
		borderRadius: 30,
		marginTop: "10%",
		height: "65%",
		paddingTop: "8%",
		paddingBottom: "8%",

		width: "95%",
		alignSelf: "center",
	},
	infoName: {
		color: black,
		fontWeight: "bold",
		fontSize: 12,
		paddingTop: "5%"
	},
	info: {
		color: white,
		fontSize: 28,
		fontWeight: "bold"
	},
	price: {
		color: white,
		fontWeight: "bold"
	},
	vehicleFunctions: {

	},
	button: {
		backgroundColor: orange,
		borderRadius: 30,
		height: "16%",
		width: "50%",
		alignItems: "center",
		alignSelf: "center",
	},
	textButton: {
		color: white,
		fontWeight: "bold",
		paddingTop: "6%",
		fontSize: 36
	}
});
