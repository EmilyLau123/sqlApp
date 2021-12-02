import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
//https://www.npmjs.com/package/react-native-form-component

const SignUpScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
//https://reactnavigation.org/docs/params passing values
    return(
        <View>
            <Text>HI</Text>
            <Form onButtonPress={() => console.warn('do something')}>
                <FormItem />
            </Form>
        </View>
    )

}

export default SignUpScreen;