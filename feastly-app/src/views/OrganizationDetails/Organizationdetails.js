import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text,TextInput,StyleSheet,Pressable,ImageBackground,ScrollView } from "react-native";
import Stars from "../Home/Stars";
import EventThumb from "../Home/EventThumb";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";


const OrganizationDetails = () => {
    const id = useRoute().params.id
    const navigation = useNavigation()
    const isOrg = useRoute().params.isOrg

    const [data, setData] = useState(null)

    useEffect(()=>{
        const interval = setInterval(() => {
            axios.get("http://localhost:3000/organizacoes/"+id)
                .then(res => {
                    console.log(res.data)
                    setData(res.data.data[0])
                    toggleLoading(false)
                })
                .catch(e =>{ 
                    toggleLoading(false)
                    console.log(e.response)
                })
        }, 500);


        return () => clearInterval(interval);
    },[])

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
            </View>
            <View style={styles.ContainerAbout}>
                <View style={[{display:'flex'},{alignItems:'center'},{width:100}]}>
                    <Text style={[styles.SubTitle,{marginBottom:5}]} >Avaliação</Text>
                    <Stars/>
                </View>
                <View style={[styles.DescriptionContainer,{marginBottom:20}]}>
                    <Text>Descrição</Text>
                    <Text style={ styles.TextDescription} >"{data.descricao}</Text>
                </View>
            </View>

            <Text style={[styles.SubTitle,{marginBottom:20}]}>Proximos eventos</Text>

            <View style={styles.category}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {data.eventos.map((item, index) => {
                            return  <Pressable style={[styles.cardEvent, {marginLeft: 40}]} key={index.toString()}
                            onPress={() => navigation.navigate('EventDetails', {id: item.id, isOrg})} >
                            <ImageBackground source={item.image?item.image:require('../../img/Party1.jpg')} style={styles.imgThumb} imageStyle={{ borderRadius: 12}}>
                                <View style={styles.bottomCard}>
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.textEvent} >{item.nome}</Text>
                                        <Text style={[styles.textEvent,{marginTop:10}]} > R${item.valor} / 1° Lote</Text>
                                    </View>
                                    <View style={[styles.atletica]}>
                                        <svg fill="#fff" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>

                                        <View style={{marginLeft:10}}>
                                            <Text style={[styles.textEvent,{marginBottom:3},{fontSize:13}]} >{data.nome}</Text>
                                            <Stars/>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Pressable>
                        })}
                    </ScrollView>
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

export default OrganizationDetails
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
    ContainerAbout:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'start'
    },
    DescriptionContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#f2f2f2',
        height: 100,
        width: 200,
        padding:15,
        borderRadius:15,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100vw',
        height: 60,
        padding: 20,
        top: 0,
        left: 0
    },  

    title: {
        color: "#000",
        fontFamily: 'Montserrat-Bold',
        fontSize: 24
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
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding:10
    },
    textEvent:{
        fontSize:13,
        textAlign:'center',
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
    atletica:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0006',
        marginTop:10,
        width:120,
        borderRadius:100,
        height: 40
    },
    textEvent:{
        color: '#fff',
        fontSize:15
    },
    bottomCard:{
        display:'flex',
        height:60,
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor: '#d424caBf',
        borderBottomEndRadius:12,
        borderBottomStartRadius:12,
        marginTop:'25%',
    },
    imgThumb: {
        flex:1,
        alignContent:'flex-end',
        justifyContent:'flex-end',
        height: 125,
        width: 290,
        borderRadius: 12,
        resizeMode: 'contain', // Pode ser 'cover', 'contain', 'stretch', etc.
    },
    category: {
        width: '100vw',
        marginBottom: 20,
        overflow: 'hidden'
    },
    cardEvent: {
        height: 125,
        width: 250,
        backgroundColor: "#f2f2f2",
        marginRight: 10,
        position: 'relative'
    }
});
