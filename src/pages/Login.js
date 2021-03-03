import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function Login() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const login = () => {
    console.log({ email, password })

    if(!email || !password) {
      return Alert.alert('Usuário ou senha inválida!')
    }

    Alert.alert('Login efetuado com sucesso')
  }

  return (
    <View style={styles.container}>

      <Text
        style={styles.centerTitle}
        >LOGIN
      </Text>
      
      <TextInput
          style={styles.inputButton}
          placeholder="Digite seu e-mail"
          value={email}
          textContentType='emailAddress'
          onChangeText={email => setEmail(email)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Digite sua senha"
          value={password}
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />

      <Button
          onPress={login}
          title="Login"
        />
      
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
