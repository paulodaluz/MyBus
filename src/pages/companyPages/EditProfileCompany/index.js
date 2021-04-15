import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { getCompany, updateAllInfosOfCompany } from "../../../backend/users/Company";
import { purple, white, grey, darkGrey } from "../../../styles/colors";
import { styles } from './style';

export default function EditProfileCompany({ navigation, route }) {
	const { uid } = route.params;

	const [name, setName] = useState("");
	const [cnpj, setCnpj] = useState("");
	const [email, setEmail] = useState("");
	const [password] = useState("******");

	const [id, setId] = useState("");

	useEffect(() => {

		async function getData() {
			const user = await getCompany(uid);

			setId(user.id);

			setName(user.name);

			setEmail(user.email);

			setCnpj(user.cnpj);
		}

		getData();

  }, []);

	const updateUser = async () => {
		await updateAllInfosOfCompany(id, name, cnpj);

		return navigation.navigate('SettingsCompany', {uid});
	}

  return (
		<View style={styles.container}>
			<View style={styles.boxTitle}>
				<Text style={styles.title}>Editar Perfil</Text>
			</View>

			<View style={styles.body}>

				<Text style={styles.nameOfInput}>Nome da empresa:</Text>
				<TextInput
						style={styles.inputButton}
						placeholder="Nome completo"
						textContentType='name'
						value={name}
						onChangeText={text => setName(text)}
					/>

				<Text style={styles.nameOfInput}>CNPJ:</Text>
				<TextInput
						style={styles.inputButton}
						placeholder="CNPJ"
						keyboardType='number-pad'
						value={cnpj}
						onChangeText={text => setCnpj(text)}
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

				<View style={styles.updateButton}>
					<Button
						onPress={() => updateUser()}
						color={white}
						title="Atualizar"
						/>
				</View>
			</View>
		</View>
	)
}
