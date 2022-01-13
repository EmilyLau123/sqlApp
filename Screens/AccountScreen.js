import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Alert,TouchableOpacity, Dimensions, StyleSheet, View, FlatList } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import accountSettingScreen from './AccountSettingScreen';

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


const AccountStack = createStackNavigator();
function ckeckLogIn(){
    var userStatus = [true, 'admin'];
    return userStatus;
}
function logOut(){
    console.log("Logged out");
    return alert("Logged out");
}
function adminMainAccountScreen({navigation}){
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
          },
    ];
    const renderItem = ({ item }) => (
        <ListItem>
            <Icon name="check" size={20} />
            <ListItem.Content>
            <ListItem.Title>{item.title}, This thing is checked</ListItem.Title>
            </ListItem.Content>
        </ListItem>
        );
    return(
        <View>
            <Card>
                <Card.Title>Your Information</Card.Title>
                <Card.Divider />
                <Text>User name</Text>
                <Text>Number of requests of: 100</Text>
                <Text></Text>
            </Card>
            <Card>
                <Card.Title>Reqest from teacher</Card.Title>
                <Card.Divider />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                {/* <Button title='View Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
            </Card>
            <Button title='Account Setting'
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
                onPress={()=>navigation.navigate("AccountSetting")}></Button>
            <Button title='Logout' 
                buttonStyle={{
                    backgroundColor: '#35393d',
                    borderWidth: 2,
                    borderColor: '#35393d',
                    borderRadius: 30,
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }} 
                onPress={logOut}></Button>
        </View>
    );
}


function teacherMainAccountScreen({navigation}){
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
          },
    ];
    const renderItem = ({ item }) => (
        <ListItem>
            <Icon name="check" size={20} />
            <ListItem.Content>
            <ListItem.Title>{item.title}, This thing is checked</ListItem.Title>
            </ListItem.Content>
        </ListItem>
        );
    return(
        <View>
            <Card>
                <Card.Title>Your Information</Card.Title>
                <Card.Divider />
                <Text>User name</Text>
                <Text>Using the app for 1 day !!</Text>
                <Text>Requests you have made : 10</Text>
                <Text>Approved Requests: 10/100</Text>
            </Card>
            <Card>
                <Card.Title>Record</Card.Title>
                <Card.Divider />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                    
   
                {/* <Button title='View Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
            </Card>
            <Button title='Account Setting' 
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
            titleStyle={{ fontWeight: 'bold' }}  onPress={()=>navigation.navigate("AccountSetting")}></Button>
            <Button title='Logout'
                buttonStyle={{
                    backgroundColor: '#35393d',
                    borderWidth: 2,
                    borderColor: '#35393d',
                    borderRadius: 30,
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }} 
            onPress={logOut}></Button>
        </View>
        );
}

function studnetMainAccountScreen({navigation}){
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
        <Button title='Account Setting'
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
            onPress={()=>navigation.navigate("AccountSetting")}/>
        <Button title='Logout'
            buttonStyle={{
                backgroundColor: '#35393d',
                borderWidth: 2,
                borderColor: '#35393d',
                borderRadius: 30,
                }}
            containerStyle={{
                width: 'auto',
                marginHorizontal: 50,
                marginVertical: 10,
                }}
            titleStyle={{ fontWeight: 'bold' }} 
            onPress={logOut}/>
    </View>
    );
}


const AccountScreen = () => {
    var isLoggedIn = ckeckLogIn();
    if(isLoggedIn[0]== true){
        if(isLoggedIn[1] == 'teacher'){
            return(
                <AccountStack.Navigator>
                    <AccountStack.Screen name="TeacherAccountMain" component={teacherMainAccountScreen} options={{ title: 'Your Account' }}/>
                    <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
                </AccountStack.Navigator>
            );
        }else if(isLoggedIn[1] == 'student'){
            return(
            <AccountStack.Navigator>
                <AccountStack.Screen name="StudnetAccountMain" component={studnetMainAccountScreen} options={{ title: 'Your Account' }}/>
                <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
            </AccountStack.Navigator>
            );
        }else{
            return(
                <AccountStack.Navigator>
                    <AccountStack.Screen name="AdminAccountMain" component={adminMainAccountScreen} options={{ title: 'Your Account' }}/>
                    <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
                </AccountStack.Navigator>
                );
        }
        
    }
      return(
            <AccountStack.Navigator>
                <AccountStack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }}/>
                <AccountStack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }}/>
            </AccountStack.Navigator>
    ); 
}
export default AccountScreen;