import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { createSession } from '../../backend/Login';
import { createPassengerBackend } from '../../backend/users/Passenger';

export default function RegisterPassenger({ navigation, route }) {

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

    const userCreated = await createPassengerBackend(email, password, name);

    if(userCreated.error)
      return Alert.alert('Erro ao criar o usuário');

    await createSession(userCreated.response.uid);
    return navigation.navigate('ChooseTypeOfVehicle', { user: userCreated.response })
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
          onChangeText={name => setName(name)}
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

        <Text style={styles.doYouHaveAccount}>
          Você já tem uma conta? <Text style={styles.getIn}>Entrar</Text>
        </Text>
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
    height: "33%",
    width: "100%",
    backgroundColor: "#8257E6",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 40
  },
  centerTitle: {
    color: '#FFFFFF',
    fontSize: 50,
    paddingTop: "24%",
    paddingLeft: 30,
    paddingRight: 90,
  },
  subTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 100,
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
    fontSize: 16
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "8%",
    width: '85%',
    paddingTop: 12,
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
    fontWeight: "bold",
  },
  getIn: {
    textDecorationLine: "underline",
    fontWeight: "bold"
  }
});
