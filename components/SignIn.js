import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View , Text , Button , Image, StyleSheet } from 'react-native'
import { Screen , AppText , CustomInput } from "../resusable";
import { storeUserSession } from "../helpers/asyncStorage";
import { useDispatch , useSelector } from 'react-redux';
import { toggleTheme } from "../redux/reducers/themeSlice";
import { lightInstagram, darkInstagram } from "../assets/image_links";

function SignIn() {
  console.log(lightInstagram, darkInstagram)
  const [ userName , setUserName ] = useState("");
  const [ password, setPassword ] = useState("");
  const passedTheme = useTheme();
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
      <View>
        <Image style={styles.imageLogo} source={{uri: passedTheme === "dark" ? darkInstagram: lightInstagram }} />
      </View>
      <View>
        <CustomInput value={userName} onChangeText={text => setUserName(text)} placeholder="Enter your username" />
        <CustomInput value={password} onChangeText={text => setPassword(text)}  placeholder="password" />
      </View>
      <Button  title="toggle theme" onPress={() => handlePress()} />
      <AppText>SignIn</AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageLogo: {
    height: 100,
    width: 300,
    objectFit: "contain"
  }
});

export default SignIn;