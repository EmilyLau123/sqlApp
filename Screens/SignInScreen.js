import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import {
    Text,
    View,
    Image,
    Button,
    TextInput,
    StyleSheet,
    onChangeText
    } from 'react-native';
import { submitForm } from 'react-native-form-component';

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,

      },
      Button:{
        borderWidth: 1,
        borderRadius: 4,

      }
});

function submit(){
    setUsername(value);
}

const SignInScreen = ({navigation}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    return(
        <View>
            <Text style={{textAlignVertical: "center",textAlign: "center"}}>You have not login yet.</Text>
            <Text>Username : {username}</Text><TextInput
                    style={styles.input}
                    onChangeText={username => setUsername(username)}
                    defaultValue={username}
                />
            <Text>Password : {password}</Text>
            <TextInput
                   style={styles.input}
                   onChangeText={password => setPassword(password)}
                   defaultValue={password}
                /> 
            <Button title='Login' onPress={username=>alert({username})}></Button>
            <Text style={{textAlignVertical: "center",textAlign: "center"}}>If you do not have an account yet, Sign up now!</Text>
            <Button title='Sign Up' onPress={()=>navigation.navigate("SignUp")}></Button>

        </View>
    );
}
export default SignInScreen;