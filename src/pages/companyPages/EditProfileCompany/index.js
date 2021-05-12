import React, { useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getCompany, updateAllInfosOfCompany } from '../../../backend/users/Company';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { styles } from './style';

export default function EditProfileCompany({ navigation, route }) {
	const { uid } = route.params;

	const [name, setName] = useState('');
	const [cnpj, setCnpj] = useState('');
	const [email, setEmail] = useState('');
	const [password] = useState('******');

	const [id, setId] = useState('');

	async function getData() {
		const user = await getCompany(uid);

		setId(user.id);
		setName(user.name);
		setEmail(user.email);
		setCnpj(user.cnpj);
	}

	const updateUser = async () => {
		await updateAllInfosOfCompany(id, name, cnpj);

		return navigation.navigate('SettingsCompany', { uid });
	};

	useLayoutEffect(() => {
		getData();
	}, []);

	return (
		<View>
			<View style={styles.header}>
				<Header title={'Editar Perfil'} />
			</View>

			<View style={styles.body}>
				<Text style={styles.inputName}>Nome da empresa:</Text>
				<View style={styles.input}>
					<Input
						value={name}
						onChangeText={(text) => setName(text)}
						placeholder="Nome completo"
						textContentType="name"
					/>
				</View>

				<Text style={styles.inputName}>CNPJ:</Text>
				<View style={styles.input}>
					<Input
						placeholder="CNPJ"
						keyboardType="number-pad"
						value={cnpj}
						onChangeText={(text) => setCnpj(text)}
					/>
				</View>

				<Text style={styles.inputName}>Email:</Text>
				<View style={styles.inputButton}>
					<Text style={styles.inputName}>{email}</Text>
				</View>

				<Text style={styles.inputName}>Senha:</Text>
				<View style={styles.input}>
					<Input placeholder="Senha" secureTextEntry={true} value={password} />
				</View>

				<View style={styles.button}>
					<WideButton
						onPress={() => updateUser()}
						textButton={'Atualizar'}
						backgroundColor={darkGrey}
					/>
				</View>
			</View>
		</View>
	);
}
