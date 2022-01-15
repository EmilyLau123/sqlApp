import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
//import { Form, FormItem } from 'react-native-form-component';
//https://www.npmjs.com/package/react-native-form-component

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
},
});

const Stack = createStackNavigator();

const SignUpScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    function submit(username, nickname, password){
        fetch('http://localhost:8099/api/insertUser/',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password,
                nickname: nickname,
                role: 'student'
              })
        });
    }
//https://reactnavigation.org/docs/params passing values
    return(
        <SafeAreaView style={{flex:1}}>
            <View>
                <Text style={{textAlignVertical: "center",textAlign: "center"}}>Let's start learning SQL!</Text>
                <Text>Username*</Text><Input
                        style={styles.input}
                        onChangeText={username => setUsername(username)}
                        defaultValue={username}
                    />
                <Text>Name</Text><Input
                        style={styles.input}
                        onChangeText={nickname => setNickname(nickname)}
                        defaultValue={nickname}
                    />
                <Text>Password*</Text><Input
                        style={styles.input}
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                    />
                <Button title='SIGN UP'
                        buttonStyle={{
                            backgroundColor: '#77afac',
                            borderWidth: 2,
                            borderColor: '#77afac',
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 'auto',
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>submit(username, nickname, password)}/>
            </View>
        </SafeAreaView>

    )

}

export default SignUpScreen;