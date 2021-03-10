import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { createUserBackend } from '../../backend/Users/User'

export default function RegisterUser({ navigation, route }) {

  const [name, setName] = useState("Paulo Ricardo da Luz Júnior");
  const [email, setEmail] = useState("paulera.daluz@gmail.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  
  const [error, setError] = useState("");

  const createUser = async () => {
    if(!email || !password || !confirmPassword) {
      return Alert.alert('Dados inválidos, verifique-os e tente novamente!')
    }

    if(password !== confirmPassword) {
      return Alert.alert('As senhas não conferem!')
    }

    const userCreated = await createUserBackend(email, password, name);

    return Alert.alert(userCreated.response);
  }

  return (
    <View style={styles.container}>

      <Text
        style={styles.centerTitle}
        >Cadastre-se
      </Text>

      <Text
        >Para criar sua conta preencha os campos abaixo
      </Text>
      
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

      <Button
        onPress={createUser}
        title="Pronto"
        />

      <Text>
        Criando sua conto você concorda com nossos <Text>Termos de Uso</Text>
      </Text>

      <Text>
        Você já tem uma conta? <Text>Entrar</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    borderColor: '#8492A6',
    textAlign: 'center',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  inputButtonContainer: {
    
  },
  centerTitle: {
    color: '#8E00FF',
    fontSize: 40
  }
});
