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
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StyleSheet,Alert,SafeAreaView, Model, View} from 'react-native';
import {STYLES, COLORS, SIZES} from '../../components/style/theme';
import { toggleOverlay } from "../SignInScreen";


 


export function PasswordResetScreen({route,navigation}){
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const userId = route.params.userId;
    const userEmail = route.params.email;
    const [isLoading,setIsLoading] = useState(false);

    const toggleOverlay = (status) => {
        setIsLoading(status);
    };

    //reset user password
    const resetPassword = async(userId,newpassword, confirmPassword) => {
        
    
        if(newpassword != "" && confirmPassword != ""){
            if(newpassword != confirmPassword){
                return alert("new password and confirm password should be the same");

            }else{
                // var salt = bcrypt.genSaltSync(10);
                // var hash = bcrypt.hashSync(confirmPassword, salt);
                console.log("All good");
            }
        }else{
                return alert("Please enter value in all input box.");
            
        }
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/account/password/reset/';

        try {
                    console.log(confirmPassword,userId);

            toggleOverlay(true);
        const response = await fetch(API_URL,{
            method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                user_id: userId,
                password: confirmPassword,
                // updated_at: Danow(),
            }),
            
        });
        const json = await response.json();
        if(response.status == 200){
            toggleOverlay(false);
            console.log("json",json);
            Alert.alert("Success","Your password is reseted",
            [
                {
                    text: "Close",
                    onPress: () => navigation.navigate("HomePage"),
                    style: "close",
                },
                ]
            );
        }else{
            alert("oops");
        }
        } catch (error) {
            console.log(error);
        } finally {
        // setLoading(false);
            console.log("done");
        }
    }


    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
            <Card borderRadius={SIZES.round}>
            <Text style={{justifyContent:"center",fontWeight:"bold"}}>Please reset your password for account registered with email address:</Text>
            <Text style={{justifyContent:"center",fontWeight:"bold", paddingBottom:20, color:"blue"}}>{userEmail}</Text>
              <Card.Title> 
                
                <Ionicons name={"lock-closed-outline"} size={16} color={COLORS.black} />
                <Text>Reset password</Text>
              </Card.Title>
              <Card.Divider />
                
              <Text size={SIZES.text} 
                    style={{padding:SIZES.padding, fontWeight:"bold"}}
                    >
                  New password:{newPassword}</Text><Input
                    placeholder="Enter your new password"
                    secureTextEntry={true}
                    value={newPassword} 
                    onChangeText={(value)=>setNewPassword(value)}
                  /> 
              <Text size={SIZES.text} 
                    style={{padding:SIZES.padding, fontWeight:"bold"}}
                    
                    >Confirm new password:{confirmPassword}</Text><Input
                    placeholder="Enter your new password again"
                    secureTextEntry={true}
                    value={confirmPassword} 
                    onChangeText={(value)=>setConfirmPassword(value)}
                  /> 
            </Card>
                <Button title="Confirm new password"
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
                    onPress={()=>resetPassword(userId,newPassword,confirmPassword)}/>

        </SafeAreaView>

    );

}