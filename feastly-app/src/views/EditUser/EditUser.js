import { useNavigation, useRoute } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { View,Text,TextInput,StyleSheet, Image, Alert, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading/Loading";
import * as imagemPicker from 'expo-image-picker'
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const EditUser = () => {

    const dispatch = useDispatch()
    const isOrg = useRoute().params.isOrg
    const id = useRoute().params.id

    const navigation = useNavigation()

    const [content, toggleContent] = useState("USER")

    const [nome, setNome] = useState()
    const [sobrenome, setSobrenome] = useState()
    const [data_nasc, setDataNasc] = useState()
    const [cpf, setCPF] = useState()
    const [tipo_usuario, setTipo] = useState()
    const [endereco, setEndereco] = useState()
    const [cidade, setCidade] = useState()
    const [sexo, setSexo] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [cep, setCEP] = useState()
    const [phone, setPhone] = useState()
    const [loading, toggleLoading] = useState(false)
    const [errorMsg, setErroMsg] = useState()
    const [imagem, setimagem] = useState(null);

    const [sigla, setSigla] = useState()
    const [cnpj, setCnpj] = useState()
    const [descricao, setDescricao] = useState()

    useEffect(()=>{
        if(isOrg){
            axios.get('http://localhost:3000/organizacoes/'+id)
            .then(res => {
                const data = res.data.data[0]
                setNome(data.nome)
                setEmail(data.email)
                setSigla(data.sigla)
                setCnpj(data.cnpj)
                setDescricao(data.descricao)
                setimagem(data.image)
                setSenha(data.senha)
             })
             .catch(err => {
                console.log(err)
             })
        }else{
            axios.get('http://localhost:3000/usuario/'+id)
             .then(res => {
                const data = res.data[0]
                setNome(data.nome)
                setSobrenome(data.sobrenome)
                setEmail(data.email)
                setCPF(data.cpf)
                setCidade(data.cidade)
                setSexo(data.sexo)
                setEndereco(data.endereco)
                setDataNasc(data.data_nasc)
                setimagem(data.image)
                setSenha(data.senha)
                setCEP(data.cep),
                setPhone(data.phone)
                console.log(res.data)
             })
             .catch(err => {
                console.log(err)
             })
        }
    }, [])

    const pickimagem = async () => {
        // No permissions request is necessary for launching the imagem library
        let result = await imagemPicker.launchImageLibraryAsync({
          mediaTypes: imagemPicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setimagem(result.assets[0].uri);
        }
      };



    const registerUser = () => {
        toggleLoading(true)
        setErroMsg('')
        setTimeout(() => {
            axios.put("http://localhost:3000/usuario/"+id, {nome, sobrenome, cep, cpf, email, image:imagem, senha, sexo, cidade, endereco, data_nasc, tipo_usuario: 1})
                .then(()=>{
                    toggleLoading(false)
                    Alert.alert("Usuário cadastrado com sucesso")
                    navigation.navigate("Home", {email})
                })
                .catch(error => {
                    toggleLoading(false)
                    setErroMsg(error.response.data.error)
                })
        }, 2000)
    }

    const registerORg = () => {
        toggleLoading(true)
        setErroMsg('')
        setTimeout(() => {
            axios.put("http://localhost:3000/organizacoes/"+id, {nome, sigla, image:imagem,descricao, cnpj,  email, senha})
                .then(()=>{
                    toggleLoading(false)
                    Alert.alert("Usuário cadastrado com sucesso")
                    navigation.navigate("Home", {email})
                })
                .catch(error => {
                    toggleLoading(false)
                    setErroMsg(error.response.data.error)
                })
        }, 2000)
    }

    const back = () => {
        navigation.goBack()
    }

    return <SafeAreaView style={styles.container}>
                 <View style={[styles.header, {marginBottom: 30}]}>
                <Pressable style={{width: 25, height: 25, backgroundColor: '#111'}} onPress={()=>back()}>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </Pressable>
                <Text style={styles.TextLogo}>Feastly</Text>
                <View style={{width: 25, height: 25, backgroundColor: '#111'}}/>
                </View>
                {!isOrg?
                <ScrollView style={styles.Scroll}>
                     <View style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        {imagem && (
                            <Image
                            source={imagem}
                            style={{ width: 200, height: 200, borderRadius: 100 }}
                            />
                        )}
                        <Pressable style={ styles.button} onPress={() => pickimagem()}>
                            <Text style={styles.text}>Escolher imagem</Text>
                        </Pressable>
                    </View>
                    <TextInput style={styles.input} placeholder="Nome" value={nome} 
                        onChangeText={e => setNome(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Sobrenome" value={sobrenome} 
                        onChangeText={e => setSobrenome(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Email" value={email} 
                        onChangeText={e => setEmail(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="CPF"    eholder="CPF" value={cpf} 
                        onChangeText={e => setCPF(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Data de Nascimento" value={data_nasc} 
                        onChangeText={e => setDataNasc(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Sexo" value={sexo} 
                        onChangeText={e => setSexo(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Senha" value={senha} 
                        onChangeText={e => setSenha(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Endereço" value={endereco} 
                        onChangeText={e => setEndereco(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="CEP" value={cep} 
                        onChangeText={e => setCEP(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    {/* <TextInput style={styles.input} placeholder="Telefone" value={phone} 
                        onChangeText={e => setPhone(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/> */}
                    <TextInput style={styles.input} placeholder="Cidade" value={cidade} 
                        onChangeText={e => setCidade(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                </ScrollView>:<ScrollView style={styles.Scroll}>
                    <View style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        {imagem && (
                            <Image
                            source={imagem}
                            style={{ width: 200, height: 200, borderRadius: 100 }}
                            />
                        )}
                        <Pressable style={ styles.button} onPress={() => pickimagem()}>
                            <Text style={styles.text}>Escolher imagemm</Text>
                        </Pressable>
                    </View>
                    <TextInput style={styles.input} placeholder="Nome" value={nome} 
                        onChangeText={e => setNome(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Sigla" value={sigla} 
                        onChangeText={e => setSigla(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Descrição" value={descricao} 
                        onChangeText={e => setDescricao(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Email" value={email} 
                        onChangeText={e => setEmail(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="CNPJ" value={cnpj} 
                        onChangeText={e => setCnpj(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Senha" value={senha} 
                        onChangeText={e => setSenha(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>

                </ScrollView>}
                <Pressable style={ styles.button} 
                    onPress={!isOrg?() => registerUser():()=>registerORg()}>
                    <Text style={styles.text}>Alterar</Text>
                </Pressable>
                <Text style={styles.TextErro}>{errorMsg}</Text>
                {loading?<Loading />:null}
            </SafeAreaView>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
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
        fontFamily: 'Nunito-Light'
        
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
        fontSize: 30,
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Montserrat-Bold'
    },
    TextSecundario:{
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito'
    },
    TextBold:{
        color:'rgba(255, 255, 255, 1)',
        fontFamily: 'Nunito-Bold'
    },
    TextErro:{
        marginTop: 10,
        color:'red',
        textAlign: 'center',
        fontFamily: 'Nunito-Light'
    },
    Scroll: {
        height: '80vh'
    },
    SelectContent: {
        width:270,
        display: 'flex',
        flexDirection: 'row'
    },
    SelectContentBtn: {
        width: '50%',
        borderBottomColor: "#FFF",
        borderBottomWidth: 2,
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Nunito-Bold'
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
});



export default EditUser