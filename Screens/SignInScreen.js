import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import {
    Text,
    Image,
    Button,
    Input,
    onChangeText,
    Card
    } from 'react-native-elements';
import {StyleSheet,View,SafeAreaView} from 'react-native';
import { STYLES,SIZES, COLORS } from '../components/style/theme';
import { submitForm } from 'react-native-form-component';

const style = StyleSheet.create({
   
    button: {
        alignItems:'center',
        alignContent:'center'
        
    }
});

function submit(){
    setUsername(value);
}

const SignInScreen = ({navigation}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
            <Card borderRadius={SIZES.round}>
                <Text style={{textAlignVertical: "center",textAlign: "center"}}>You have not login yet.</Text>
                <Text>Username : {username}</Text><Input
                        style={STYLES.input}
                        onChangeText={username => setUsername(username)}
                        defaultValue={username}
                    />
                <Text>Password : {password}</Text>
                <Input
                    style={STYLES.input}
                    onChangeText={password => setPassword(password)}
                    defaultValue={password}
                    secureTextEntry={true}
                    /> 
                <Button title="SIGN IN"
                    // titleStyle={{ color: '#2465a0' }}
                    buttonStyle={{
                    backgroundColor: '#2465a0',
                    borderWidth: 2,
                    borderColor: '#2465a0',
                    borderRadius: 30,
                    }}
                    containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>alert('sign in complete')}/>

                <Text style={{textAlignVertical: "center",textAlign: "center"}}>If you do not have an account yet, Sign up now!</Text>
                    <Button title='GO SIGN UP'
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
                        onPress={()=>navigation.navigate("SignUp")}/>
            </Card>
        </SafeAreaView>
    );
}
export default SignInScreen;