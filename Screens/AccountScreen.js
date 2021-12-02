import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import 'react-native-gesture-handler';


const AccountStack = createStackNavigator();


const AccountScreen = () => {
    return(
        <View>
            <Text>User Name</Text>
            <Text>Random words</Text>
                <AccountStack.Navigator>
                    
                    <AccountStack.Screen name="SignUp" component={SignUpScreen}/>
                </AccountStack.Navigator>
        </View>
    )
}

export default AccountScreen;