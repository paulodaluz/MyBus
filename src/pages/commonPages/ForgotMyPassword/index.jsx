import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { Footer } from './Footer';
import { styles } from './style';

export default function ForgotMyPassword({ navigation }) {
	const [email, setEmail] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header
					title={'Esqueceu sua senha?'}
					subtitle={'Digite seu e-mail, que lhe enviaremos uma nova senha'}
				/>
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Email"
					value={email}
					textContentType="emailAddress"
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			<View style={styles.forgotPasswordButton}>
				<WideButton
					onPress={() => Alert.alert('Função ainda indispovível')}
					textButton={'Continuar'}
					backgroundColor={darkGrey}
				/>
			</View>

			<Footer onPress={() => navigation.navigate('Login')} />
		</View>
	);
}
