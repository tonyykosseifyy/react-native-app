import { StyleSheet, View, Text , Button, BackHandler } from 'react-native';
import Constants from 'expo-constants';
import { useTheme } from '@react-navigation/native';

export const AppText = ( props ) => {
    const { colors } = useTheme();
    const { children , ...rest } = props ;
    return (
        <Text {...rest} style={[{ color: colors.primary},rest.style, styles.appText ]} >{children}</Text>
    )
}


export const Screen = ( props ) => {
    const { colors } = useTheme();
    const { children, ...rest } = props;
    return (
    <rest.wrapper 
        {...rest} 
        style={[ {backgroundColor: colors.background}, styles.screen, rest.style]}
    >
        {children}
    </rest.wrapper>)
};


const styles = StyleSheet.create({
    appText: {
        fontFamily: "OpenSans-Light"
    },
    screen: {
        marginTop: Constants.statusBarHeight,
    }
});

