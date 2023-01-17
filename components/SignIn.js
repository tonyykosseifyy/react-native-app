import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View , Text , Button , Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import { Screen , AppText , CustomInput , InstagramButton , Bar, BlueText } from "../resusable";
import { storeUserSession } from "../helpers/asyncStorage";
import { useDispatch , useSelector } from 'react-redux';
import { toggleTheme } from "../redux/reducers/themeSlice";
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window'); 

function SignIn() {
  const [ userName , setUserName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ secure , setSecure ] = useState(true);
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

      <View style={styles.formWrapper}>
        <View style={styles.inputsWrapper}>
          <CustomInput style={styles.inputs} value={userName} onChangeText={text => setUserName(text)} placeholder="Username, email address" />
          <View style={{width: "100%", position: "relative"}}>
            <CustomInput secureTextEntry={secure} style={styles.inputs} value={password} onChangeText={text => setPassword(text)}  placeholder="Password" />
            <Feather 
              name={secure ? "eye-off":"eye"} 
              onPress={() => setSecure(!secure)} 
              size={24} 
              style={{position: "absolute", right: 12 ,top:12,color: passedTheme.colors.primary}} 
            />
          </View>
          
        </View>

        <BlueText style={{marginLeft:"auto"}}>Forgotten password?</BlueText>

        <InstagramButton style={styles.signInButton}>
          <AppText style={{color: "white",fontFamily:"OpenSans-Medium"}}>Log In</AppText>
        </InstagramButton>

      </View>
      
      <Button style={[styles.signInButton, {marginBottom: 10}]} title="toggle theme" onPress={() => handlePress()} />
      
      <View style={styles.bottomContainer}>
        <Bar style={{position: "absolute", top: 0}} />
        <AppText>Don't have an account? <BlueText>Sign up</BlueText></AppText>
      </View>
    
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
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 2,
    paddingTop: 30,
  },
  imageLogo: {
    height: 90,
    width: 200,
    objectFit: "contain",
  },
  formWrapper: {
    flex: 6,
    paddingTop: 50,
    paddingLeft: ( width * 7 ) / 100,
    paddingRight: ( width * 7 ) / 100
  },
  inputsWrapper : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputs: {
    width: "100%",
    height: 47,
    borderWidth: .3,
    borderRadius: 3,
    marginBottom: 15,
    padding: 10,
    placeholderTextColor: "black",
    fontFamily: "OpenSans-Medium",
    marginLeft: "auto",
    marginRight: "auto"
  },
  signInButton: {
    width: "100%",
    marginTop: 40,
  },
  bottomContainer: {
    flex: 1.2, 
    display: "flex", 
    justifyContent:"center", 
    alignItems:"center",
    position: "relative"
  }
});

export default SignIn;