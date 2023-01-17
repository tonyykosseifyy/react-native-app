import { StyleSheet, View, Text , Button , TextInput } from 'react-native';
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

const styles = StyleSheet.create({
    appText: {
        fontFamily: "OpenSans-Light"
    },
    screen: {
        marginTop: Constants.statusBarHeight,
    },
    textInput: {
        fontFamily: "OpenSans-Light",
    }
});

