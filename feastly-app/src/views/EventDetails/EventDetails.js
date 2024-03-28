import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text,TextInput,StyleSheet,Pressable,ImageBackground,ScrollView } from "react-native";
import Stars from "../Home/Stars";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";


const EventDetails = () => {
    const id = useRoute().params.id
    const isOrg = useRoute().params.isOrg
    const [data, setData] = useState(null)
    const navigation = useNavigation()

    useEffect(()=>{
        axios.get("http://localhost:3000/eventos/"+id)
            .then(res => {
                console.log(res.data)
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err.data)
            })
    },[])

    const removeEvent = () => {
        axios.delete("http://localhost:3000/eventos/"+id)
        .then(res => {
            navigation.goBack()
        })
        .catch(err => {
            console.log(err.data)
        })
    }

    const back = () => {
        navigation.goBack()
    }

    if(!data) return <></>


    return(
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <Pressable style={{width: 50, height: 50, backgroundColor: 'white'}} onPress={()=>back()}>
                    <AntDesign name="arrowleft" size={24} color="black"/>
                </Pressable>
                <Text style={styles.title}>Feastly</Text>
                <View style={{width: 50}} />
            </View>
            

            <View style={[styles.TextLogoContainer,{marginBottom:20},{marginTop:20},]}>
                <ImageBackground style={styles.imagem} source={data.image?data.image:require('../../img/Party1.jpg')} imageStyle={{ borderRadius: 15}}/> 
                <Text style={styles.SubTitle}>{data.nome}</Text>
                {isOrg?<Pressable style={[styles.button, {width: 150, height: 40, backgroundColor: 'red', borderRadius: 20,
                    display: 'flex', justifyContent: 'center'}]} onPress={()=>removeEvent()}>
                    <Text style={styles.textBtn}>Deletar</Text>
                </Pressable>:null}
            </View>

            <View style={styles.infoContainer}>
                <Pressable style={[styles.atletica,{width:130},{marginLeft:20}]} onPress={()=>navigation.navigation("OrganizationDetails", {id: data.org.id, isOrg})}>
                    <svg fill="#0008" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                    <View style={{marginLeft:10}}>
                        <Text style={[styles.textEvent,{marginBottom:3},{fontSize:13}]} >{data.org.sigla}</Text>
                        <Stars/>
                    </View>
                </Pressable>
                <View style={{marginRight:30}}>
                    <Text style={[{fontSize:15}]} >R${data.valor},00 / 1° Lote</Text>
                    <View style={styles.btnContainer}>
                        <Pressable style={ styles.button} onPress={() => {}}>
                            <Text style={styles.textBtn}>Comprar</Text>
                        </Pressable>
                    </View>
                </View>

            </View>

            <View style={[styles.DescriptionContainer,{marginBottom:20}]}>
                <Text>Descrição</Text>
                <Text style={ styles.TextDescription} >"{data.descricao}"</Text>
            </View>
            <Text style={[styles.SubTitle,{marginBottom:20}]}>Avaliações de eventos anteriores</Text>

            <View style={styles.personRating}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >

                    <View>
                        <View style={styles.personRating}>
                            <svg fill="#0008" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                            <Stars/>
                        </View>
                        <View style={[styles.personRationText]}>
                            <Text style={[styles.textEvent]} >Evento muito bom</Text>
                        </View>
                    </View>

                    <View>
                        <View style={styles.personRating}>
                            <svg fill="#0008" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                            <Stars/>
                        </View>
                        <View style={[styles.personRationText]}>
                            <Text style={[styles.textEvent]} >Melhor doque eu esperava</Text>
                        </View>
                    </View>

                    <View>
                        <View style={styles.personRating}>
                            <svg fill="#0008" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                            <Stars/>
                        </View>
                        <View style={[styles.personRationText]}>
                            <Text style={[styles.textEvent]} >Evento muito bom</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default EventDetails
const styles = StyleSheet.create({
    personRationText:{
        backgroundColor:'#D9D9D9',
        height:70,
        borderRadius:15,
        width:150,
        marginLeft:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'

    },
    personRating:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    DescriptionContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#f2f2f2',
        height: 150,
        width: '100%',
        padding:15,
        borderRadius:15,
    },
    atletica:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        width:120,
        borderRadius:100,
        height: 40
    },
    imagem: {
        height: 150,
        width: '100%',
        resizeMode: 'stratch', // Pode ser 'cover', 'contain', 'stretch', etc.
        marginBottom:20,
    },
    infoContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding:10
    },
    button: {
        marginTop:3,
        width:'100%',
        alignItems: 'center',
        backgroundColor: '#00A3FF',
        padding: 5,
        borderRadius:15,
    },
    textEvent:{
        fontSize:13,
        textAlign:'center',
    },
    textBtn:{
        color:'#FFF',
        fontSize:13
    },
    btnContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    TextLogoContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
    },
    TextDescription:{
        color:'#000',
        fontFamily: 'Montserrat',
        fontSize: 14,
        textAlign:'center'
    },
    TextLogo:{
        marginBottom:5,
        color:'#000',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold'
    },
    SubTitle: {
        color:'#000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '100%',
        height: 60,
        // position: 'fixed',
        padding: 20,
        top: 0,
        left: 0
    },  

    title: {
        color: "#000",
        fontFamily: 'Montserrat-Bold',
        fontSize: 24
    },

});
