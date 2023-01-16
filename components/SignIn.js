import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View , Text , Button , Image, StyleSheet } from 'react-native'
import { Screen , AppText , CustomInput } from "../resusable";
import { storeUserSession } from "../helpers/asyncStorage";
import { useDispatch , useSelector } from 'react-redux';
import { toggleTheme } from "../redux/reducers/themeSlice";

function SignIn() {
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
    <Screen wrapper={View} style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image 
          style={styles.imageLogo} 
          source={passedTheme.dark ? require("../assets/instagram-dark.png") : require("../assets/instagram-light.png")} 
        />
      </View>
      <View style={styles.inputsWrapper}>
        <CustomInput value={userName} onChangeText={text => setUserName(text)} placeholder="Enter your username" />
        <CustomInput value={password} onChangeText={text => setPassword(text)}  placeholder="password" />
      </View>
      <Button title="toggle theme" onPress={() => handlePress()} />
      <AppText>SignIn</AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  }, 
  imageWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    paddingTop: 100,
  },
  imageLogo: {
    height: 200,
    width: 200,
    objectFit: "contain"
  },
  inputsWrapper : {
    flex: 3
  }
});

export default SignIn;