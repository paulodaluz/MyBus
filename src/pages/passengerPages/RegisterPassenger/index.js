import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { createSession } from '../../../backend/Login';
import { createPassengerBackend } from '../../../backend/users/Passenger';
import { isSecurityPassword } from '../../../backend/utils/Utils';
import { Button } from '../../../components/Button';
import { darkGrey, purple, white } from '../../../styles/colors';
import { styles } from './style';

export default function RegisterPassenger({ navigation, route }) {

  const [name, setName] = useState("Paulo Ricardo da Luz Júnior");
  const [email, setEmail] = useState("paulo.daluz@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  const createUser = async () => {
    if(!email || !password || !confirmPassword) {
      return Alert.alert('Dados inválidos, verifique-os e tente novamente!');
    }

    if(password !== confirmPassword) {
      return Alert.alert('As senhas não conferem!');
    }

		if(!isValidEmail(email)) {
			return Alert.alert('E-mail inválido!');
		}

		if(!isSecurityPassword(password)) {
      return Alert.alert('A senha deve conter oito caracteres, pelo menos uma letra maiúscula, minúscula e um número!');
    }

    const userCreated = await createPassengerBackend(email, password, name);

    if(userCreated.error)
      return Alert.alert('Erro ao criar o usuário');

    await createSession(userCreated.response.uid);
    return navigation.navigate('ChooseTypeOfVehicle', { user: userCreated.response });
  }

  return (
    <View style={styles.container}>

      <View style={styles.registerBox}>
        <Text
          style={styles.centerTitle}
          >Cadastre-se
        </Text>

        <Text style={styles.subTitle}
          >Para criar sua conta preencha os campos abaixo
        </Text>
      </View>

      <TextInput
          style={styles.inputButton}
          placeholder="Nome completo"
          textContentType='name'
          value={name}
          onChangeText={text => setName(text)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Email"
          textContentType='emailAddress'
          value={email}
          onChangeText={text => setEmail(text)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Confirme sua senha"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />

      <View style={styles.registerButton}>
        <Button
          onPress={createUser}
          textColor={white}
          textButton={'Pronto'}
					backgroundColor={darkGrey}
          />
      </View>

      <View style={styles.messagesToUser}>
        <Text style={styles.messageCreatingYourAccount}>
          Criando sua conta você concorda com nossos <Text style={styles.termsOfUse}>Termos de Uso</Text>
        </Text>

        <Text style={styles.doYouHaveAccount}>
          Você já tem uma conta? <Text style={styles.getIn}>Entrar</Text>
        </Text>
      </View>
    </View>
  );
}
