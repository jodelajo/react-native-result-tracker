import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { View } from "react-native";
import { CreateUser } from "../components/auth/CreateUser";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

async function signupHandler({email, password}) {
    console.log(email, password)
    try {
        setIsLoading(true)
        await CreateUser(email, password)
    } catch (error) {
      // Alert.alert('jajaja', 'sdiof soidfjoi sdfoijoi')
        setError(error.toString())
        // setIsLoading(false)
    }
    setIsLoading(false)
}
if (isLoading) {
    return <LoadingOverlay  />
}
if (error && !isLoading) {
    console.log(error)
    return <ErrorOverlay message={error} />
}

  return (
    <View style={styles.container}>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
