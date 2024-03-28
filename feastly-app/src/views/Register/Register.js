import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { View,Text,TextInput,StyleSheet,TouchableOpacity, Alert, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";

const Register = () => {

    const dispatch = useDispatch()

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
    

    const [sigla, setSigla] = useState()
    const [cnpj, setCnpj] = useState()
    const [descricao, setDescricao] = useState()



    const registerUser = () => {
        toggleLoading(true)
        setErroMsg('')
        setTimeout(() => {
            axios.post("http://localhost:3000/usuario", {nome, sobrenome, cep, cpf, email, senha, sexo, cidade, endereco, data_nasc, tipo_usuario: 1})
                .then(()=>{
                    toggleLoading(false)
                    Alert.alert("Usuário cadastrado com sucesso")
                    navigation.navigate("Login")
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
            axios.post("http://localhost:3000/organizacoes", {nome, sigla, descricao, cnpj,  email, senha})
                .then(()=>{
                    toggleLoading(false)
                    Alert.alert("Usuário cadastrado com sucesso")
                    navigation.navigate("Login")
                })
                .catch(error => {
                    toggleLoading(false)
                    setErroMsg(error.response.data.error)
                })
        }, 2000)
    }

    return <SafeAreaView style={styles.container}>
                <Text style={styles.TextLogo}>Feastly</Text>
                <View style={styles.SelectContent}>
                    <Pressable style={[styles.SelectContentBtn, {opacity: content === "USER"?1:0.5}]}
                        onPress={()=>toggleContent("USER")}>
                        Usuário
                    </Pressable>
                    <Pressable style={[styles.SelectContentBtn, {opacity: content !== "USER"?1:0.5}]}
                        onPress={()=>toggleContent("ORG")}>
                       Organização
                    </Pressable>
                </View>
                {content === "USER"?
                <ScrollView style={styles.Scroll}>
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
                    <TextInput style={styles.input} placeholder="Telefone" value={phone} 
                        onChangeText={e => setPhone(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                    <TextInput style={styles.input} placeholder="Cidade" value={cidade} 
                        onChangeText={e => setCidade(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/>
                </ScrollView>:<ScrollView style={styles.Scroll}>
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

                </ScrollView
export const >}
                <Pressable style={ styles.button} 
                    onPress={content === "USER"?() => registerUser():()=>registerORg()}>
                    <Text style={styles.text}>Cadastrar</Text>
                </Pressable>
                <Text style={styles.TextErro}>{errorMsg}</Text>
                <Pressable  onPress={() => navigation.navigate('Login')} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={styles.TextSecundario}>Já possui um cadastro?</Text>
                    <Text style={[styles.TextBold, {marginLeft: 5}]}>Entrar</Text>
                </Pressable>
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
        marginBottom:5,
        color:'rgba(255, 255, 255, 1)',
        marginBottom: 40,
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
    }
});



export default Register