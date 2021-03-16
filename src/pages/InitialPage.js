import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import BusinessImage from '../assets/images/png/business-deal-cuate.png';
import BusStopImage from '../assets/images/png/bustop-cuate.png';

export default function InitialPage({ navigation, route }) {
  const [typeUserPage, setTypeUserPage] = useState("passenger");
  const [typeOfUser, setTypeOfUser] = useState("Passageiro");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          typeUserPage === 'passenger' ?
          <Image
            style={{height: "100%", width: "100%"}}
            source={BusStopImage}
          />
          :
          <Image
            style={{height: "110%", width: "80%", margin: "10%"}}
            source={BusinessImage}
          />
        }
      </View>
        
        <View style={styles.titles}>
          <Text style={styles.mainTitle}>MyBus</Text>
          
          <Text style={styles.subTitle}>{typeUserPage === 'passenger' ? 'Passageiro' : "Empresas"}</Text>

          <TouchableOpacity 
                onPress={() => {typeUserPage === 'passenger' ? setTypeUserPage('company') : setTypeUserPage('passenger')}}>
              <Text style={styles.arrowNextPage}>{typeUserPage === 'passenger' ? '>' : "<"}</Text>
          </TouchableOpacity>
        </View>

      <Text style={styles.message}>Para continuar faça seu Login ou Cadastre-se</Text>
    
      <View style={styles.bodyPage}>
        <View style={styles.loginButton}>
          <Button
            onPress={() => navigation.navigate('Login')}
            title="Login"
            color="#FFFFFF"
          />
        </View>

        <View style={styles.registerButton}>
          <Button
            onPress={() => typeUserPage === 'passenger' ? navigation.navigate('RegisterPassenger') : navigation.navigate('RegisterCompany')}
            title="Cadastre-se"
            color="#FFFFFF"
          />
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: "10%",
    width: "100%",
    height: "32%",
    justifyContent: "center"
  },
  titles: {
    flexDirection: "row",
    paddingLeft: "4%"
  },
  mainTitle: {
    color: "#343F4B",
    fontWeight: "bold",
    fontSize: 80
  },
  subTitle: {
    color: "#47525E",
    paddingTop: "13%",
    paddingLeft: "2%",
    fontSize: 24
  },
  arrowNextPage: {
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: "16%",
    color: "#343F4B",
    paddingLeft: "1%"
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#8257E6",
    borderRadius: 14,
    height: "9%",
    width: '85%',
    paddingTop: "2%"
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#47525E",
    borderRadius: 14,
    height: "9%",
    width: '85%',
    paddingTop: "2%",
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: "#8190A5",
    textAlign: "center",
    paddingTop: "8%",
    paddingBottom: "5%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  bodyPage: {
    height: "60%",
    alignItems: "center"
  }
});
