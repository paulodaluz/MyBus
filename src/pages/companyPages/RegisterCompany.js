import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as authService from '../../service/AuthService';

export default function RegisterCompany({ navigation, route }) {

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");

  const createUser = () => {
    if(!email || !password || !confirmPassword) {
      return Alert.alert('Dados inválidos, verifique-os e tente novamente!')
    }

    if(password !== confirmPassword) {
      return Alert.alert('As senhas não conferem!')
    }

    authService.register(email, password)
      .then(response => {
        Alert.alert('Usuário Cadastrado com Sucesso');
      })
      .catch(error => {
        setError(error)
        Alert.alert('Erro ao cadastrar usuário');
      })
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
          onChangeText={name => setName(name)}
        />
      
      <TextInput
          style={styles.inputButton}
          placeholder="CNPJ"
          keyboardType='number-pad'
          value={cnpj}
          onChangeText={cnpj => setCnpj(cnpj)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Email"
          textContentType='emailAddress'
          value={email}
          onChangeText={email => setEmail(email)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={password => setPassword(password)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Confirme sua senha"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        />
      
      <View style={styles.registerButton}>
        <Button
          onPress={createUser}
          color="#FFFFFF"
          title="Pronto"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  registerBox: {
    width: "100%",
    height: "30%",
    backgroundColor: "#8257E6",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: "22%",
    paddingLeft: "8%",
    marginBottom: "5%"
  },
  centerTitle: {
    color: '#FFFFFF',
    fontSize: 50,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingTop: "2%",
    paddingRight: "32%"
  },
  inputButton: {
    height: "7%",
    width: '80%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#8492A6',
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "8%",
    width: '85%',
    paddingTop: "4%",
    marginBottom: "3%"
  },
  messagesToUser: {
    paddingLeft: "15%",
    paddingRight: "15%",
    marginTop: "3%"
  },
  messageCreatingYourAccount: {
    color: "#969FAA",
    textAlign: "center"
  },
  doYouHaveAccount: {
    color: "#969FAA",
    textAlign: "center",
    marginTop: "5%"
  },
  termsOfUse: {
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  getIn: {
    textDecorationLine: "underline",
    fontWeight: "bold"
  }
});
