import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import BusinessImage from '../assets/images/png/business-deal-cuate.png';
import BusStopImage from '../assets/images/png/bustop-cuate.png';
import GestureRecognizer from 'react-native-swipe-gestures';
import { getSession, loginOnFirebase } from '../backend/Login';

export default function InitialPage({ navigation, route }) {
  const [typeUserPage, setTypeUserPage] = useState("passenger");

  useEffect(() => {

		async function checkIfHasSession() {
			const uidUser = await getSession();

			if(uidUser) {
				const user = await loginOnFirebase(uidUser);
				return navigation.navigate('Map', {user});
			}
		}

		checkIfHasSession();

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          typeUserPage === 'passenger' ?
          <Image
            style={{ ...styles.imageHeader, width: '94%' }}
            source={BusStopImage}
          />
          :
          <Image
            style={{ ...styles.imageHeader, width: '94%', padding: 10 }}
            source={BusinessImage}
          />
        }
      </View>

      <View style={styles.titles}>
        <Text style={styles.mainTitle}>MyBus</Text>
        <Text
          onPress={() => {
            typeUserPage === 'passenger'
            ? setTypeUserPage('company')
            : setTypeUserPage('passenger')
          }}
          style={styles.subTitle}
        >
          {typeUserPage === 'passenger' ? 'Passageiro' : "Empresas"}
        </Text>
      </View>

      <View style={styles.containerDivider}>
        <View style={styles.divider}>
          <View
            style={
              typeUserPage === 'passenger'
              ? { ...styles.activeDivider, right: '50%' }
              : { ...styles.activeDivider, left: '50%' }
            }
          />
        </View>
      </View>

      <View style={styles.bodyPage}>
        <GestureRecognizer
          style={styles.gestureContainer}
          onSwipeLeft={(state) => setTypeUserPage('company')}
          onSwipeRight={(state) => setTypeUserPage('passenger')}
        >
          <Text style={styles.message}>
            Para continuar faça seu Login ou Cadastre-se
          </Text>

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
        </GestureRecognizer>
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
    display: 'flex',
    alignItems: 'center',
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
    paddingLeft: "15%",
    paddingRight: "10%",
  },
  bodyPage: {
    height: "70%",
    alignItems: "center"
  },
  containerDivider: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: "100%",
    height: 5,
    backgroundColor: '#dfdfdf'
  },
  activeDivider: {
    height: '100%',
    backgroundColor: '#8190A5',
    borderRadius: 5
  },
  imageHeader: {
    resizeMode: 'contain'
  },
  gestureContainer: {
    width: "100%",
    height: "90%",
    display: 'flex',
    alignItems: 'center'
  }
});
