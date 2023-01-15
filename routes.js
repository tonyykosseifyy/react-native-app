import React, { useEffect , useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useSelector , useDispatch } from 'react-redux';
import { darkTheme, lightTheme } from './theme';
import { Appearance } from 'react-native';
import {  getSessionValue } from "./helpers/asyncStorage";
import { toggleTheme } from './redux/reducers.js/themeSlice';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme)
  useEffect(() => {
    const sessionTheme = async () => {
      const session = await getSessionValue();
      if (!session.error) {
        dispatch(toggleTheme({theme: session.data}))
      }
    }
    sessionTheme();
    if (!theme) {
      const appearanceTheme = Appearance.getColorScheme();
      dispatch(toggleTheme({theme: appearanceTheme}))
    }
  },[])
  //const theme = useSelector(state => state.theme.theme);
  console.log(theme);
  return (
      <NavigationContainer theme={theme ==="dark" ? darkTheme : lightTheme } >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
export default Routes ;