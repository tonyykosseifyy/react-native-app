import { View, Text , Button } from 'react-native';
import { storeUserSession } from "../helpers/asyncStorage";
import { useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/reducers.js/themeSlice';

function LoginScreen() { 
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Text></Text>
        <Button onPress={() => handlePress()} title="click me" />
      </View>
  );
};
  
export default LoginScreen ;