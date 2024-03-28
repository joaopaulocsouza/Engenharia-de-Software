import React, { useEffect, useState } from "react";
import { View,Text,TextInput, Button,StyleSheet,TouchableOpacity, Pressable } from "react-native";
import {Loading} from "../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Initial = () =>{
    const [loading, toggleLoading] = useState(false)
    const dispatch =  useDispatch()
    const navigation = useNavigation()

    useEffect(()=>{
        const preLoad = async () => {
            try{
                let users = await AsyncStorage.getItem("@users")
                if(users){
                    dispatch({type: 'CARREGAR_USUARIOS', payload: JSON.parse(users)})
                }
                try{
                    let logged = await AsyncStorage.getItem("@logged")
                    if(logged){
                        dispatch({type: 'LOGIN', payload: {email: logged.email, password: logged.password}})
                    }
                }catch(e){
                    console.log(e)
                    toggleLoading(false)    
                    return
                }
                toggleLoading(false)
                return
            }catch(e){
                console.log(e)
                toggleLoading(false)
                return
            }
        }

        preLoad()

    },[])

    return(
        <View style={styles.container}>
        <Text style={styles.TextLogo}>Feastly</Text>
        
        <View style={styles.ButtonsContent}>
            <Pressable style={ styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: "#000", textTransform: 'uppercase'}}>Entrar</Text>
            </Pressable>
            
            <Pressable style={ styles.buttonLogin} onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.text}>Cadastrar</Text>
            </Pressable>
        </View>
        {loading?<Loading />:null}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#0e0e0e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        color:'rgba(255, 255, 255, 1)',
        textAlign:'center',
        fontSize:30,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width:300,
        fontFamily: 'Nunito'
    },
    button: {
        width:270,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 10,
        borderRadius:25,
        marginBottom:10   
        
    },
    buttonLogin: {
        width:270,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#111",
        border: '1px solid #FFF',
        padding: 10,
        borderRadius:25 
    },
    text:{
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito-Light',
        textTransform: 'uppercase'
    },
    TextLogo:{
        fontSize: 50,
        color:'rgba(255, 255, 255, 1)',
        marginBottom: 40,
        fontFamily: 'Montserrat-Bold'
    },
    ButtonsContent: {
        position: 'absolute',
        bottom: 70
    }
});

export default Initial