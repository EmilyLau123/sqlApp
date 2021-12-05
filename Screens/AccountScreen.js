import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import StatementDetailScreen from './StatementDetailScreen';
import 'react-native-gesture-handler';


const AccountStack = createStackNavigator();
function ckeckLogIn(){
    return false;
}

const AccountScreen = () => {
    var isLoggedIn = ckeckLogIn();
    if(isLoggedIn== true){
        return(
            <Text>fewf屠木木we</Text>
        
        );
    }
      return(
            <AccountStack.Navigator>
                <AccountStack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }}/>
                <AccountStack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }}/>
            </AccountStack.Navigator>
        
    ); 
    
    
}

export default AccountScreen;