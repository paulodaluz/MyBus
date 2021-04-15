import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createSession, getUserOnFirebase } from '../backend/Login';
import { Button } from '../components/Button';
import * as authService from '../service/AuthService';
import { darkGrey, grey, lightGray, purple, white } from '../styles/colors';

export default function Login({ navigation }) {
	const [email, setEmail] = useState('paulo.daluz@gmail.com');
	// const [email, setEmail] = useState("presidencia@sudesttransp.com.br");
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
			<View style={styles.welcomeBox}>
				<Text style={styles.centerTitle}>Bem-vindo de volta!</Text>

				<Text style={styles.subTitle}>Faça seu login para começar</Text>
			</View>

			<TextInput
				style={styles.inputButton}
				placeholder="Email"
				value={email}
				textContentType="emailAddress"
				onChangeText={(text) => setEmail(text)}
			/>

			<TextInput
				style={styles.inputButton}
				placeholder="Senha"
				value={password}
				secureTextEntry={true}
				onChangeText={(text) => setPassword(text)}
			/>

			<View style={styles.loginButton}>
				<Button
					onPress={login}
					textButton={'Entrar'}
					backgroundColor={darkGrey}
					style={styles.loginButton}
				/>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('ForgotMyPassword')}>
				<Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: lightGray,
		alignItems: 'center',
	},
	welcomeBox: {
		height: '38%',
		width: '100%',
		backgroundColor: purple,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		marginBottom: '10%',
	},
	inputButton: {
		height: '8%',
		width: '85%',
		marginTop: 15,
		borderWidth: 1,
		borderColor: grey,
		backgroundColor: 'transparent',
		paddingHorizontal: 40,
		paddingLeft: '5%',
	},
	centerTitle: {
		color: white,
		fontSize: 50,
		fontWeight: 'bold',
		paddingTop: '18%',
		paddingLeft: '7%',
		paddingRight: '18%',
	},
	subTitle: {
		color: white,
		fontSize: 20,
		paddingHorizontal: '7.4%',
		paddingTop: 20,
	},
	loginButton: {
		marginTop: '5%',
		height: '10%',
		width: '85%',
		paddingTop: '4%',
		marginBottom: '3%',
	},
	forgotPasswordText: {
		color: grey,
		marginTop: '2%',
	},
});
