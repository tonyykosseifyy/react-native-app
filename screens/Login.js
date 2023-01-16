import { StyleSheet, View, Text , Button } from 'react-native';
import { storeUserSession } from "../helpers/asyncStorage";
import { useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/reducers.js/themeSlice';
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


const LoginStack = createNativeStackNavigator();

function LoginScreen(props) { 
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const handlePress = async () => {
    const new_theme = theme === "light" ? "dark" : "light";
    const result = await storeUserSession("text", "theme", new_theme);
    if (!result.error) {
      dispatch(toggleTheme({
        theme: new_theme
      }))
    }
  }
  
    return (
      <LoginStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="sign-in">
        <LoginStack.Screen name="sign-up" component={SignUp} />
        <LoginStack.Screen name="sign-in" component={SignIn} />
    </LoginStack.Navigator>  
  );
};
  
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default LoginScreen ;