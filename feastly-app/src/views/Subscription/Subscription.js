import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View,Text,TextInput,StyleSheet,Pressable } from "react-native";
import Input from "../../components/Input/Input";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";


const Subscription = () => {
    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [cep, setCep] = useState()
    const [endereco, setEndereco] = useState()
    const navigation = useNavigation()

    const back = () => {
        navigation.goBack()
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={{width: 25, height: 25, backgroundColor: 'white'}} onPress={()=>back()}>
                    <AntDesign name="arrowleft" size={24} color="black"/>
                </Pressable>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.title}>Feastly</Text>
                    <Text style={styles.title2}>Premium</Text>
                </View>
                <View style={{width: 50}} />
            </View>
            <View style={[{marginBottom:20}]}>
                <Text style={styles.SubTitle}>
                    Vantagens na compra de ingressos, 
                    
                </Text>
                <Text style={styles.SubTitle}>
                prioridade na publicação de feedbacks
                </Text>

            </View>

            <Text style={[{marginBottom:10}]} >Escolha seu plano</Text>
            <View style={styles.paymentPlansContainer}>
                <View style={styles.paymentPlan}> 
                    <Text style={[{fontSize:12},{fontWeight:"bold"}]}>Mensal</Text>
                    <Text>R$ 27,90/Mês</Text>
                </View>
                <View style={styles.paymentPlan}>
                    <Text style={[{fontSize:12},{fontWeight:"bold"}]} >Anual</Text>
                    <Text>R$ 300,00/Ano</Text>
                </View>
            </View>
            <View style={[{marginTop:20},{marginBottom:10}]}><Input text={nome} setText={setNome} title="Nome"/></View>
            
                        
            <View  style={[{marginTop:10},{marginBottom:20},{display:'flex'},{flexDirection:'row'}]} > 
                <View style={[{width:'48%'},{marginRight:'4%'}]}><Input text={cpf} setText={setCpf} title="Cpf"/></View>
                <View style={[{width:'48%'}]}><Input text={cep} setText={setCep} title="Cep"/></View>
                {/* <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={e => setCpf(e)} placeholderTextColor={"rgba(255,255,255,0.6)"}/> */}
            </View>

            <View style={[{marginBottom:10}]}><Input text={endereco} setText={setEndereco} title="Endereço"/></View>
            <Text>Métodos de pagamento</Text>
            
            <View style={styles.paymentsTypeContainer}>
                <View style={styles.paymentType}><Text>Crédito</Text></View>
                <View style={styles.paymentType}><Text>Debito</Text></View>
                <View style={styles.paymentType}><Text>Pix</Text></View>
            </View>

            <View style={styles.btnContainer}>
                <Pressable style={ styles.button} onPress={() => registerEvent()}>
                    <Text style={styles.textBtn}>Concluir Assinatura</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Subscription

const styles = StyleSheet.create({
    paymentsTypeContainer:{
        display:"flex",
        flexDirection:'row',

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
        fontSize: 18
    },
    title2: {
        color: "#000",
        fontFamily: 'Montserrat-Italic',
        fontSize: 18
    },
    paymentType:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:'1px solid #000',
        height: 25,
        width:60,
        borderRadius:5,
        margin:5
    },
    paymentPlan:{
        backgroundColor: "#f2f2f2",
        width:'40%',
        height:50,
        padding:10,
        borderRadius:13
    },
    paymentPlansContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding:10
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
        width:'90%',
        alignItems: 'center',
        backgroundColor: '#00A3FF',
        padding: 10,
        marginTop:30,
        borderRadius:15,
    },
    textBtn:{
        color:'#FFF',
        fontSize:16
    },
    btnContainer:{
        width:'100%',
        height:200,
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    TextLogo:{
        fontSize: 10,
        marginBottom:5,
        color:'#000',
        fontSize: 24,
        fontFamily: 'Montserrat-Bold'
    },
    SubTitle: {
        color:'#000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15

    }
});
