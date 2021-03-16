import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { getPassenger, updateUserAllInfos } from "../../backend/users/Passenger";
import { purple, white, grey } from "../../styles/colors";

export default function EditProfile({ navigation, route }) {
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [email, setEmail] = useState("");
	const [password] = useState("******");
	const [bornDate, setBornDate] = useState("");

	const [id, setId] = useState("");
	const [uid, setUid] = useState("");

	useEffect(() => {

		async function getData() {
			const { uid } = route.params;

			const user = await getPassenger(uid);

			setId(user.id);

			setUid(user.uid);

			setName(user.name);

			setEmail(user.email);

			if(user.cpf)
				setCpf(user.cpf);

			if(user.born_date)
				setBornDate(user.born_date);
		}

		getData();

  }, []);

	const updateUser = async () => {
		await updateUserAllInfos(id, name, cpf, bornDate);

		return navigation.navigate('Settings', {uid});
	}

  return (
		<View style={styles.container}>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>Editar Perfil</Text>
			</View>

			<View style={styles.body}>

				<Text style={styles.nameOfInput}>Nome:</Text>
				<TextInput
						style={styles.inputButton}
						placeholder="Nome completo"
						textContentType='name'
						value={name}
						onChangeText={name => setName(name)}
					/>

				<Text style={styles.nameOfInput}>CPF:</Text>
				<TextInput
						style={styles.inputButton}
						placeholder="CPF"
						keyboardType='number-pad'
						value={cpf}
						onChangeText={cpf => setCpf(cpf)}
					/>

				<Text style={styles.nameOfInput}>Email:</Text>
				<View style={styles.inputButton}>
					<Text style={styles.unmutableInput}>{email}</Text>
				</View>

				<Text style={styles.nameOfInput}>Senha:</Text>
				<TextInput
						style={styles.inputButton}
						placeholder="Senha"
						secureTextEntry={true}
						value={password}
					/>

				<Text style={styles.nameOfInput}>Data de Nascimento:</Text>
				<TextInput
						style={styles.inputButton}
						placeholder="Data de Nascimento"
						value={bornDate}
						keyboardType='number-pad'
						onChangeText={bornDate => setBornDate(bornDate)}
					/>

				<View style={styles.updateButton}>
					<Button
						onPress={() => updateUser()}
						color="#FFFFFF"
						title="Atualizar"
						/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: "flex"
	},
	boxTitle: {
		backgroundColor: purple,
		height: "16%",
		width: "100%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30
	},
	title: {
		paddingTop: "15%",
		paddingLeft: "8%",
		fontWeight: "bold",
		color: white,
		fontSize: 50
	},
	body: {
		paddingTop: "8%",
		paddingRight: "10%",
		paddingLeft: "10%"
	},
	nameOfInput: {
		color: grey,
		fontSize: 16,
		paddingTop: "6%"
	},
	inputButton: {
    height: "9%",
    width: '100%',
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
    fontSize: 16,
	},
	unmutableInput: {
		paddingTop: "7%",
		fontSize: 17,
		color: grey
	},
  updateButton: {
    marginTop: 40,
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "9%",
    width: '100%',
    paddingTop: "4%",
    marginBottom: "3%"
  },
});
