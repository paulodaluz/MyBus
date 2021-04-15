import { StyleSheet } from "react-native";
import { grey, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
  },
  registerBox: {
    height: "33%",
    width: "100%",
    backgroundColor: purple,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 40
  },
  centerTitle: {
    color: white,
    fontSize: 50,
    paddingTop: "24%",
    paddingLeft: 30,
    paddingRight: 90,
		fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: white,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 100,
  },
  inputButton: {
    height: "8%",
    width: '85%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
    fontSize: 16
  },
  registerButton: {
    marginTop: '5%',
    height: "8%",
    width: '85%',
    marginBottom: "3%"
  },
  messagesToUser: {
    paddingLeft: "15%",
    paddingRight: "15%",
    marginTop: "3%"
  },
  messageCreatingYourAccount: {
    color: grey,
    textAlign: "center"
  },
  doYouHaveAccount: {
    color: grey,
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
