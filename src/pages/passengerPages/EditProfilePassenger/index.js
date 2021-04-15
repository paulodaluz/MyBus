import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { getPassenger, updateUserAllInfos } from '../../../backend/users/Passenger';
import { isValidCPF } from '../../../backend/utils/Utils';
import { white } from '../../../styles/colors';
import { styles } from './style';

export default function EditProfileCompany({ navigation, route }) {
	const { uid } = route.params;

	const [name, setName] = useState('');
	const [cpf, setCpf] = useState('');
	const [email, setEmail] = useState('');
	const [password] = useState('******');
	const [bornDate, setBornDate] = useState('');

	const [id, setId] = useState('');

	useEffect(() => {
		async function getData() {
			const user = await getPassenger(uid);

			setId(user.id);

			setName(user.name);

			setEmail(user.email);

			if (user.cpf) {
				setCpf(user.cpf);
			}

			if (user.born_date) {
				setBornDate(user.born_date);
			}
		}

		getData();
	}, []);

	const updateUser = async () => {
		if (cpf) {
			if (!isValidCPF(cpf)) {
				return Alert.alert('CPF inválido! O CPF deve conter apenas numeros!');
			}
		}

		await updateUserAllInfos(id, name, cpf, bornDate);

		return navigation.navigate('SettingsPassenger', { uid });
	};

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
					textContentType="name"
					value={name}
					onChangeText={(text) => setName(text)}
				/>

				<Text style={styles.nameOfInput}>CPF:</Text>
				<TextInput
					style={styles.inputButton}
					placeholder="CPF"
					keyboardType="number-pad"
					value={cpf}
					onChangeText={(text) => setCpf(text)}
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
					keyboardType="number-pad"
					onChangeText={(date) => setBornDate(date)}
				/>

				<View style={styles.updateButton}>
					<Button onPress={() => updateUser()} color={white} title="Atualizar" />
				</View>
			</View>
		</View>
	);
}
