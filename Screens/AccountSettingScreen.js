import React, {Component, useState} from 'react';
import { Text,
         Button,
         Overlay,
         Alert,
         
         
         Input,
         Card
        } from 'react-native-elements';
import {Modal, Pressable, Dimensions, TouchableOpacity, View,StyleSheet, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {COLOURS, SIZES} from '../components/style/theme'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Ionicons from 'react-native-vector-icons/Ionicons';


const accountSettingScreen = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [nickname,setNickname] = useState('');
    const [newpassword,setNewpassword] = useState('');

    const [overlayVisible, setOverlayVisible] = useState(false);

    const changeUserName=()=>{
      setOverlayVisible(!overlayVisible);
      return alert("username Changed");
    }

    return(
      <SafeAreaView style={{flex:1,backgroundColor:COLOURS.background}}>

        <View>
            {/* https://reactnative.dev/docs/modal */}
            <Overlay isVisible={overlayVisible} onBackdropPress={()=>setOverlayVisible(true)}>
              <Text size={SIZES.text}>Change username into:</Text>
              <Input placeholder="Enter new username"></Input>
              <Button style={{padding:SIZES.padding}} title="Change" onPress={()=>changeUserName()}/>
              <Button style={{padding:SIZES.padding}} title="Close" onPress={()=>setOverlayVisible(false)}/>

            </Overlay>
      
            <Card>
              <Text size={SIZES.text}>Nickname: user's nickname
                <Pressable
                    onPress={() => setOverlayVisible(true)}
                >
                    <Text size={SIZES.text} style={{color: COLOURS.secondary}}>  Change username</Text>
                </Pressable></Text>
              <Text size={SIZES.text}>Username: user's username
                <Pressable
                      onPress={() => setOverlayVisible(true)}
                  >
                      <Text size={SIZES.text} style={{color: COLOURS.secondary}}>  Change nickname</Text>
                  </Pressable>
              </Text>
            </Card>
            
            <Card>
              <Card.Title>Password 
                
                <Ionicons name={"lock-closed-outline"} size={16} color={COLOURS.black} />
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
              onPress={()=>alert("Password should be replaced")}></Button>
        </View>
      </SafeAreaView>
    );
}
export default accountSettingScreen;