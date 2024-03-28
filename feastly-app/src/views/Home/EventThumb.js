import React from 'react';
import { View,Text,StyleSheet, Pressable, ScrollView, ImageBackground } from "react-native";
import Stars from './Stars';
import { useNavigation } from "@react-navigation/native";

import EventDetails from '../EventDetails/EventDetails';

const EventThumb = ({eventos, filter, isOrg}) => {
    const getCategoryColor = (value) => {
        switch(value){
            case 1:
                return "rgba(189, 0, 170, 0.7)"
            case 2:
                return "rgba(0, 155, 189, 0.7)"
            default:
                return "rgba(160, 189, 0.7)"
        }
    }

    

    const navigation = useNavigation()

    if(filter){
        
    }
    return (
        <View style={styles.category}>
                    <Text style={styles.categoryTitle}>{isOrg?'Seus eventos':'Eventos em destaque'}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {eventos.map((item, index) => {
                            return filter?filter === item.categoria? <Pressable style={[styles.cardEvent, {marginLeft: 10, marginRight:40}]} 
                                onPress={() => navigation.navigate('EventDetails', {id: item.id, isOrg})} key={index.toString()} >
                                <ImageBackground source={item.image?item.image:require('../../img/Party1.jpg')} style={styles.imagem} imageStyle={{ borderRadius: 12}}>
                                    <View style={[styles.bottomCard, {backgroundColor: getCategoryColor(item.categoria)}]}>
                                        <View style={{marginTop:10}}>
                                            <Text style={styles.textEvent} >{item.nome}</Text>
                                            <Text style={[styles.textEvent,{marginTop:10}]} > R${item.valor?item.valor:40} / 1° Lote</Text>
                                        </View>
                                        <View style={[styles.atletica]}>
                                            <svg fill="#fff" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
    
                                            <View style={{marginLeft:10}}>
                                                <Text style={[styles.textEvent,{marginBottom:3},{fontSize:13}]} >{item.sigla}</Text>
                                                <Stars/>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </Pressable>:<></>:<Pressable style={[styles.cardEvent, {marginLeft: 10, marginRight:40}]} 
                                onPress={() => navigation.navigate('EventDetails', {id: item.id, isOrg})} key={index.toString()} >
                                <ImageBackground source={item.image?item.image:require('../../img/Party1.jpg')} style={styles.imagem} imageStyle={{ borderRadius: 12}}>
                                    <View style={[styles.bottomCard, {backgroundColor: getCategoryColor(item.categoria)}]}>
                                        <View style={{marginTop:10}}>
                                            <Text style={styles.textEvent} >{item.nome}</Text>
                                            <Text style={[styles.textEvent,{marginTop:10}]} > R${item.valor?item.valor:40} / 1° Lote</Text>
                                        </View>
                                        <View style={[styles.atletica]}>
                                            <svg fill="#fff" height={25} viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
    
                                            <View style={{marginLeft:10}}>
                                                <Text style={[styles.textEvent,{marginBottom:3},{fontSize:13}]} >{item.sigla}</Text>
                                                <Stars/>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </Pressable>
                        })}

                    </ScrollView>
                </View>
    );
};

export default EventThumb;

const styles = StyleSheet.create({
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
    imagem: {
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
    categoryTitle: {
        // fontFamily: 'Montserrat',
        fontSize: 16,
        paddingHorizontal: 25,
        color: "#000",
        marginBottom: 10
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
    cardEventTitle: {
        color: "FFF",
        fontFamily: "Montserrat",
        fontSize: 12
    },
});


