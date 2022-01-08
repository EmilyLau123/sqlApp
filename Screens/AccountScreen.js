import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import StatementDetailScreen from './StatementDetailScreen';
import 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Card } from 'react-native-elements';

const AccountStack = createStackNavigator();
function ckeckLogIn(){
    return true;
}
function logOut(){
    console.log("Logged out");
    return Alert.alert("Logged out");
}

const AccountScreen = () => {
    var isLoggedIn = ckeckLogIn();
    if(isLoggedIn== true){
        return(
            <View>
                <Card>
                    <Card.Title>Your Information</Card.Title>
                    <Card.Divider />
                    <Text>User name</Text>
                    <Text>Using the app for 1 day !!</Text>
                    <Text>Quizes done: number</Text>
                    <Text>Quizes average score: floating point</Text>
                </Card>
                <Card>
                    <Card.Title>Perfromance</Card.Title>
                    <Card.Divider />
                    {/* https://github.com/indiespirit/react-native-chart-kit */}
                    <LineChart
                        data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                            }
                        ]
                        }}
                        width= {Dimensions.get('window').width-100} // from react-native
                        height={120}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}
                    />
                    <Text>Comments: you are improving!!</Text>
    
                    {/* <Button title='View Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
                </Card>
                <Button title='Account Setting' onPress={()=>navigation.navigate("Quiz")}></Button>
                <Button title='Logout' onPress={logOut}></Button>
            </View>
        
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