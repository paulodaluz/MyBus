import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import * as authService from '../service/AuthService';
import { findUser } from '../service/UserService';

export default function Login({ navigation, route }) {

  const [email, setEmail] = useState("paulera.daluz@gmail.com");
  const [password, setPassword] = useState("123456");

  const login = async () => {
    if(!email || !password) {
      return Alert.alert('Usuário ou senha inválida!')
    }

    authService.login(email, password)
      .then(response => {
        Alert.alert('Login efetuado com sucesso!')
      })
      .catch(erro => {
        setPassword("")
        Alert.alert('Erro no login do usuário!');
      })

  }

  return (
    <View style={styles.container}>

      <Text
        style={styles.centerTitle}
        >Bem-vindo de volta!
      </Text>

      <Text>Faça seu login para começar</Text>
      
      <TextInput
          style={styles.inputButton}
          placeholder="Email"
          value={email}
          textContentType='emailAddress'
          onChangeText={email => setEmail(email)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />

      <Button
          onPress={login}
          title="Entrar"
        />

    <Text>Esqueceu sua senha?</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: "#8257E6",
    borderRadius: 100,  
  },
  inputButton: {
    height: '5%',
    width: '50%',
    borderColor: '#FFFFFF',
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  centerTitle: {
    color: '#8E00FF',
    fontSize: 40
  }
});
