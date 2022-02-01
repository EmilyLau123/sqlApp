import React, {Component, useState} from 'react';
import { Text,
         Button,
         Overlay,
         LinearProgress,
         
         Input,
         Card
        } from 'react-native-elements';
import {Modal, Pressable, Dimensions, TouchableOpacity, View,StyleSheet, SafeAreaView, Alert, Model} from 'react-native';
import 'react-native-gesture-handler';
import {COLORS, SIZES} from '../components/style/theme'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';
//auth
import { Provider, useSelector } from 'react-redux';


const accountSettingScreen = () =>{
    // const [newUsername,setNewUsername] = useState('');
    const [password,setPassword] = useState('');
    // const [newNickname,setNewNickname] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState(false);

    var oldPassword = useSelector(state => state.passwordReducer.password);


var oldNickname = useSelector(state => state.nicknameReducer.nickname);

    const [nickname,setNickname] = useState(oldNickname);

  var user_id = useSelector(state => state.userIdReducer.user_id);

 const [isLoading, setIsLoading] = useState(false);

  const toggleOverlay =(status) => {
        setIsLoading(status);
    };
  // setNickname(useSelector(state => state.nicknameReducer.nickname));
//ban a user
const updateUser = async(user_id, nickname, current_password, newpassword, confirmPassword) => {
  
  if(current_password != "" && newpassword != "" && confirmPassword != ""){
    if(current_password != oldPassword){
      return alert("Please enter correct current password");
    }else if(newpassword != confirmPassword){
      return alert("new password and confirm password should be the same");

    }else{
      console.log("All good");
    }
  }else{
    return alert("Please enter value in empty input box");
  }
  console.log(request_id);
  //https://reactnative.dev/movies.json
  //http://localhost:8099/api/retrieveStatements/
  const API_URL = 'https://mufyptest.herokuapp.com/api/user/update/';

  try {
   const response = await fetch(API_URL,{
       method:"POST",
          headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
       body: JSON.stringify({
          user_id: user_id,
          nickname: nickname,
          newpassword: newpassword,
          // updated_at: Danow(),
      }),
      
   });
   const json = await response.json();
   if(response.status == 200){
      console.log("json",json);
      Alert.alert("Success","Your information are updated",
      [
          {
            text: "Close",
            onPress: () => navigation.navigate("Account"),
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
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>

        <View>
            {/* https://reactnative.dev/docs/modal */}
            {/* <Overlay isVisible={overlayVisible} onBackdropPress={()=>setOverlayVisible(true)}>
              <Text size={SIZES.text}>Change username into:</Text>
              <Input placeholder="Enter new username"></Input>
              <Button style={{padding:SIZES.padding}} title="Change" onPress={()=>changeUserName()}/>
              <Button style={{padding:SIZES.padding}} title="Close" onPress={()=>setOverlayVisible(false)}/>

            </Overlay> */}
      
            <Card>
              <Text size={SIZES.text}>Current Nickname: {nickname}</Text>

              <Input placeholder="Enter new nickname" value={nickname} onChangeText={(value)=>setNickname(value)}></Input>                  
              {/* <Text size={SIZES.text}>Username: user's username</Text>

                <Input placeholder="Current username"></Input>                   */}
            </Card>
            
            <Card>
              <Card.Title> 
                
                <Ionicons name={"lock-closed-outline"} size={16} color={COLORS.black} />
              </Card.Title>
              <Card.Divider />
                <Text size={SIZES.text} 
                      style={{padding:SIZES.padding, fontWeight:"bold"}}
                      
                      >Old password:{oldPassword},{password}</Text><Input
                        placeholder="Enter your old password"
                        secureTextEntry={true}
                        value={password} 
                        onChangeText={(value)=>setPassword(value)}
                  /> 
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
            
            <Button title='Submit changes'
              buttonStyle={{
                backgroundColor: '#cf8e3f',
                borderWidth: 2,
                borderColor: '#cf8e3f',
                borderRadius: 30,
                  }}
              containerStyle={{
                width: 'auto',
                marginHorizontal: 50,
                marginVertical: 10,
                }}
              titleStyle={{ fontWeight: 'bold' }} 
              onPress={()=>updateUser(user_id, nickname,password, newPassword, confirmPassword)}></Button>
        </View>
        <Overlay isVisible={isLoading}>
              <View style={{height:100, width:250, margin:10}}>
                <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                <LinearProgress color={COLORS.primary}/>
              </View>
            </Overlay>
      </SafeAreaView>
    );
}
export default accountSettingScreen;