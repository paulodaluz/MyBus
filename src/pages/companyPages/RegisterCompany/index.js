import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import { createSession } from '../../../backend/Login';
import { createCompanyBackend } from '../../../backend/users/Company';
import { isSecurityPassword, isValidCNPJ, isValidEmail } from '../../../backend/utils/Utils';
import { darkGrey, purple, white } from "../../../styles/colors";
import { Button } from "../../../components/Button";
import { styles } from './style';

export default function RegisterCompany({ navigation, route }) {
  const [name, setName] = useState("Sudeste Transportes Coletivos");
  const [cnpj, setCnpj] = useState("10000178000196");
  const [email, setEmail] = useState("presidencia@sudesttransp.com.br");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  const createUser = async () => {
    if(!email || !password || !confirmPassword || !name || !cnpj) {
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

		if(!isValidCNPJ(cnpj)) {
      return Alert.alert('CNPJ inválido! O CNPJ deve conter apenas numeros!');
    }

    const companyCreated = await createCompanyBackend(email, password, name, cnpj);

    if(companyCreated && companyCreated.error)
      return Alert.alert('Erro ao criar o usuário');

    await createSession(companyCreated.response.uid);
    return navigation.navigate('MapCompany', { company: companyCreated.response })
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
          placeholder="Nome da empresa"
          textContentType='name'
          value={name}
          onChangeText={text => setName(text)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="CNPJ"
          keyboardType='number-pad'
          value={cnpj}
          onChangeText={text => setCnpj(text)}
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
          textButton={'Pronto'}
					backgroundColor={darkGrey}
          />
      </View>

      <View style={styles.messagesToUser}>
        <Text style={styles.messageCreatingYourAccount}>
          Criando sua conta você concorda com nossos <Text style={styles.termsOfUse}>Termos de Uso</Text>
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.doYouHaveAccount}>Você já tem uma conta? <Text style={styles.getIn}>Entrar</Text>
          </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
