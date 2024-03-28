import axios from 'axios';
import React,{ useEffect, useState} from 'react';

import { View,Text,Image, Button,StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Loading } from '../../components/Loading/Loading';
import Stars from './Stars';
import EventThumb from './EventThumb';
import OrganizationDetails from '../OrganizationDetails/Organizationdetails';
import Subscription from '../Subscription/Subscription';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
const Home = () => {
    const navigation = useNavigation()
    const [data, setData] = useState()
    const email = useRoute().params.email
    // const email = 'orga@email.com'
    const [loading, toggleLoading] = useState(true)
    const [category, setCategory] = useState(null)

    const [count, setCount] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            axios.get("http://localhost:3000/home?email="+email)
                .then(response => {
                    setData(response.data)
                    console.log(response.data)
                    toggleLoading(false)
                })
                .catch(e =>{ 
                    toggleLoading(false)
                    console.log(e.response)
                })
        }, 500);


        return () => clearInterval(interval);
    }, [])

    const logout = () => {
        navigation.navigate("Inicio")
    }

    if(!data) return <Loading />

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={{width: 25, height: 25, backgroundColor: 'white'}} onPress={()=>logout()}>
                    <MaterialIcons name="logout" size={24} color="black" />
                </Pressable>
                <Text style={styles.title}>Feastly</Text>
                <Pressable style={{width: 25, height: 25, backgroundColor: 'white'}} onPress={()=>navigation.navigate("EditUser", {isOrg: data.isOrg, id: data.id})}>
                    <FontAwesome name="gear" size={24} color="black" />
                </Pressable>
            </View>
            <ScrollView style={styles.content}>
                <Text style={[styles.textBtn, {textAlign: 'center'}]}>
                    Olá, {data.nome}
                </Text>
                <View style={[styles.category, {display: 'flex', flexDirection: 'row', justifyContent: 'center'}]}>
                <Pressable style={[styles.categoryBtn, {margin: 10, backgroundColor:'#00A3FF', height: 40, width: 150, borderRadius: 20}]} 
                    onPress={() => navigation.navigate('Subscription')}>
                    <Text style={styles.text}>Assine</Text>
                </Pressable>
                {data && data.isOrg? 
                <Pressable style={[styles.categoryBtn,{margin: 10, backgroundColor:'#00A3FF', height: 40, width: 180, borderRadius: 20}]} 
                    onPress={() => navigation.navigate('RegisterEvent', {id: data.id})}>
                    <Text style={styles.text}>Cad. evento</Text>
                </Pressable>:null}
                </View>
                <View style={[styles.category]}>
                    <Text style={styles.categoryTitle}>
                        Categorias
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        styles={styles.categoryScroll} >
                        <Pressable style={[styles.categoryBtn, {marginLeft: 10},category === 1?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(category === 1?null:1)}>
                            <Text style={styles.textBtn}> Universitário</Text>
                        </Pressable>
                        <Pressable style={[styles.categoryBtn, {marginLeft: 10},category === 2?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(category === 2?null:2)}>
                            <Text style={styles.textBtn}> Infantil</Text>
                        </Pressable>
                        <Pressable  style={[styles.categoryBtn, {marginLeft: 10},category === 3?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(category === 3?null:3)}>
                            <Text style={styles.textBtn}> Restaurantes</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                {data?<EventThumb eventos={data.evento} filter={category} isOrg={data.isOrg} />:null}

                {data.isOrg?<View style={styles.category}>
                    <Text style={styles.categoryTitle}> Melhores organizações</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {data?data.organizacoes.map((item, index)=>{
                           return <Pressable style={[styles.atletica,{backgroundColor:'#D9D9D9'},{width:130},{marginLeft:20}]}
                                key={index.toString()} onPress={() => navigation.navigate('OrganizationDetails', {id: item.id, isOrg: data.isOrg})}>
                                    {item.image?<Image source={item.image} height={35} width={35} />
                                       :<svg fill="#0008" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                                    }
                                <View style={{marginLeft:10}}>
                                    <Text style={[styles.textBtn,{marginBottom:3},{fontSize:13}]} >{item.nome}</Text>
                                    <Stars/>
                                </View>
                            </Pressable>
                        }):null}
                    </ScrollView>
                </View>:null}

            </ScrollView>

            <View style={styles.ads}>
                <Text style={styles.textBtn}>
                Ads
                </Text>
            </View>
            {loading?<Loading />:null}
        </SafeAreaView>
    )
    
}

export default Home


const styles = StyleSheet.create({
    ads:{
        fontWeight:'600',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D9D9D9',
        height:150,
        width: '100%',
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
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        height: '80vh'
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
    category: {
        width: '100vw',
        marginBottom: 20,
        overflow: 'hidden'
    },
    categoryTitle: {
        // fontFamily: 'Montserrat',
        fontSize: 16,
        paddingHorizontal: 25,
        color: "#000",
        marginBottom: 10
    },
    categoryBtn: {
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: "#D9D9D9",
        color: "#000",
        fontSize: 14,
        fontFamily: "Nunito",
        marginRight: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryScroll: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40
    },
    cardEvent: {
        height: 125,
        width: 250,
        backgroundColor: "#f2f2f2",
        marginRight: 10,
        position: 'relative'
    },
    title: {
        color: "#000",
        fontFamily: 'Montserrat-Bold',
        fontSize: 24
    },
    input:{
        color:'rgba(255, 255, 255, 1)',
        textAlign:'center',
        fontSize:30,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width:300,
    },
    button: {
        width:200,
        alignItems: 'center',
        backgroundColor: 'rgba(181, 181, 181, 0.2)',
        padding: 10,
        marginTop:30,
        borderRadius:15,
        
    },
    text:{
        fontSize:15,
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito'
    },
    textBtn:{
        fontSize:14,
        color:'rgba(0, 0, 0, 1)',
        fontFamily: 'Nunito'
    }
});
