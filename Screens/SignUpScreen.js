import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, SafeAreaView,Alert} from 'react-native';
import { Text, Button, Input, Card, Tab, TabView } from 'react-native-elements';
import {STYLES, COLORS, SIZES, USER_ROLE} from '../components/style/theme';
//import { Form, FormItem } from 'react-native-form-component';
//https://www.npmjs.com/package/react-native-form-component

const Stack = createStackNavigator();

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [role, setRole] = useState(0);
    const [index, setIndex] = useState(0);



    const insertUser = async () => {
        console.log(username,password,nickname, role);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'http://localhost:8099/api/user/insert/';
    
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
                role: role
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
console.log(index, role);

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
                        title="Sign up as student"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'pencil-outline', type: 'ionicon', color: 'white' }}
                    />
                    <Tab.Item
                        title="Sign up as teacher"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'school-outline', type: 'ionicon', color: 'white' }}
                    />
                </Tab>
                <TabView value={index} onChange={setIndex, setRole} animationType="spring">
                    <TabView.Item style={{backgroundColor:COLORS.background}}>
                        <Card borderRadius={SIZES.round}>   
                             <Text>Username*</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={username => setUsername(username)}
                                    defaultValue={username}
                                    placeholder="For login"
                                />
                            <Text>Nickname</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={nickname => setNickname(nickname)}
                                    defaultValue={nickname}
                                    placeholder="How should we call you?"

                                />
                            <Text>Password*</Text>
                                <Input
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
                                onPress={()=>insertUser(username, nickname, password, role)}
                            />
                        </Card>
                    </TabView.Item>
                    <TabView.Item style={{backgroundColor:COLORS.background}}>
                        <Card borderRadius={SIZES.round}>   
                             <Text>Username*</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={username => setUsername(username)}
                                    defaultValue={username}
                                    placeholder="For login"
                                />
                            <Text>Nickname</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={nickname => setNickname(nickname)}
                                    defaultValue={nickname}
                                    placeholder="How should we call you?"

                                />
                            <Text>Password*</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={password => setPassword(password)}
                                    defaultValue={password}
                                    placeholder="For login"
                                    secureTextEntry={true}
                                />
                            <Text>Reason</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={password => setPassword(password)}
                                    defaultValue={password}
                                    placeholder="For login"
                                    secureTextEntry={true}
                                />
                            <Button title='images to proof'
                                buttonStyle={{
                                    backgroundColor: COLORS.attention,
                                    borderWidth: 2,
                                    borderColor: COLORS.attention,
                                    borderRadius: 30,
                                    }}
                                containerStyle={{
                                    width: 'auto',
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                    }}
                                titleStyle={{ fontWeight: 'bold' }}
                                onPress={()=>alert("for teacher to upload proof of teacher (e.g. teacher card)")}
                            />
                            
                            <Button title='SIGN UP AS TEACHER'
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
                                onPress={()=>insertUser(username, nickname, password, role)}
                            />
                        </Card>
                    </TabView.Item>
                </TabView>
                
        </SafeAreaView>

    )

}

export default SignUpScreen;