import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { styles } from './style';

export default function ForgotMyPassword({ navigation }) {
	const [email, setEmail] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.welcomeBox}>
				<Text style={styles.centerTitle}>Esqueceu sua senha?</Text>

				<Text style={styles.subTitle}>Digite seu e-mail, que lhe enviaremos uma nova senha</Text>
			</View>

			<TextInput
				style={styles.inputButton}
				placeholder="Email"
				value={email}
				textContentType="emailAddress"
				onChangeText={(text) => setEmail(text)}
			/>

			<View style={styles.forgotPasswordButton}>
				<WideButton
					onPress={() => Alert.alert('Função ainda indispovível')}
					textButton={'Continuar'}
					backgroundColor={darkGrey}
				/>
			</View>

			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<Text style={styles.proceedToLoginText}>
					Deseja fazer o login? <Text style={styles.proceedLogin}>Entrar</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
}
