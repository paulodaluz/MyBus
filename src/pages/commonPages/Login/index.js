import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { createSession, getUserOnFirebase } from '../../../backend/Login';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import * as authService from '../../../service/AuthService';
import { darkGrey } from '../../../styles/colors';
import { styles } from './style';

export default function Login({ navigation }) {
	// const [email, setEmail] = useState('paulo.daluz@gmail.com');
	const [email, setEmail] = useState('presidencia@sudesttransp.com.br');
	const [password, setPassword] = useState('123456');

	const login = async () => {
		if (!email || !password) {
			return Alert.alert('Usuário ou senha inválida!');
		}

		const loggedUser = await authService.login(email, password);

		const user = await getUserOnFirebase(loggedUser.user.uid);

		if (user) {
			createSession(user.uid);
			if (user.isPassenger) {
				return navigation.navigate('MapPassenger', { user });
			}
			return navigation.navigate('MapCompany', { user });
		}

		return Alert.alert('Usuário ou senha inválida!');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title={'Bem-vindo\nde volta!'} subtitle={'Faça seu login para começar'} />
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Email"
					textContentType="emailAddress"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Senha"
					textContentType="password"
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>

			<View style={styles.button}>
				<WideButton onPress={login} textButton={'Entrar'} backgroundColor={darkGrey} />
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('ForgotMyPassword')}>
				<Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
			</TouchableOpacity>
		</View>
	);
}
