import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { getPassenger, updateUserAllInfos } from '../../../backend/users/Passenger';
import { isValidCPF } from '../../../backend/utils/Utils';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { styles } from './style';

export default function EditProfileCompany({ navigation, route }) {
	const { uid } = route.params;

	const [name, setName] = useState('');
	const [cpf, setCpf] = useState('');
	const [email, setEmail] = useState('');
	const password = '******';
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
	}, [uid]);

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
			<View style={styles.header}>
				<Header title={'Editar Perfil'} />
			</View>

			<View style={styles.body}>
				<Text style={styles.fieldName}>Nome:</Text>
				<View style={styles.inputButton}>
					<Input
						style={styles.inputButton}
						placeholder="Nome completo"
						textContentType="name"
						value={name}
						onChangeText={(text) => setName(text)}
					/>
				</View>

				<Text style={styles.fieldName}>CPF:</Text>
				<View style={styles.inputButton}>
					<Input
						style={styles.inputButton}
						placeholder="CPF"
						keyboardType="number-pad"
						value={cpf}
						onChangeText={(text) => setCpf(text)}
					/>
				</View>

				<Text style={styles.fieldName}>Email:</Text>
				<View style={styles.unmutableInput}>
					<Text style={styles.unmutableInputText}>{email}</Text>
				</View>

				<Text style={styles.fieldName}>Senha:</Text>
				<View style={styles.inputButton}>
					<Input
						style={styles.inputButton}
						placeholder="Senha"
						secureTextEntry={true}
						value={password}
					/>
				</View>

				<Text style={styles.fieldName}>Data de Nascimento:</Text>
				<View style={styles.inputButton}>
					<Input
						placeholder="Data de Nascimento"
						value={bornDate}
						keyboardType="number-pad"
						onChangeText={(date) => setBornDate(date)}
					/>
				</View>

				<View style={styles.updateButton}>
					<WideButton
						onPress={() => updateUser()}
						backgroundColor={darkGrey}
						textButton="Atualizar"
					/>
				</View>
			</View>
		</View>
	);
}
