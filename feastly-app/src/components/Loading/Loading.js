import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Loading = () => {
    return <SafeAreaView style={styles.container}>
         <Text style={styles.TextLogo}>Feastly</Text>
        <ActivityIndicator size={25} color={"#FFF"} />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: "#111",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextLogo:{
        fontSize: 60,
        marginBottom:5,
        color:'rgba(255, 255, 255, 1)',
        marginBottom: 40,
        fontFamily: 'Montserrat-Bold'
    },
})