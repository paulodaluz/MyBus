import { AsyncStorage, Alert } from "react-native";

export const saveStorage = async (key, property) => {
    try {
        await AsyncStorage.setItem(key, property);
    } catch (error) {
        console.log(error);
        Alert.alert(
            "Não foi possível salvar seus dados",
            "Ocorreu um erro ao manter seus dados de login"
        );
    }
};

export const loadStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log(error);
        Alert.alert(
            "Não foi possível obter seus dados",
            "Ocorreu um erro ao obter seus dados de login"
        );
        return {};
    }
};

export const removeStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
        Alert.alert(
            "Não foi possível remover seus dados",
            "Ocorreu um erro ao remover seus dados de login"
        );
    }
}