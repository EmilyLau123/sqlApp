import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import { Alert,TouchableOpacity, Dimensions, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import accountSettingScreen from './AccountSettingScreen';
import { userList,userDetail } from './admin/UserListScreen';
import {requestList,requestDetail} from './admin/RequestListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatementsFullList, StatementsFullDetail} from './admin/AdminStatementList';
import {HistoryFullList} from './teacher/SubmitHistoryScreen';

import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS} from '../components/style/theme.js';
import 'react-native-gesture-handler';
import {
    LineChart,
  } from "react-native-chart-kit";
//auth
import {changeNickname, changeRole, changeUserId, changeStat} from '../model/action'
import { useDispatch, useSelector } from 'react-redux';

  //auth using redux
// import { Provider } from "react-redux";
// import { authStore } from "./model/store.js";
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

const AccountStack = createStackNavigator();
// function ckeckLogIn(){
//     var userStatus = [false,""];
//     return userStatus;
// }

function logOut(dispatch){
    dispatch(changeRole(USER_ROLE.anonymous));
    dispatch(changeNickname("stranger"));
    console.log("Logged out");
    return alert("Logged out");
}


function adminMainAccountScreen({navigation}){
    const nickname = useSelector(state => state.nicknameReducer.nickname);
    const dispatch = useDispatch(); 
 
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
    // const requestRenderItem = ({ item }) => {
    //     var iconName = ICONS.approved;
    //     var status = item.status;
    //     if(status == STATUS.rejected){
    //         iconName = ICONS.rejected;
    //     }else if(status == STATUS.waiting){
    //         iconName = ICONS.waiting;
    //     }
        // else{
        //     iconName = ICONS.others;
        // }
    //     return(
    //     <ListItem>
    //         <Ionicons name={iconName} size={SIZES.icon} />
    //         <ListItem.Content>
    //         <Text size={SIZES.text}>{item.question}</Text>
    //         </ListItem.Content>
    //     </ListItem>
    //     );
    // }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Your Information</Card.Title>
                    <Card.Divider />
                    <Text style={{padding:SIZES.padding}}>Hello! {nickname}</Text>
                    <Text style={{padding:SIZES.padding}}>Number of requests of: 100</Text>
                    <Text></Text>
                </Card>
                
                    {/* <Card borderRadius={SIZES.round}>
                        <Card.Title>User list</Card.Title>
                        <Card.Divider />
                        <FlatList
                            data={USERDATA}
                            renderItem={userRenderItem}
                            keyExtractor={item => item.id}
                        /> */}
                    
                        <Button title='View User List'
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
                    {/* </Card> */}
                {/* <Card borderRadius={SIZES.round}>
                    <Card.Title>Reqest from teacher</Card.Title>

                    <Card.Divider />
                    <FlatList
                        data={REQUESTDATA}
                        renderItem={requestRenderItem}
                        keyExtractor={item => item.id}
                    /> */}
                    <Button title='View Request List'
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
                    <Button title='View Statement List'
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
                         onPress={()=>navigation.navigate("StatementsFullList")}/>     
                    {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
                {/* </Card> */}
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
                    onPress={()=>logOut(dispatch)}></Button>
            </ScrollView>
        </SafeAreaView>

    );
}


