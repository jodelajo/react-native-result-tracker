import axios from "axios";
import { storeUserId } from "../UI/http";
import envs from "../../config/env";
import { Alert, Platform } from "react-native";
import { errorMessages } from "../../constants/errorMessages";

const { API_KEY } = envs;

export default async function Authenticate(mode, email, password) {
 
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    if (mode === "signUp") {
      await storeUserId(response.data);
    }
    return response.data;
  } catch (error) {
    const message = Object.fromEntries(
      Object.entries(errorMessages).filter(([key, value]) => {
        console.log("error", error.response.data.error.message);
        if (key === error.response.data.error.message) {
          return value;
        }
      })
    );

    if (Platform.OS === "web") {
      console.log("message", Object.values(message));
      alert(Object.values(message).toString());
    } else {
      Alert.alert(Object.values(message).toString());
    }
  }
}

export function CreateUser(email, password) {
  return Authenticate("signUp", email, password);
}

export function LoginUser(email, password) {
  return Authenticate("signInWithPassword", email, password);
}
