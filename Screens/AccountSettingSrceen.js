import React, {Component} from 'react';
import { StyleSheet,
         Text,
         View,
         Button,
         TouchableOpacity,
         Dimensions,
         Alert
        } from 'react-native';

import 'react-native-gesture-handler';

import { Card } from 'react-native-elements';

function SettingScreen(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [nickname,setNickname] = useState('');

    return(
        
        <View>
            {/* https://reactnative.dev/docs/modal */}
            <Text>Nickname: user's nickname</Text>
            <Text>Username: user's username</Text>
            <Text>Password</Text>
            <Text>Old password:</Text><TextInput
                   placeHolder="Enter your old password"
                /> 
            <Text>New password:</Text><TextInput
                   placeHolder="Enter your new password"
                /> 
            <Text>Confirm new password:</Text><TextInput
                   placeHolder="Enter your new password again"
                /> 
            <Button title='Submit changes' onPress={()=>navigation.navigate("SignUp")}></Button>
        </View>
        
        
    )
}

export default SettingScreen;