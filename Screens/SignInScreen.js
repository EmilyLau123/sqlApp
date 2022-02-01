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
    TabView,
    LinearProgress,
    Overlay
    } from 'react-native-elements';

import {StyleSheet,Alert,SafeAreaView, Model, View} from 'react-native';
import { STYLES,SIZES, COLORS, USER_STATUS } from '../components/style/theme';
import { submitForm } from 'react-native-form-component';

//auth
import {changeNickname, changeRole, changeUserId, changeStat, changeEmail,changePassword} from '../model/action'
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

    const [isLoading,setIsLoading] = useState(false);

    const toggleOverlay = (status) => {
        setIsLoading(status);
    };
  
    //  const roleUtil = useContext(RoleContext);

     const loginUser = async (username,password, userRole) => {
        console.log(username,password, userRole);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/login/';
    
        try {
            toggleOverlay(true);
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
             
            // setLoggedIn(true);
            // setNickname(json[0].nickname);
            if(json[0].status == USER_STATUS.approved){
                dispatch(changeUserId(json[0]._id));
                dispatch(changeRole(userRole));
                dispatch(changeNickname(json[0].nickname));
                dispatch(changeStat(json[0].quizDone));
                dispatch(changeEmail(json[0].email));
                dispatch(changePassword(json[0].password));

                
                console.log("json",json);
                Alert.alert("Success","Sign In success",
                [
                    {
                    text: "Close",
                    onPress: () => navigation.navigate("Home"),
                    style: "close",
                    },
                ]
                );
            }else{
                alert("User is not approved or is banned");
            }
         }else{
             toggleOverlay();
             alert("User not found");
             
         }
         
       } catch (error) {
         console.error(error);
       } finally {
           toggleOverlay(false);
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
                        icon={{ name: 'build-outline', type: 'ionicon', color: 'white' }}
                    />
                </Tab>
            <TabView value={index} onChange={setIndex, setUserRole} animationType="spring">
                <TabView.Item style={{backgroundColor:COLORS.background, margin:20,
          alignItems: 'center', //Centered vertically
          flex:1}}>
                    <Card borderRadius={SIZES.round}>
                        <Text style={{textAlignVertical: "center",textAlign: "center"}}>You have not login yet.</Text>
                        <Text>Username :</Text><Input
                                style={STYLES.input}
                                onChangeText={username => setUsername(username)}
                                defaultValue={username}
                            />
                        <Text>Password :</Text>
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
                <TabView.Item style={{backgroundColor:COLORS.background, margin:20,
                                        alignItems: 'center', //Centered vertically
                                        flex:1}}>
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
                <TabView.Item style={{backgroundColor:COLORS.background, margin:20,
                                        alignItems: 'center', //Centered vertically
                                        flex:1}}>
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
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                            // onPress={()=>loginUser(username,password,role)}/>
                            onPress={()=>loginUser(username,password, userRole)}/>
                    </Card> 
                </TabView.Item>
            </TabView>
            <Overlay isVisible={isLoading} onBackdropPress={()=>toggleOverlay(true)}>
              <View style={{height:100, width:250, margin:10}}>
                <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                <LinearProgress color={COLORS.primary}/>
              </View>
            </Overlay>
        </SafeAreaView>

    );
}
export default SignInScreen;