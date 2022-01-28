import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useState, useEffect } from 'react';
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

//auth
import {changeNickname, changeRole, changeUserId, changeStat} from '../model/action'
import { useDispatch, useSelector } from 'react-redux';

const style = StyleSheet.create({
   
    button: {
        alignItems:'center',
        alignContent:'center'
        
    }
});




const SignInScreen = ({navigation}) => {
    

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [userRole,setUserRole] = useState(0);

    // const [userRole,setUserRole] = useSelector(state => state.roleReducer.role);
    const [index,setIndex] = useState(0);
    const [loggedIn,setLoggedIn] = useState(false);
    const [nickname,setNickname] = useSelector(state => state.nicknameReducer.nickname);
    const [userId,setUserId] = useSelector(state => state.userIdReducer.user_id);
    const [stat,setStat] = useSelector(state => state.statReducer.stat);

        // const [nickname,setNickname] = useSelector(store.getState());


         const dispatch = useDispatch(); 

  
    //  const roleUtil = useContext(RoleContext);

     const loginUser = async (username,password, userRole) => {
        console.log(username,password, userRole);
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
                role: userRole
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
            setLoggedIn(true);
            // setNickname(json[0].nickname);
            dispatch(changeUserId(json[0]._id));
            dispatch(changeRole(userRole));
            dispatch(changeNickname(json[0].nickname));
            dispatch(changeStat(json[0].quizDone));
            console.log("json",json);
            Alert.alert("Success","Sign In success",
            [
                {
                  text: "Close",
                  onPress: () => navigation.navigate("Home"
                //   ,{
                //       role:json[0].role,
                //       status:true,
                //       nickname:json[0].nickname,
                //   }
                  ),
                  style: "close",
                },
              ]
            );
         }else{
             alert("User not found");
         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }

// useEffect(()=>{
//     console.log("change");
// },[loggedIn]

// )

    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
                <Tab
                    value={index}
                    onChange={(e) => {setIndex(e);setUserRole(e)}}
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
                    <Tab.Item
                        title="Sign in as admin"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'school-outline', type: 'ionicon', color: 'white' }}
                    />
                </Tab>
            <TabView value={index} onChange={setIndex, setUserRole} animationType="spring">
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
                            // onPress={()=>loginUser(username,password,role)}/>
                            onPress={()=>loginUser(username,password, userRole)}/>


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
                            // onPress={()=>loginUser(username,password,role)}/>
                            onPress={()=>loginUser(username,password, userRole)}/>


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
                            // onPress={()=>loginUser(username,password,role)}/>
                            onPress={()=>loginUser(username,password, userRole)}/>
                    </Card> 
                </TabView.Item>
            </TabView>
        </SafeAreaView>

    );
}
export default SignInScreen;