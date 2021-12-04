import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { isSecurityPassword, isValidEmail } from '../../../backend/utils/Utils';
import { Footer } from '../../../components/FooterRegister';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey, white } from '../../../styles/colors';
import { styles } from './style';

export default function RegisterPassenger({ navigation }) {
	const [name, setName] = useState('Paulo Ricardo da Luz');
	const [email, setEmail] = useState('paulo.daluzjr@gmail.com');
	const [password, setPassword] = useState('Teste123');
	const [confirmPassword, setConfirmPassword] = useState('Teste123');

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

		return navigation.navigate('ChooseTypeOfVehicle', { name, email, password });
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
