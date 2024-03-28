import React from "react";
import { View , StyleSheet, TextInput, Text} from "react-native";

const Input = ({text, setText, number, title, textArea}) => {
    const editText = (value) => {
        if(number){
            setText(Number(value))
        }else{
            setText(value)
        }
    }

    return <View style={styles.InputContent} >
        <View style={styles.TitleContent}>
            <Text>{title}</Text>
        </View>
        {!textArea?<TextInput style={styles.Input}
            value={text} onChangeText={e => editText(e)}  />:
            <TextInput style={styles.TextArea}
            value={text} onChangeText={e => editText(e)} multiline={5} /> }
    </View>
}

export default Input

const styles = StyleSheet.create({
    InputContent: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'none'
    },
    Input: {
        width: '100%',
        height: '40px',
        border: '1px solid #000',
        borderRadius: '20px',
        backgroundColor: 'none',
        paddingLeft: '5px'
    },
    TextArea: {
        paddingTop: '20px',
        width: '100%',
        height: '140px',
        border: '1px solid #000',
        borderRadius: '20px',
        backgroundColor: 'none',
        paddingLeft: '5px'
    },
    TitleContent: {
        borderRadius:30,
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#FFF',
        padding: 5
    }
})