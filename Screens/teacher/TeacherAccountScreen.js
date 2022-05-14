import { NavigationContainer } from '@react-navigation/native';
import React, {Component,useEffect, useState} from 'react';
import { Alert,TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList, SafeAreaView,ActivityIndicator } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS,REQUEST_STATUS} from '../../components/style/theme';

//auth
import {changeNickname, changeRole, changeUserId, replaceStat, changeEmail, changePassword} from '../../model/action'
import { useDispatch, useSelector } from 'react-redux';

function logOut(dispatch){
    dispatch(changeRole(USER_ROLE.anonymous));
    dispatch(changeNickname("stranger"));
    dispatch(changeUserId(""));
    dispatch(changePassword(""));
    dispatch(changeEmail(""));
    dispatch(replaceStat([]));
    console.log("Logged out");
    return alert("Logged out");
}

export function teacherMainAccountScreen({navigation}){
    const userId = useSelector(state => state.userIdReducer.user_id);
    const nickname = useSelector(state => state.nicknameReducer.nickname);
    const dispatch = useDispatch(); 

    const [approved, setApproved] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [waiting, setWaiting] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getrequestData = async () => {
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/questions/count/';
    var requestStatus = [0,approved,rejected,waiting];
    try {
        
        setIsLoading(true);
        console.log('fetch');
        const response = await fetch(API_URL,{
            method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                userId: userId,
            }),
                
        });
          const json = await response.json();

         if(response.status == 200){
             
             for(let i = 0; i<json.length; i++){
                 console.log("json ID:"+json[i]._id + " count:" +json[i].count);
                 var st = json[i]._id;
                 requestStatus[st] = json[i].count;
             }
             

            setIsLoading(false);
            
         }else{
           console.log("error");
         }
    }catch(error){
      console.log(error);
    }finally{
        console.log(approved);
        if(requestStatus[REQUEST_STATUS.approved] != undefined){
            setApproved(requestStatus[REQUEST_STATUS.approved]);
        }
        if(requestStatus[REQUEST_STATUS.rejected] != undefined){
            setRejected(requestStatus[REQUEST_STATUS.rejected]);
        }
        if(requestStatus[REQUEST_STATUS.waiting] != undefined){
            setWaiting(requestStatus[REQUEST_STATUS.waiting]);
        }
        setTotal(approved+rejected+waiting);
        console.log("user history found");
        console.log(approved+rejected+waiting);
        // console.log('requestStatus', requestStatus.keys());

    }
}

useFocusEffect(
    React.useCallback(() => {
        getrequestData(approved, rejected, waiting);
      // Do something when the screen is focused
      return () => {
        console.log('not focused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
   );


    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <Card borderRadius={SIZES.round}>
                <Card.Title>Welcome</Card.Title>
                <Card.Divider />
                <Text style={{padding:SIZES.padding}}>Hello! {nickname}</Text>
                <Card.Divider />
                    <Card.Title>About Submitted request</Card.Title>
                <Card.Divider />
            {isLoading?(
                <ActivityIndicator/>
            ):(
            <>
                <Text style={{padding:SIZES.padding}}>Request(s) you have made : {total}</Text>
                <Text style={{padding:SIZES.padding}}>Approved Request(s): {approved}/{total}</Text>
                <Text style={{padding:SIZES.padding}}>Rejected Request(s): {rejected}/{total}</Text>
                <Text style={{padding:SIZES.padding}}>Waiting Request(s): {waiting}/{total}</Text>
            </>
            )}
                 </Card>

                    {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
                <Button title={STRINGS.submitHistory}
                    buttonStyle={{
                        backgroundColor: COLORS.primary,
                        borderWidth: 2,
                        borderColor: COLORS.secondary,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}  
                    onPress={()=>navigation.navigate("SubmitHistory")}>
                </Button>
    
                <Button title={STRINGS.accountSetting}
                    buttonStyle={{
                        backgroundColor: COLORS.secondary,
                        borderWidth: 2,
                        borderColor: COLORS.secondary,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}  
                    onPress={()=>navigation.navigate("AccountSetting")}>
                </Button>
                <Button title={STRINGS.logOut}
                    buttonStyle={{
                        backgroundColor: COLORS.black,
                        borderWidth: 2,
                        borderColor: COLORS.black,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }} 
                    onPress={()=>logOut(dispatch)}>
                </Button>
        </SafeAreaView>
        );
}
