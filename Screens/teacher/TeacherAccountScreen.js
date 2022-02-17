import { NavigationContainer } from '@react-navigation/native';
import React, {Component,useEffect, useState} from 'react';
import { Alert,TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList, SafeAreaView,ActivityIndicator } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

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
    const stat = useSelector(state => state.statReducer.stat);
    const username = useSelector(state => state.usernameReducer.username);
    const nickname = useSelector(state => state.nicknameReducer.nickname);
    const dispatch = useDispatch(); 

    const [approved, setApproved] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [waiting, setWaiting] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

const getrequestData = async () => {
const API_URL = 'https://mufyptest.herokuapp.com/api/user/questions/count/';
var requestStatus = [];
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
                username: username,
            }),
                
        });
          const json = await response.json();

         if(response.status == 200){
             
             for(let i = 0; i<json.length; i++){
                 console.log(json[i]._id);
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
        setApproved(requestStatus[REQUEST_STATUS.approved]);
        setRejected(requestStatus[REQUEST_STATUS.rejected]);
        setWaiting(requestStatus[REQUEST_STATUS.waiting]);
      console.log("user history found");
        // console.log('requestStatus', requestStatus.keys());

    }
}

useEffect(()=>{
    getrequestData();
},[]);

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
                <Text style={{padding:SIZES.padding}}>Request(s) you have made : 7</Text>
                <Text style={{padding:SIZES.padding}}>Approved Request(s): {approved}/7</Text>
                <Text style={{padding:SIZES.padding}}>Rejected Request(s): 0/7</Text>
                <Text style={{padding:SIZES.padding}}>Waiting Request(s): {waiting}/7</Text>
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
