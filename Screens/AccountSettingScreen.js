import React, {Component, useState} from 'react';
import { Text,
         Button,
         
         Alert,
         
         
         Input,
         Card
        } from 'react-native-elements';
import {Modal, Pressable, Dimensions, TouchableOpacity, View,StyleSheet} from 'react-native';
import 'react-native-gesture-handler';

function changeUserName(){
  setModalVisible(!modalVisible);
  return alert("username Changed");
}

const accountSettingScreen = () =>{
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [nickname,setNickname] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    return(
        
        <View>
            {/* https://reactnative.dev/docs/modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <Text>Change username into:</Text>
              <Input></Input>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Close</Text>
            </Pressable>
            <Pressable
              onPress={() => {setModalVisible(!modalVisible)
                              return alert("username Changed")}}
            >
              <Text>Change</Text>
            </Pressable>
        </View>
      </Modal>
      
            <Text>Nickname: user's nickname</Text>
                <Pressable
                    onPress={() => setModalVisible(true)}
                >
                    <Text>Change username</Text>
                </Pressable>
            <Text>Username: user's username</Text>
            <Text>Password</Text>
            <Text>Old password:</Text><Input
                   placeholder="Enter your old password"
                /> 
            <Text>New password:</Text><Input
                   placeholder="Enter your new password"
                /> 
            <Text>Confirm new password:</Text><Input
                   placeholder="Enter your new password again"
                /> 
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
        
    );
}
export default accountSettingScreen;