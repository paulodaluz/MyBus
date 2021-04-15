import { StyleSheet } from "react-native";
import { grey, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
  },
  registerBox: {
    width: "100%",
    height: "30%",
    backgroundColor: purple,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: "22%",
    paddingLeft: "8%",
    marginBottom: "5%"
  },
  centerTitle: {
    color: white,
    fontSize: 50,
		fontWeight: "bold",
  },
  subTitle: {
    color: white,
    fontSize: 18,
    paddingTop: "2%",
    paddingRight: "32%"
  },
  inputButton: {
    height: "7%",
    width: '80%',
    marginTop: '3.8%',
    borderWidth: 1,
    borderColor: grey,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
    paddingLeft: "5%",
    fontSize: 16
  },
  registerButton: {
    marginTop: '7%',
    height: "7%",
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
    fontWeight: "bold"
  },
  getIn: {
    textDecorationLine: "underline",
    fontWeight: "bold"
  }
});
