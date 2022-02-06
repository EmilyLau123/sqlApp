import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState, useEffect } from 'react';
import {
    Text,
    Image,
    Button,
    Input,
    onChangeText,
    Card,
    LinearProgress,
    Overlay
    } from 'react-native-elements';

import {StyleSheet,Alert,SafeAreaView, Model, View} from 'react-native';
import {STYLES, COLORS, SIZES} from '../../components/style/theme';
import { useNavigation } from '@react-navigation/native';
import {PasswordResetScreen} from './PasswordResetScreen';



export function PasswordEmailScreen({navigation}){
    const [email, setEmail] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const toggleOverlay = (status) => {
        setIsLoading(status);
    };
    async function verifyEmail(userEmail){
        
        // try{

        //     alert("should fetch api 200 if email is found");
        //     navigation.navigate("PasswordReset");

        // }catch(error){
        //     alert("Something went wrong!");
        // }
        // const navigation = useNavigation();

        // console.log("should fetch api 200 if email is found");
        const API_URL='https://mufyptest.herokuapp.com/api/user/account/email/verify/';
        try {
            toggleOverlay(true);
            const response = await fetch(API_URL,{
                method:"POST",
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                body: JSON.stringify({
                    email: userEmail
                }),
                
            });
            const json = await response.json();
            if(response.status == 503){
                return alert("This email address have not been registered. Please try again with another email address.");
            }else if(response.status == 200){
                console.log(json[0]._id);
            Alert.alert("Success","Email verified",
                [
                    {
                    text: "Close",
                    onPress: () => navigation.navigate("PasswordReset",{
                        userId:json[0]._id,
                        email: userEmail
                    }),
                    style: "close",
                    },
                ]
                );
            }
        }catch(error){
            alert("Something went wrong");
        }
    }

    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
            <Card borderRadius={SIZES.round}>
            <Text style={{justifyContent:"center",fontWeight:"bold"}}>Please enter your registered email address, So that we can reset your password.</Text>
                <Text style={{paddingTop:10}}>Email:</Text>
                    <Input
                        style={STYLES.input}
                        onChangeText={email => setEmail(email)}
                        defaultValue={email}
                    
                        /> 
            </Card>
                <Button title="Reset password"
                    // titleStyle={{ color: '#2465a0' }}
                    buttonStyle={{
                    backgroundColor: COLORS.primary,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 30,
                    }}
                    containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>verifyEmail(email)}/>
            <Overlay isVisible={isLoading}>
                <View style={{height:100, width:250, margin:10}}>
                    <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                    <LinearProgress color={COLORS.primary}/>
                </View>
            </Overlay>
        </SafeAreaView>

    );

}