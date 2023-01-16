import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View , Text , Button } from 'react-native'
import { Screen , AppText } from "../resusable";
import { storeUserSession } from "../helpers/asyncStorage";
import { useDispatch , useSelector } from 'react-redux';
import { toggleTheme } from "../redux/reducers/themeSlice";


function SignIn() {
  const { colors } = useTheme();
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
    <Screen wrapper={View}>
      <Button  title="toggle theme" onPress={() => handlePress()} />
      <AppText>SignIn</AppText>
    </Screen>
  );
};


export default SignIn;