function teacherMainAccountScreen({navigation}){
    const stat = useSelector(state => state.statReducer.stat);
    const nickname = useSelector(state => state.nicknameReducer.nickname);
    const dispatch = useDispatch(); 


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
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Your Information</Card.Title>
                    <Card.Divider />
                    <Text style={{padding:SIZES.padding}}>Hello! {nickname}</Text>
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
                    <Button title={STRINGS.submitHistory}
                        buttonStyle={{
                            backgroundColor: COLORS.primary,
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
                        onPress={()=>navigation.navigate("SubmitHistory")}>
                    </Button>
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
                    onPress={()=>logOut(dispatch)}>
                </Button>
        </SafeAreaView>
        );
}

function studnetMainAccountScreen({navigation}){
    const stat = useSelector(state => state.statReducer.stat);
    const nickname = useSelector(state => state.nicknameReducer.nickname);
    const dispatch = useDispatch(); 
    var totalPoints = 0;
    var counter = 0;
    var dateLabels = [];
    var index = 0;
    var data = [];
    var label = "";

    stat.forEach(item => {
        console.log("set:");

        item.forEach(detail => {
            var itemTime = detail.answerTime;
            label = itemTime.split('-')[1]+"/"+itemTime.split('-')[0];
            // console.log(itemTime.split('-'));
            if(!dateLabels.includes(label)){
                dateLabels.push(label);
            }
            console.log(itemTime);
            totalPoints += detail.point;
            data[index] = totalPoints;

            // console.log(totalPoints, stat.length);

        });
    });


    console.log(dateLabels);
    var avg = totalPoints/stat.length;

    return(
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <ScrollView>
            <Card borderRadius={SIZES.round}>
                <Card.Title>Your Information</Card.Title>
                <Card.Divider />
                <Text style={{padding:SIZES.padding}}>Hello! {nickname}</Text>
                {/* <Text style={{padding:SIZES.padding}}>Using the app for 1 day !!</Text> */}
                <Text style={{padding:SIZES.padding}}>Quizes done: {stat.length}</Text>
                <Text style={{padding:SIZES.padding}}>Quizes average score: {avg.toFixed(0)}</Text>
            </Card>
            <Card borderRadius={SIZES.round}>
                <Card.Title>Perfromance</Card.Title>
                <Card.Divider />
                {/* https://github.com/indiespirit/react-native-chart-kit */}
                <LineChart
                    data={{
                    labels: dateLabels
                    //  labels: ["01/2022", "02/2022", "03/2022", "04/2022", "05/2022",]
                            //  "06/2022","07/2022","08/2022","09/2022","09/2022",
                            //  "10/2022","11/2022","12/2022",]
                             ,
                    datasets: [
                        {
                        data: data
                        }
                    ],
                    legend: ["Accumulated points in a month"] 
                    }}
                    width= {SIZES.width-55} // from react-native
                    height={200}
                    // yAxisLabel="Mark"
                    yAxisInterval={1} // optional, defaults to 1
                    xAxisInterval={1} 
                    chartConfig={{
                    backgroundColor: COLORS.primary,
                    backgroundGradientFrom: COLORS.primary,
                    backgroundGradientTo: COLORS.secondary,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 225, 227, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 5
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#4BB1B9"
                    }
                    }}
                    // bezier //make line smooth
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
                onPress={()=>logOut(dispatch)}/>
        </ScrollView>
    </SafeAreaView>
    );
}


const AccountScreen = () => {
    const role = useSelector(state => state.roleReducer.role);
    

        if(role == USER_ROLE.teacher){
            return(
                <AccountStack.Navigator>
                    <AccountStack.Screen name="TeacherAccountMain" component={teacherMainAccountScreen} options={{ title: 'Your Account' }}/>
                    <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
                    <AccountStack.Screen name="SubmitHistory" component={HistoryFullList} options={{ title: 'Submit History' }}/>

                </AccountStack.Navigator>
            );
        }else if(role == USER_ROLE.student){
            return(
            <AccountStack.Navigator>
                <AccountStack.Screen name="StudnetAccountMain" component={studnetMainAccountScreen} options={{ title: 'Your Account' }}/>
                <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
            </AccountStack.Navigator>
            );
        }else if(role == USER_ROLE.admin){
            return(
                <AccountStack.Navigator>
                    <AccountStack.Screen name="AdminAccountMain" component={adminMainAccountScreen} options={{ title: 'Your Account' }}/>
                    <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
                    <AccountStack.Screen name="UserList" component={userList} options={{ title: 'User List' }}/>
                    <AccountStack.Screen name="RequestList" component={requestList} options={{ title: 'Request List' }}/> 
                    <AccountStack.Screen name="UserDetail" component={userDetail} options={{ title: 'User List' }}/>
                    <AccountStack.Screen name="RequestDetail" component={requestDetail} options={{ title: 'Request List' }}/>
                    <AccountStack.Screen name="StatementsFullList" component={StatementsFullList} options={{ title: 'All Statements' }}/>
   
                    <AccountStack.Screen name="StatementFullDetail" component={StatementsFullDetail} options={{ title: 'Statement Detail' }}/>
    
                </AccountStack.Navigator>
                );
        }else{
        
            return(
                    <AccountStack.Navigator>
                        <AccountStack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }}/>
                        <AccountStack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }}/>
                    </AccountStack.Navigator>
            ); 
    }
}

export const fin_AccountScreen = () => {
    const menuItemData = useSelector(state => state.menuItemData);
    const dispatch = useDispatch();
    dispatch({
        type: "ADD_ITEM",
        payload: {itemNew:"測試資料"}
    }); 
    return(
        <Provider store={authStore}>
            <AccountScreen/>
        </Provider>
    );
}


export default AccountScreen;