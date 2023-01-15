import { Set_Encrypted_AsyncStorage,Get_Encrypted_AsyncStorage,} from "react-native-encrypted-asyncstorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type either "text" or "object"
// key like email or key for relating data
// data either text or object based on type
// encryptionKey key for encryption or decryption process

const res = (success, data="") => {
    return {
        error: success ? false : true ,
        data
    }
}

export const storeUserSession = async (type, key, data) => {
    try {
      await Set_Encrypted_AsyncStorage(type, key, data, "encryptionKey");
      return res(true);
    } catch (error) {
      return res(false, error)
    }
}

export const getSessionValue = async (type, key, data) => {
    try {
        const response = await Get_Encrypted_AsyncStorage(type, key, "encryptionKey");
        if ( response ) return res(true, response)
        return res(false, "no item found")
    } catch (err) {
        return res(false, err)
    }
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return res(true);
  } catch (err) {
    return res(false, err);
  }
};