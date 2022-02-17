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
import {changeNickname, changeRole, changeUserId, changeStat, changeEmail,changePassword} from '../model/action'
import { Provider,useDispatch, useSelector } from 'react-redux';

import bcrypt from 'react-native-bcrypt';

const accountSettingScreen = ({navigation}) =>{
    // const [newUsername,setNewUsername] = useState('');
    const [password,setPassword] = useState('');
    // const [newNickname,setNewNickname] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    // const [error,setError] = useState(false);

    var oldPassword = useSelector(state => state.passwordReducer.password);


var oldNickname = useSelector(state => state.nicknameReducer.nickname);

    const [nickname,setNickname] = useState(oldNickname);

  var user_id = useSelector(state => state.userIdReducer.user_id);

 const [isLoading, setIsLoading] = useState(false);

  const toggleOverlay =(status) => {
        setIsLoading(status);
    };

    const dispatch = useDispatch(); 
  // setNickname(useSelector(state => state.nicknameReducer.nickname));
//change password or nickname
const updateUser = async(user_id, newNickname, current_password, newpassword, confirmPassword) => {
  var change = true;
  if(current_password != "" && newpassword != "" && confirmPassword != ""){
    var match = bcrypt.compareSync(current_password, oldPassword); // true
    if(match == false){
      return alert("Please enter correct current password");
    }else if(newpassword != confirmPassword){
      return alert("new password and confirm password should be the same");

    }else{
      // var salt = bcrypt.genSaltSync(10);
      // var hash = bcrypt.hashSync(confirmPassword, salt);
      console.log("All good, changing password");
    }
  }else{
    if(current_password != "" || newpassword != "" || confirmPassword != ""){
      return alert("If you want to change the password, then enter value in all input box.");
    }
    console.log("Not changing the password");
    confirmPassword = oldPassword;
    change = false;
  }
  console.log(user_id,confirmPassword, oldPassword,newNickname, change);
  //https://reactnative.dev/movies.json
  //http://localhost:8099/api/retrieveStatements/
  const API_URL = 'https://mufyptest.herokuapp.com/api/user/account/update/';

  try {
    toggleOverlay(true);
   const response = await fetch(API_URL,{
       method:"POST",
          headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
       body: JSON.stringify({
          user_id: user_id,
          nickname: newNickname,
          password: confirmPassword,
          change: change
          // updated_at: Danow(),
      }),
      
   });
   const json = await response.json();
   if(response.status == 200){
    dispatch(changeNickname(newNickname));
    dispatch(changePassword(json));
    toggleOverlay(false);
      console.log("json",json);
      Alert.alert("Success","Your information are updated",
      [
          {
            text: "Close",
            onPress: () => navigation.goBack(),
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
                      
                      >Old password:</Text><Input
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