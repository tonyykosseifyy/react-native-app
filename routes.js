import React, { useEffect , useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useSelector , useDispatch } from 'react-redux';
import { darkTheme, lightTheme } from './theme';
import { Appearance } from 'react-native';
import {  getSessionValue , storeUserSession } from "./helpers/asyncStorage";
import { toggleTheme } from './redux/reducers.js/themeSlice';
import { StatusBar } from 'expo-status-bar';
import { Font } from 'expo-font';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);
  const [ loaded, setLoaded ] = useState(false);
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
    const getFonts = async () => {
      try {
        await Font.loadAsync({
          'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
          'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
        });
        setLoaded(true)
      } catch(err) {
          setLoaded(true)
      }
    }
    getFonts();
    return async () => {
      await storeUserSession("text", "theme", theme) ;
    }
  },[])
  if (!loaded) {
    return <Text>
      not loaded
    </Text>
  }
  return (
      <NavigationContainer theme={theme ==="dark" ? darkTheme : lightTheme } >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
        <StatusBar 
          style={theme === "dark" ? "light" : "dark" } 
          backgroundColor={theme === "dark" ? darkTheme.colors.background : lightTheme.colors.background}
        />
      </NavigationContainer>
  );
}
export default Routes ;