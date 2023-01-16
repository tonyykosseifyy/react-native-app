import { StyleSheet, View, Text , Button } from 'react-native';


export const AppText = ( props ) => (
    <Text {...props} style={[props.style, styles.appText ]} >{props.children}</Text>
);

export const Screen = ( props ) => {}

const styles = StyleSheet.create({
    appText: {
        color: "white"
    }
});

