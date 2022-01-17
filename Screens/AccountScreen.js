import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Alert,TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import accountSettingScreen from './AccountSettingScreen';
import { userList,userDetail } from './UserListScreen';
import {requestList,requestDetail} from './RequestListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, SIZES, ICONS, STRINGS, STATUS} from '../components/style/theme.js';
import 'react-native-gesture-handler';
import {
    LineChart,
  } from "react-native-chart-kit";


const AccountStack = createStackNavigator();
function ckeckLogIn(){
    var userStatus = [true,'admin'];
    return userStatus;
}
function logOut(){
    console.log("Logged out");
    return alert("Logged out");
}



function adminMainAccountScreen({navigation}){
    const USERDATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            username: 'loginUsername',
            nickname: 'qwed',
            status:'approved'
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            username: 'Second Item',
            nickname: 'no.2',
            status:'rejected'

          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            username: 'Third Item',
            nickname: 'loveee',
            status:'banned'

          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            username: 'Third Item',
            nickname: 'BB',
            status:'waiting'

          },
    ];

    const REQUESTDATA = [
        {
            question: 'What is SQL? ',
            difficulty: 'Easy',
            answer:1,
            options:['language', 'thing', 'idk', 'sdasd'],
            images: 'imagesss',
            author: 'admin',
            status:1,
          },
          {
            question: 'What is IDE? ',
            difficulty: 'Easy',
            answer:3,
            options:['language', 'thing', 'idk', 'sdasd'],
            images: 'imagesss',
            author: 'avc',
            status:4,
          },
          {
            question: 'What is SELECT? ',
            difficulty: 'Medium',
            answer:0,
            options:['language', 'thing', 'idk', 'sdasd'],
            images: 'imagesss',
            author: 'dsq',
            status:2,
          },
    ];

    const userRenderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var status = item.status;
        if(status == 'rejected'){
            iconName = ICONS.rejected;
        }else if(status == 'waiting'){
            iconName = ICONS.waiting;
        }
        return(
            <ListItem>
                <Ionicons name={iconName} size={SIZES.icon} />
                <ListItem.Content>
                <Text size={SIZES.text}>{item.username} ({item.nickname})</Text>
                
                </ListItem.Content>
            </ListItem>
            );
    }
    const requestRenderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var status = item.status;
        if(status == STATUS.rejected){
            iconName = ICONS.rejected;
        }else if(status == STATUS.waiting){
            iconName = ICONS.waiting;
        }
        // else{
        //     iconName = ICONS.others;
        // }
        return(
        <ListItem>
            <Ionicons name={iconName} size={SIZES.icon} />
            <ListItem.Content>
            <Text size={SIZES.text}>{item.question}</Text>
            </ListItem.Content>
        </ListItem>
        );
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Your Information</Card.Title>
                    <Card.Divider />
                    <Text style={{padding:SIZES.padding}}>User name</Text>
                    <Text style={{padding:SIZES.padding}}>Number of requests of: 100</Text>
                    <Text></Text>
                </Card>
                
                    <Card borderRadius={SIZES.round}>
                        <Card.Title>User list</Card.Title>
                        <Card.Divider />
                        <FlatList
                            data={USERDATA}
                            renderItem={userRenderItem}
                            keyExtractor={item => item.id}
                        />
                    
                        <Button title='View'
                            buttonStyle={{
                                backgroundColor: COLORS.primary,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                borderRadius: 30,
                                }}
                            containerStyle={{
                                width: 'auto',
                                marginHorizontal: 50,
                                marginVertical: 10,
                                }}
                            titleStyle={{ fontWeight: 'bold' }}  
                         onPress={()=>navigation.navigate("UserList")}/>
                    
                        {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
                    </Card>
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Reqest from teacher</Card.Title>

                    <Card.Divider />
                    <FlatList
                        data={REQUESTDATA}
                        renderItem={requestRenderItem}
                        keyExtractor={item => item.id}
                    />
                    <Button title='View'
                            buttonStyle={{
                                backgroundColor: COLORS.primary,
                                borderWidth: 2,
                                borderColor: COLORS.primary,
                                borderRadius: 30,
                                }}
                            containerStyle={{
                                width: 'auto',
                                marginHorizontal: 50,
                                marginVertical: 10,
                                }}
                            titleStyle={{ fontWeight: 'bold' }}  
                         onPress={()=>navigation.navigate("RequestList")}/>

                    {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
                </Card>
                <Button title={STRINGS.accountSetting}
                    buttonStyle={{
                        backgroundColor: COLORS.secondary,
                        borderWidth: 2,
                        borderColor: COLORS.secondary,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}  
                    onPress={()=>navigation.navigate("AccountSetting")}>
                </Button>

                <Button title={STRINGS.logOut}
                    buttonStyle={{
                        backgroundColor: COLORS.black,
                        borderWidth: 2,
                        borderColor: COLORS.black,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }} 
                    onPress={logOut}></Button>
            </ScrollView>
        </SafeAreaView>

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
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Your Information</Card.Title>
                    <Card.Divider />
                    <Text style={{padding:SIZES.padding}}>User name</Text>
                    <Text style={{padding:SIZES.padding}}>Using the app for 1 day !!</Text>
                    <Text style={{padding:SIZES.padding}}>Requests you have made : 10</Text>
                    <Text style={{padding:SIZES.padding}}>Approved Requests: 10/100</Text>
                </Card>
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Record</Card.Title>
                    <Card.Divider />
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                        
    
                    {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
                </Card>
                <Button title={STRINGS.accountSetting}
                    buttonStyle={{
                        backgroundColor: COLORS.secondary,
                        borderWidth: 2,
                        borderColor: COLORS.secondary,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}  
                    onPress={()=>navigation.navigate("AccountSetting")}>
                </Button>
                <Button title={STRINGS.logOut}
                    buttonStyle={{
                        backgroundColor: COLORS.black,
                        borderWidth: 2,
                        borderColor: COLORS.black,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }} 
                    onPress={logOut}>
                </Button>
            </ScrollView>
        </SafeAreaView>
        );
}

function studnetMainAccountScreen({navigation}){
    return(
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <ScrollView>
            <Card borderRadius={SIZES.round}>
                <Card.Title>Your Information</Card.Title>
                <Card.Divider />
                <Text style={{padding:SIZES.padding}}>User name</Text>
                <Text style={{padding:SIZES.padding}}>Using the app for 1 day !!</Text>
                <Text style={{padding:SIZES.padding}}>Quizes done: number</Text>
                <Text style={{padding:SIZES.padding}}>Quizes average score: floating point</Text>
            </Card>
            <Card borderRadius={SIZES.round}>
                <Card.Title>Perfromance</Card.Title>
                <Card.Divider />
                {/* https://github.com/indiespirit/react-native-chart-kit */}
                <LineChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                        data: [
                            0,
                            2,
                            4,
                            6,
                            8,
                            10
                        ]
                        }
                    ]
                    }}
                    width= {SIZES.width-55} // from react-native
                    height={200}
                    // yAxisLabel="Mark"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: COLORS.primary,
                    backgroundGradientFrom: COLORS.primary,
                    backgroundGradientTo: COLORS.secondary,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 5
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 5,
                    borderRadius: 16
                    }}
                />
                <Text style={{padding:SIZES.padding, fontWeight:"bold"}}>Comments: </Text>
                <Text style={{padding:SIZES.padding}}>you are improving!!</Text>

                {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
            </Card>
            <Button title={STRINGS.accountSetting}
                buttonStyle={{
                    backgroundColor: COLORS.secondary,
                    borderWidth: 2,
                    borderColor: COLORS.secondary,
                    borderRadius: 30,
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }} 
                onPress={()=>navigation.navigate("AccountSetting")}/>
            <Button title={STRINGS.logOut}
                buttonStyle={{
                    backgroundColor: COLORS.black,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    borderRadius: 30,
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }} 
                onPress={logOut}/>
        </ScrollView>
    </SafeAreaView>
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
                    <AccountStack.Screen name="UserList" component={userList} options={{ title: 'User List' }}/>
                    <AccountStack.Screen name="RequestList" component={requestList} options={{ title: 'Request List' }}/> 
                    <AccountStack.Screen name="UserDetail" component={userDetail} options={{ title: 'User List' }}/>
                    <AccountStack.Screen name="RequestDetail" component={requestDetail} options={{ title: 'Request List' }}/>
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