import { AsyncStorage } from "react-native";

export const saveStorage = async (key, property) => {
	try {
		await AsyncStorage.setItem(key, property);
	} catch (error) {
		console.log(`AsyncStorage - saveStorage - ERROR = ${error}`);
		return error;
	}
};

export const loadStorage = async (key) => {
	try {
		return await AsyncStorage.getItem(key);
	} catch (error) {
		console.log(`AsyncStorage - loadStorage - ERROR = ${error}`);
		return error;
	}
};

export const removeStorage = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.log(`AsyncStorage - removeStorage - ERROR = ${error}`);
		return error;
	}
}
