import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { createSession } from '../../../backend/Login';
import { createPassengerBackend } from '../../../backend/users/Passenger';
import { isSecurityPassword, isValidEmail } from '../../../backend/utils/Utils';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey, white } from '../../../styles/colors';
import { Footer } from './Footer';
import { styles } from './style';

export default function RegisterPassenger({ navigation, route }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const createUser = async () => {
		if (!email || !password || !confirmPassword) {
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

		const userCreated = await createPassengerBackend(email, password, name);

		if (userCreated.error) {
			return Alert.alert('Erro ao criar o usuário');
		}

		await createSession(userCreated.response.uid);
		return navigation.navigate('ChooseTypeOfVehicle', { user: userCreated.response });
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Cadastre-se'} subtitle={'Para criar sua conta preencha os campos abaixo'} />
			</View>

			<View style={styles.inputButton}>
				<Input
					placeholder="Nome completo"
					textContentType="name"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
			</View>

			<View style={styles.inputButton}>
				<Input
					placeholder="Email"
					textContentType="emailAddress"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			<View style={styles.inputButton}>
				<Input
					placeholder="Senha"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>

			<View style={styles.inputButton}>
				<Input
					placeholder="Confirme sua senha"
					secureTextEntry={true}
					value={confirmPassword}
					onChangeText={(text) => setConfirmPassword(text)}
				/>
			</View>

			<View style={styles.registerButton}>
				<WideButton
					onPress={createUser}
					textColor={white}
					textButton={'Pronto'}
					backgroundColor={darkGrey}
				/>
			</View>

			<Footer onPress={() => navigation.navigate('Login')} />
		</View>
	);
}
