import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { darkGrey, lightGray, purple, white } from '../styles/colors';

export default function ForgotMyPassword({ navigation, route }) {

  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.welcomeBox}>
        <Text
          style={styles.centerTitle}
          >Esqueceu sua senha?
        </Text>

        <Text style={styles.subTitle}>Digite seu e-mail, que lhe enviaremos uma nova senha</Text>
      </View>

      <TextInput
          style={styles.inputButton}
          placeholder="Email"
          value={email}
          textContentType='emailAddress'
          onChangeText={text => setEmail(text)}
        />

      <View style={styles.forgotPasswordButton}>
        <Button
            onPress={() => console.log()}
            color="#FFFFFF"
            title="Continuar"
          />
      </View>

    <Text style={styles.proceedToLoginText}>Deseja fazer o login? <Text style={styles.proceedLogin}>Entrar</Text></Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    alignItems: 'center'
  },
  welcomeBox: {
    height: "38%",
    width: "100%",
    backgroundColor: purple,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  inputButton: {
    height: "8%",
    width: '85%',
    marginTop: '20%',
    borderWidth: 1,
    borderColor: '#8492A6',
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
  },
  centerTitle: {
    color: white,
    fontSize: 50,
    fontWeight: 'bold',
    paddingTop: "30%",
    paddingLeft: '5%',
    paddingRight: '10%',
  },
  subTitle: {
    color: white,
    fontSize: 20,
    maxWidth: '90%',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  forgotPasswordButton: {
    marginTop: '20%',
    backgroundColor: darkGrey,
    borderRadius: 14,
    height: "8%",
    width: '85%',
    paddingTop: "4%",
    marginBottom: "3%"
  },
  proceedToLoginText: {
    color: "#8492A6"
  },
  proceedLogin: {
    color: 'black',
    textDecorationLine: 'underline'
  }
});
