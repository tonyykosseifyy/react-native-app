import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View , Text , Button , Image, StyleSheet, Dimensions } from 'react-native'
import { Screen , AppText , CustomInput } from "../resusable";
import { storeUserSession } from "../helpers/asyncStorage";
import { useDispatch , useSelector } from 'react-redux';
import { toggleTheme } from "../redux/reducers/themeSlice";

const { width, height } = Dimensions.get('window'); 

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
        <CustomInput style={styles.inputs} value={userName} onChangeText={text => setUserName(text)} placeholder="Username or Email Address" />
        <CustomInput style={styles.inputs} value={password} onChangeText={text => setPassword(text)}  placeholder="Password" />
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
    flex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputs: {
    width: "100%",
    maxWidth: 350,
    height: 45,
    borderWidth: .3,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    placeholderTextColor: "black",
    fontFamily: "OpenSans-Medium"
  }
});

export default SignIn;