import { StyleSheet, View, Text , Button } from 'react-native';
import { storeUserSession } from "../helpers/asyncStorage";
import { useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/reducers.js/themeSlice';
import { useTheme } from "@react-navigation/native";

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
      <View style={{ flex: 1, }}>
        <Text>Login Screen</Text>
        <Text></Text>
        <Button onPress={() => handlePress()} title="click me" />
      </View>
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