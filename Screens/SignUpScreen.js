import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
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
      Button:{
        borderWidth: 1,
        borderRadius: 4,

      }
});

const Stack = createStackNavigator();

const SignUpScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
//https://reactnavigation.org/docs/params passing values
    return(
        <View>
        <Text style={{textAlignVertical: "center",textAlign: "center"}}>Let's start learning SQL!</Text>
        <Text>Username*</Text><TextInput
                style={styles.input}
                onChangeText={username => setUsername(username)}
                defaultValue={username}
            />
        <Text>Name</Text><TextInput
                style={styles.input}
                onChangeText={name => setName(name)}
                defaultValue={name}
            />
        <Text>Password*</Text><TextInput
                style={styles.input}
                onChangeText={password => setPassword(password)}
                defaultValue={password}
            />
        <Button title='Sign Up' onPress={()=>alert('signUp complete')}></Button>
    </View>

    )

}

export default SignUpScreen;