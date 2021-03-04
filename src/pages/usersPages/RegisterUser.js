import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import * as authService from '../../service/AuthService';

export default function RegisterUser() {

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

      <Text
        style={styles.centerTitle}
        >CADASTRO
      </Text>
      
      <TextInput
          style={styles.inputButton}
          placeholder="Digite seu e-mail"
          textContentType='emailAddress'
          value={email}
          onChangeText={email => setEmail(email)}
        />

      <TextInput
          style={styles.inputButton}
          placeholder="Digite sua senha"
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

      <Button
        onPress={createUser}
        title="Cadastrar"
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
  inputButtonContainer: {
    
  },
  centerTitle: {
    color: '#8E00FF',
    fontSize: 40
  }
});
