import { requestPasswordReset } from '../../../service/AuthService';
import { isValidEmail } from '../../../backend/utils/Utils';
import { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { Header } from '../../../components/Header';
import { Input } from '../../../components/Input';
import { WideButton } from '../../../components/WideButton';
import { darkGrey } from '../../../styles/colors';
import { Footer } from './Footer';
import { styles } from './style';

export default function ForgotMyPassword({ navigation }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const pending = useRef(false);
	const nextRequestAt = useRef(0);
	const recover = async () => {
		if (pending.current) {
			return;
		}
		if (!isValidEmail(email.trim())) {
			return Alert.alert('E-mail inválido!');
		}
		if (Date.now() < nextRequestAt.current) {
			return Alert.alert('Aguarde um minuto antes de tentar novamente.');
		}
		pending.current = true;
		setLoading(true);
		try {
			await requestPasswordReset(email);
			nextRequestAt.current = Date.now() + 60000;
			Alert.alert(
				'Confira seu e-mail',
				'Se houver uma conta para este endereço, você receberá um link para redefinir a senha.'
			);
		} catch (error) {
			if (error.code === 'auth/too-many-requests') {
				nextRequestAt.current = Date.now() + 60000;
				Alert.alert('Muitas tentativas. Aguarde antes de tentar novamente.');
			} else {
				Alert.alert('Não foi possível enviar. Verifique sua conexão e tente novamente.');
			}
		} finally {
			pending.current = false;
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header
					title={'Esqueceu sua senha?'}
					subtitle={'Digite seu e-mail para receber um link de recuperação'}
				/>
			</View>

			<View style={styles.input}>
				<Input
					placeholder="Email"
					value={email}
					textContentType="emailAddress"
					keyboardType="email-address"
					autoCapitalize="none"
					disabled={loading}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>

			<View style={styles.forgotPasswordButton}>
				<WideButton
					onPress={recover}
					loading={loading}
					textButton={'Continuar'}
					backgroundColor={darkGrey}
				/>
			</View>

			<Footer onPress={() => navigation.navigate('Login')} />
		</View>
	);
}
