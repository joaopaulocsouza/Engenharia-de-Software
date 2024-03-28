import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React,{Component, useEffect, useState} from 'react';
import { View,Text,TextInput, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import Input from '../../components/Input/Input';
import { AntDesign } from '@expo/vector-icons'; 


const RegisterEvent = () => {
    const navigation = useNavigation()
    const [data, setData] = useState()
    const id = useRoute().params.id
    const [loading, toggleLoading] = useState(false)
    const [image, setImage] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [idade_minima, setIdade] = useState(18)
    const [valor, setValor] = useState(0.0)
    const [categoria, setCategory] = useState(1)

    const registerEvent = () => {

        toggleLoading(true)
        setTimeout(()=>{
            axios.post("http://localhost:3000/eventos", {nome, descricao, idade_minima, image, categoria, valor, organizacao_id: id})
            .then(res =>{
                console.log(res.data)
                toggleLoading(false)
                navigation.goBack()
            })
            .catch(error => {
                toggleLoading(false)
                setErroMsg(error.response.data.error)
            })
        }, 2000)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const back = () => {
        console.log("SAIIIIIIIIIIII")
        navigation.goBack()
      }
    
  
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={{width: 50, height: 50, backgroundColor: 'white'}} onPress={()=>back()}>
                    <AntDesign name="arrowleft" size={24} color="black"/>
                </Pressable>
                <Text style={styles.title}>Feastly</Text>
                <View style={{width: 50}} />
            </View>
            <ScrollView style={styles.content}>
                <Text>Novo evento</Text>
                <View style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {image && (
                        <Image
                        source={image}
                        style={{ width: 200, height: 200, borderRadius: 100 }}
                        />
                    )}
                    <Pressable style={ styles.button} onPress={() => pickImage()}>
                        <Text style={styles.text}>Escolher imagem</Text>
                    </Pressable>
                </View>
                <View style={{height: '10px'}}/>
                <Input text={nome} setText={setNome} title="Nome" />
                <View style={{height: '10px'}}/>
                <Input text={descricao} setText={setDescricao} title="Descrição"
                    textArea />
                <View style={{height: '10px'}}/>
                <View style={[styles.category]}>
                    <Text style={styles.categoryTitle}>
                        Categorias
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        styles={styles.categoryScroll} >
                        <Pressable style={[styles.categoryBtn, {marginLeft: 20},categoria === 1?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(categoria === 1?null:1)}>
                            <Text style={styles.textBtn}> Universitário</Text>
                        </Pressable>
                        <Pressable style={[styles.categoryBtn, {marginLeft: 20},categoria === 2?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(categoria === 2?null:2)}>
                            <Text style={styles.textBtn}> Infantil</Text>
                        </Pressable>
                        <Pressable  style={[styles.categoryBtn, {marginLeft: 20},categoria === 3?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(categoria === 3?null:3)}>
                            <Text style={styles.textBtn}> Restaurantes</Text>
                        </Pressable>
                        <Pressable  style={[styles.categoryBtn, {marginLeft: 20},categoria === 4?{backgroundColor: 'rgba(0,0,0,0.5)'}:{}]}
                            onPress={()=>setCategory(categoria === 4?null:4)}>
                            <Text style={styles.textBtn}> Outros</Text>
                        </Pressable>
                    </ScrollView>
                </View>
                <View style={{height: '10px'}}/>
                <Input text={valor} setText={setValor} title="Valor R$"
                    number />
                <View style={{height: '10px'}}/>
                <Input text={idade_minima} setText={setIdade} title="Idade minima"
                    number />
                <View  style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable style={ styles.button} onPress={() => registerEvent()}>
                        <Text style={styles.text}>Criar evento</Text>
                    </Pressable>
                </View>
            </ScrollView>
            {loading?<Loading />:null}
        </SafeAreaView>
    )
    
}

export default RegisterEvent


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 280
    },
    content: {
        paddingTop: 80,
        height: '80vh',
        width: '90vw'
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
    category: {
        width: '100%',
        marginBottom: 20,
        overflow: 'hidden'
    },
    categoryTitle: {
        fontFamily: 'Montserrat',
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
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
        marginRight: 10,
        position: 'relative'
    },
    cardEventContent: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'red'
    },
    cardEventTitle: {
        color: "FFF",
        fontFamily: "Montserrat",
        fontSize: 12
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
        backgroundColor: '#00A3FF',
        padding: 10,
        marginTop:30,
        borderRadius:15,
        
    },
    text:{
        fontSize: 14,
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito'
    }
});
