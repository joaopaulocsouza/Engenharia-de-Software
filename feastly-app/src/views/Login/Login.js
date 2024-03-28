import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { View,Text,TextInput,StyleSheet,TouchableOpacity, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";

const Login = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [loading, toggleLoading] = useState(false)
    let data = useSelector(state => state.users)

    const tryLogin = () => {
        toggleLoading(true)
        setTimeout(() => {
            axios.post("http://localhost:3000/login", {email, senha})
                .then(response => {
                    toggleLoading(false)
                    navigation.navigate("Home", {email})
                })
                .catch(e => {
                    toggleLoading(false)
                    setErrorMsg(e.response.data.error)})

        }, 2000)
    }

    return <SafeAreaView style={styles.container}>
                <Text style={styles.TextLogo}>Feastly</Text>
                <Text style={styles.SubTitle}>Bem vindo de volta!</Text>
    
                <TextInput style={styles.input} placeholder="Email" value={email} 
                    onChangeText={e => setEmail(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                <TextInput style={styles.input} placeholder="Senha" value={senha} 
                    onChangeText={e => setSenha(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>

                <Text style={styles.TextErro}>{errorMsg}</Text>
                <Pressable style={ styles.button} onPress={() => tryLogin()}>
                    <Text style={styles.text}>ENTRAR</Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.TextSecundario}>Ainda não tem conta? </Text>
                <Text style={styles.TextBold}> Cadastre-se</Text>
                </TouchableOpacity>
                {loading?<Loading />:null}
         </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        color:'rgba(255, 255, 255, 1)',
        borderColor:"white",
        borderWidth: 1,
        borderRadius:12,
        fontSize:15,
        marginTop: 10,
        // alignItems:'center',
        justifyContent:'center',
        height: 45,
        borderRadius:15,
        width:270,
        paddingLeft: 15,

        
    },
    button: {
        width:270,
        height: 40,
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 10,
        marginTop:30,
        borderRadius:20,
        marginBottom:20
        
    },
    TextLogo:{
        fontSize: 50,
        marginBottom:5,
        color:'rgba(255, 255, 255, 1)',
        marginBottom: 40,
        fontFamily: 'Montserrat-Bold'
    },
    SubTitle: {
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20
    },
    TextSecundario:{
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito-Light'
    },
    TextBold:{
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito-Bold'
    },
    TextErro:{
        marginTop: 10,
        color:'red',
        fontFamily: 'Nunito-Light'
    },
});


export default Login