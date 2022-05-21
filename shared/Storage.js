import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {

  static _instance = null;

  static _getInstance() {
    if (Storage._instance === null) {
      Storage._instance = new Storage();
    }

    return this._instance;
  }

  static get = async (key) => {
    try {
      const value = await AsyncStorage.getItem('@' + key);
      return value;
    } catch(e) {
      // error reading value
      return null;
    }
  };

  static set = async(key, value) => {
    console.log(key, value);

    try {
      await AsyncStorage.setItem('@' + key, value);
    } catch (e) {
      // saving error ¯\_(ツ)_/¯
    }
  }

}
