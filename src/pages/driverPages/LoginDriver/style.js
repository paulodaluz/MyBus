import { StyleSheet } from "react-native";
import { lightGray, purple, white } from "../../../styles/colors";

export const styles = StyleSheet.create({
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
    borderBottomRightRadius: 30,
    marginBottom: 40
  },
  inputButton: {
    height: "8%",
    width: '85%',
    marginTop: '4%',
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
    paddingLeft: 30,
    paddingRight: 90,
  },
  subTitle: {
    color: white,
    fontSize: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  loginButton: {
    marginTop: '5%',
    height: "9%",
    width: '85%',
    paddingTop: "4%",
  }
});
