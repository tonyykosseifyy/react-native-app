import { StyleSheet, View, Text , Button , TextInput, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useTheme } from '@react-navigation/native';

export const AppText = ( props ) => {
    const { colors } = useTheme();
    const { children , ...rest } = props ;
    return (
        <Text {...rest} style={[{ color: colors.primary}, styles.appText,rest.style ]} >{children}</Text>
    )
};

export const Screen = ( props ) => {
    const { colors } = useTheme();
    const { children, ...rest } = props;
    return (
        <rest.wrapper 
            {...rest} 
            style={[ {backgroundColor: colors.background}, styles.screen, rest.style]}
        >
            {children}
        </rest.wrapper>
    )
};

export const CustomInput = ( props ) => {
    const { colors } = useTheme();
    return (
        <TextInput 
            placeholderTextColor={colors.secondary}
            {...props} 
            style={[
                styles.textInput,
                {color: colors.primary, backgroundColor: colors.inputBackground, borderColor: colors.secondary}, 
                props.style 
            ]} 
        />
    )
};
export const InstagramButton = ( props ) => {
    const { colors } = useTheme();
    const { children , style, ...rest } = props;
    return (
        <Pressable {...rest} style={[styles.instaButton,{backgroundColor:colors.blue} ,style]}>{children}</Pressable>
    )
}
export const Bar = ( props ) => {
    const { colors } = useTheme();
    return (
        <View {...props} style={[styles.bar, {backgroundColor: colors.secondary}, props.style]} />
    )
}
export const BlueText = ( props ) => {
    const { colors } = useTheme();
    const { children , ...rest } = props ;
    return <AppText {...rest} style={[{color: colors.blue, fontFamily:"OpenSans-Medium"}, rest.style]}>{children}</AppText>
}

const styles = StyleSheet.create({
    appText: {
        fontFamily: "OpenSans-Light"
    },
    screen: {
        marginTop: Constants.statusBarHeight,
    },
    textInput: {
        fontFamily: "OpenSans-Light",
    },
    instaButton: {
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        height: 47, 
        marginTop: 30,
        borderRadius: 7,
    },
    bar: {
        height: 1,
        width: "100%"
    }
});

