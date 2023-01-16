import { StyleSheet, View, Text , Button } from 'react-native';


export const AppText = ( props ) => (
    <Text {...props} style={[props.style, styles.appText ]} >{props.children}</Text>
);


const styles = StyleSheet.create({
    appText: {
        color: "white"
    }
});

