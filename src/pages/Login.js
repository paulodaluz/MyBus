import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { createSession, getUserOnFirebase } from '../backend/Login';
import * as authService from '../service/AuthService';

export default function Login({ navigation, route }) {

  // const [email, setEmail] = useState("paulo.daluz@gmail.com");
  const [email, setEmail] = useState("presidencia@sudesttransp.com.br");
  const [password, setPassword] = useState("123456");

  const login = async () => {
    if(!email || !password) {
      return Alert.alert('Usuário ou senha inválida!');
    }

    const loggedUser = await authService.login(email, password);

    const user = await getUserOnFirebase(loggedUser.user.uid);

    if(user) {
      createSession(user.uid);
      return navigation.navigate('Map', {user});
    }

    return Alert.alert('Usuário ou senha inválida!');
  }

  return (
    <View style={styles.container}>

      <View style={styles.welcomeBox}>
        <Text
          style={styles.centerTitle}
          >Bem-vindo de volta!
        </Text>

        <Text style={styles.subTitle}>Faça seu login para começar</Text>
      </View>

      <TextInput
          style={styles.inputButton}
          placeholder="Email"
          value={email}
          textContentType='emailAddress'
          onChangeText={text => setEmail(text)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

      <View style={styles.loginButton}>
        <Button
            onPress={login}
            color="#FFFFFF"
            title="Entrar"
          />
      </View>

    <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center'
  },
  welcomeBox: {
    height: "38%",
    width: "100%",
    backgroundColor: "#8257E6",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 40
  },
  inputButton: {
    height: "8%",
    width: '85%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#8492A6',
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
  },
  centerTitle: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
    paddingTop: "30%",
    paddingLeft: 30,
    paddingRight: 90,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "8%",
    width: '85%',
    paddingTop: "4%",
    marginBottom: "3%"
  },
  forgotPasswordText: {
    color: "#8492A6"
  }
});
