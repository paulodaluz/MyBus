import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorage = async (key: string, property: string): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, property);
	} catch (error: any) {
		console.log(`AsyncStorage - saveStorage - ERROR = ${error}`);

		throw error;
	}
};

export const loadStorage = async (key: string): Promise<string> => {
	try {
		return await AsyncStorage.getItem(key);
	} catch (error: any) {
		console.log(`AsyncStorage - loadStorage - ERROR = ${error}`);

		throw error;
	}
};

export const removeStorage = async (key: string): Promise<void> => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error: any) {
		console.log(`AsyncStorage - removeStorage - ERROR = ${error}`);

		throw error;
	}
};
