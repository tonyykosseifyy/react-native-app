import { StyleSheet, View, Text , Button } from 'react-native';
import Constants from 'expo-constants';

export const AppText = ( props ) => (
    <Text {...props} style={[props.style, styles.appText ]} >{props.children}</Text>
);

export const Screen = ( props ) => (
    <props.wrapper {...props} style={[props.style, styles.screen]}>{props.children}</props.wrapper>
)


const styles = StyleSheet.create({
    appText: {
        color: "white"
    },
    screen: {
        marginTop: Constants.statusBarHeight
    }
});

