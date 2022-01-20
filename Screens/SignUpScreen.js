import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, SafeAreaView,Alert} from 'react-native';
import { Text, Button, Input, Card } from 'react-native-elements';
import {STYLES, COLORS, SIZES} from '../components/style/theme';
//import { Form, FormItem } from 'react-native-form-component';
//https://www.npmjs.com/package/react-native-form-component

const Stack = createStackNavigator();

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const insertUser = async () => {
        console.log(username,password,nickname);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'http://localhost:8099/api/insert/user/';
    
        try {
         const response = await fetch(API_URL,{
             method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                username: username,
                password: password,
                nickname: nickname,
                role: 8
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
            console.log("json",json);
            Alert.alert("Success","Sign up success",
            [
                {
                  text: "Close",
                  onPress: () => navigation.navigate("Home",{
                      role:8,
                      status:true,
                  }),
                  style: "close",
                },
              ]
            );
         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }
    
    //  useEffect(() => {
    //   getStatements();
    //  }, []);

    // var submit = async(username, nickname, password) =>{
    //     console.log(username);
    //     try{
    //         let result = await fetch('http://localhost:8099/api/insertUser/',{
    //             method:'POST',
    //             // headers: {
    //             //     Accept: 'application/json',
    //             //     'Content-Type': 'application/json'
    //             // },
    //             body: JSON.stringify({
    //                 username: username,
    //                 password: password,
    //                 nickname: nickname,
    //                 role: 8//student
    //             }),
    //         });
    //         let resJson = await res.json();
    //         if (res.status === 200 ){
    //             alert('DONE');
    //         }else{
    //             alert('FAIL');
    //         }
    //     }catch(err){
    //         alert('error: ',err);

    //     }
    // }
//https://reactnavigation.org/docs/params passing values
    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
            <Card borderRadius={SIZES.round}>
                <Text style={{textAlignVertical: "center",textAlign: "center", padding:SIZES.padding, fontWeight:"bold"}}>Let's start learning SQL!</Text>
                <Text>Username*</Text><Input
                        style={STYLES.input}
                        onChangeText={username => setUsername(username)}
                        defaultValue={username}
                        placeholder="For login"
                    />
                <Text>Nickname</Text><Input
                        style={STYLES.input}
                        onChangeText={nickname => setNickname(nickname)}
                        defaultValue={nickname}
                        placeholder="How should we call you?"

                    />
                <Text>Password*</Text><Input
                        style={STYLES.input}
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        placeholder="For login"
                        secureTextEntry={true}

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
                        onPress={()=>insertUser(username, nickname, password)}/>
            </Card>
        </SafeAreaView>

    )

}

export default SignUpScreen;