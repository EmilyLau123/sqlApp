import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import {
    Text,
    Image,
    Button,
    Input,
    onChangeText,
    Card,
    Tab,
    TabView
    } from 'react-native-elements';
import {StyleSheet,Alert,SafeAreaView} from 'react-native';
import { STYLES,SIZES, COLORS } from '../components/style/theme';
import { submitForm } from 'react-native-form-component';

const style = StyleSheet.create({
   
    button: {
        alignItems:'center',
        alignContent:'center'
        
    }
});



const SignInScreen = ({navigation}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState(0);
    const [index,setIndex] = useState(0);


    const loginUser = async () => {
        console.log(username,password, role);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/login/';
    
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
                role: role
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
            console.log("json",json);
            Alert.alert("Success","Sign In success",
            [
                {
                  text: "Close",
                  onPress: () => navigation.navigate("Home",{
                      role:json[0].role,
                      status:true,
                      nickname:json[0].nickname,
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

    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
                <Tab
                    value={index}
                    onChange={(e) => {setIndex(e);setRole(e)}}
                    indicatorStyle={{
                    backgroundColor: 'white',
                    height: 2,
                    }}
                    variant="primary"
                >
                    <Tab.Item
                        title="Sign in as student"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'pencil-outline', type: 'ionicon', color: 'white' }}
                    />
                    <Tab.Item
                        title="Sign in as teacher"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'school-outline', type: 'ionicon', color: 'white' }}
                    />
                </Tab>
            <TabView value={index} onChange={setIndex, setRole} animationType="spring">
                <TabView.Item style={{backgroundColor:COLORS.background}}>
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
                            onPress={()=>loginUser(username,password,role)}/>

                        <Text style={{textAlignVertical: "center",textAlign: "center"}}>If you do not have an account yet, Sign up now!</Text>
                            <Button title='GO SIGN UP'
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
                                onPress={()=>navigation.navigate("SignUp")}/>
                    </Card> 
                </TabView.Item>
                <TabView.Item style={{backgroundColor:COLORS.background}}>
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
                            onPress={()=>loginUser(username,password,role)}/>

                        <Text style={{textAlignVertical: "center",textAlign: "center"}}>If you do not have an account yet, Sign up now!</Text>
                            <Button title='GO SIGN UP'
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
                                onPress={()=>navigation.navigate("SignUp")}/>
                    </Card> 
                </TabView.Item>
            </TabView>
        </SafeAreaView>
    );
}
export default SignInScreen;