import React, {Component, useState} from 'react';
import { Text,
         Button,
         Overlay,
         
         
         Input,
         Card
        } from 'react-native-elements';
import {Modal, Pressable, Dimensions, TouchableOpacity, View,StyleSheet, SafeAreaView, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {COLORS, SIZES} from '../components/style/theme'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';



const accountSettingScreen = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [nickname,setNickname] = useState('');
    const [newpassword,setNewpassword] = useState('');

    const [overlayVisible, setOverlayVisible] = useState(false);

//ban a user
const updateUser = async(user_id, username, password, nickname, newpassword) => {
  console.log(request_id);
  //https://reactnative.dev/movies.json
  //http://localhost:8099/api/retrieveStatements/
  const API_URL = 'http://localhost:8099/api/user/update/';

  try {
   const response = await fetch(API_URL,{
       method:"POST",
          headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
          },
       body: JSON.stringify({
          user_id: user_id,
          username: username,
          password: password,
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


    const changeUserName=()=>{
      setOverlayVisible(!overlayVisible);
      return alert("username Changed");
    }

    return(
      <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>

        <View>
            {/* https://reactnative.dev/docs/modal */}
            <Overlay isVisible={overlayVisible} onBackdropPress={()=>setOverlayVisible(true)}>
              <Text size={SIZES.text}>Change username into:</Text>
              <Input placeholder="Enter new username"></Input>
              <Button style={{padding:SIZES.padding}} title="Change" onPress={()=>changeUserName()}/>
              <Button style={{padding:SIZES.padding}} title="Close" onPress={()=>setOverlayVisible(false)}/>

            </Overlay>
      
            <Card>
              <Text size={SIZES.text}>Nickname: user's nickname</Text>

              <Input placeholder="Current nickname"></Input>                  
              <Text size={SIZES.text}>Username: user's username</Text>

                <Input placeholder="Current username"></Input>                  
            </Card>
            
            <Card>
              <Card.Title>Password 
                
                <Ionicons name={"lock-closed-outline"} size={16} color={COLORS.black} />
              </Card.Title>
              <Card.Divider />
              <Text size={SIZES.text} style={{padding:SIZES.padding, fontWeight:"bold"}}>Old password:</Text><Input
                    placeholder="Enter your old password"
                    secureTextEntry={true}
                  /> 
              <Text size={SIZES.text} style={{padding:SIZES.padding, fontWeight:"bold"}}>New password:</Text><Input
                    placeholder="Enter your new password"
                    secureTextEntry={true}
                  /> 
              <Text size={SIZES.text} style={{padding:SIZES.padding, fontWeight:"bold"}}>Confirm new password:</Text><Input
                    placeholder="Enter your new password again"
                    secureTextEntry={true}
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
              onPress={()=>changeUserName()}></Button>
        </View>
      </SafeAreaView>
    );
}
export default accountSettingScreen;