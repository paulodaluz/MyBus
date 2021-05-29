import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { createSession } from '../../../backend/Login';
import { createCompanyBackend } from '../../../backend/users/Company';
import { isSecurityPassword, isValidCNPJ, isValidEmail } from '../../../backend/utils/Utils';
import { Footer } from '../../../components/FooterRegister';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { styles } from './style';

export default function RegisterCompany({ navigation }) {
	const [name, setName] = useState('');

	const [cnpj, setCnpj] = useState('');
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const createUser = async () => {
		if (!email || !password || !confirmPassword || !name || !cnpj) {
			return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
		}

		if (password !== confirmPassword) {
			return Alert.alert('As senhas não conferem!');
		}

		if (!isValidEmail(email)) {
			return Alert.alert('E-mail inválido!');
		}

		if (!isSecurityPassword(password)) {
			return Alert.alert(
				'A senha deve conter oito caracteres, pelo menos uma letra maiúscula, minúscula e um número!'
			);
		}

		if (!isValidCNPJ(cnpj)) {
			return Alert.alert('CNPJ inválido! O CNPJ deve conter apenas numeros!');
		}

		const companyCreated = await createCompanyBackend(email, password, name, cnpj);

		if (companyCreated && companyCreated.error) {
			return Alert.alert('Erro ao criar o usuário');
		}

		await createSession(companyCreated.response.uid);
		return navigation.navigate('MapCompany', { user: companyCreated.response });
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Cadastre-se'} subtitle={'Para criar sua conta preencha os campos abaixo'} />
			</View>

			<View style={styles.input}>
				<Input
					style={styles.inputButton}
					placeholder="Nome da empresa"
					textContentType="name"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
			</View>

			<View style={styles.input}>
				<Input
					style={styles.inputButton}
					placeholder="CNPJ"
					keyboardType="number-pad"
					value={cnpj}
					onChangeText={(text) => setCnpj(text)}
				/>
			</View>

			<View style={styles.input}>
				<Input
					style={styles.inputButton}
					placeholder="Email"
					textContentType="emailAddress"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			<View style={styles.input}>
				<Input
					style={styles.inputButton}
					placeholder="Senha"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Confirme sua senha"
					secureTextEntry={true}
					value={confirmPassword}
					onChangeText={(text) => setConfirmPassword(text)}
				/>
			</View>

			<View style={styles.button}>
				<WideButton onPress={createUser} textButton={'Pronto'} backgroundColor={darkGrey} />
			</View>

			<Footer onPress={() => navigation.navigate('Login')} />
		</View>
	);
}
