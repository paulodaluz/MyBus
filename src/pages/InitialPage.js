import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import BusinessImage from '../assets/images/png/business-deal-cuate.png';
import BusStopImage from '../assets/images/png/bustop-cuate.png';
import GestureRecognizer from 'react-native-swipe-gestures';
import { getSession, getUserOnFirebase } from '../backend/Login';
import { darkGrey, grey, purple, white } from '../styles/colors';
import { Button } from '../components/Button';

export default function InitialPage({ navigation }) {
  const [typeUserPage, setTypeUserPage] = useState("passenger");

  useEffect(() => {

		async function checkIfHasSession() {
			const uidUser = await getSession();

			if(uidUser) {
				const user = await getUserOnFirebase(uidUser);
				if(user.isPassenger) {
					return navigation.navigate('MapPassenger', {user});
				}
				return navigation.navigate('MapCompany', {user});
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
							textButton={'Login'}
							style={styles.loginButton}
							backgroundColor={purple}
						/>
          </View>

          <View style={styles.registerButton}>
						<Button
							onPress={() => typeUserPage === 'passenger' ? navigation.navigate('RegisterPassenger') : navigation.navigate('RegisterCompany')}
							textButton={'Cadastre-se'}
							style={styles.registerButton}
							backgroundColor={darkGrey}
						/>
					</View>

					<View style={typeUserPage === 'company' ? styles.driverLogin : null}>
            {
							typeUserPage === 'company' ?
							<Button
								onPress={() => navigation.navigate('LoginDriver')}
								textButton={'Login do Motorista'}
								style={styles.driverLogin}
								backgroundColor={purple}
							/>
							:
							null
						}
          </View>
        </GestureRecognizer>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
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
    color: darkGrey,
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
    marginTop: '5%',
    height: "10%",
    width: '85%',
  },
  registerButton: {
    marginTop: '5%',
    height: "10%",
    width: '85%',
  },
	driverLogin: {
		marginTop: '5%',
    height: "10%",
    width: '85%',
	},
  message: {
    fontSize: 18,
    color: grey,
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
    backgroundColor: grey,
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
  },
	loginDriver :{
		height: "90%"
	}
});
