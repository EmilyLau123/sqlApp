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
import {HistoryFullList, HistoryFullDetail} from './teacher/SubmitHistoryScreen';
import {PasswordEmailScreen} from './form/PasswordEmailScreen';
import {PasswordResetScreen} from './form/PasswordResetScreen';
import {teacherMainAccountScreen} from './teacher/TeacherAccountScreen';


import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS} from '../components/style/theme.js';
import 'react-native-gesture-handler';
import {
    LineChart,
  } from "react-native-chart-kit";

//auth
import {changeNickname, changeRole, changeUserId, replaceStat, replaceReward, changeEmail, changePassword} from '../model/action'
import { useDispatch, useSelector } from 'react-redux';
//time
import moment from 'moment';
// import Moment from 'react-moment';
// import 'moment-timezone';  
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
    dispatch(changeUserId(""));
    dispatch(changePassword(""));
    dispatch(changeEmail(""));
    dispatch(replaceStat([]));
    dispatch(replaceReward([]));
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
                    {/* <Text style={{padding:SIZES.padding}}>Number of requests of: 100</Text> */}
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

function rewardListScreen({route}){
    const user_rewards = route.params.rewards;
    console.log(user_rewards);
    var rewardList = [];
    
    // for(let i = 0; i<user_rewards.length; i++){
    //     rewardList.push(REWARDS[user_rewards[i]]);
    // }
    // [
    //     { id:1, name: "All correct!!", retrieved:true, iconName:"golf-outline"},
    //     { id:2, name: "All wrong!!", retrieved:true, iconName:"golf-outline" },
    //     { id:3, name: "Get all correct in quiz ar Hard level!!", retrieved:true, iconName: "golf"},
    // ];

    // user_rewards.forEach(item => {
        
    // });

    const Item = ({item}) => (
        <ListItem bottomDivider>
            <Ionicons name="golf" size={SIZES.icon} />

            <Text style={{lineHeight:20}}>{item.name}{"\n"}
              Obtained at: {item.retrieveTime}
            
            </Text>
        </ListItem>
    );
  
    return(
        <FlatList
            data={user_rewards}
            renderItem= {Item}
            keyExtractor={item => item.id}
            // onRefresh={() => getStatements("")}
            // refreshing={isLoading}
            // height={SIZES.height-400}
        /> 
    );
}

function studnetMainAccountScreen({navigation}){
    const stat = useSelector(state => state.statReducer.stat);
    const nickname = useSelector(state => state.nicknameReducer.nickname);
    const rewards = useSelector(state => state.rewardReducer.reward);
    const dispatch = useDispatch(); 
    var totalPoints = 0;
    var counter = 0;
    var graph = true;
    var index = 0;
    var data = [];
    var dateLabels = [];
    var label = "";
    var avg = 0;


    console.log('rewards: ',rewards);

    var dateLabelsTest = {};
    // dateLabelsTest[moment().subtract(5,'M').format("MM/YYYY")] = 0;
    dateLabelsTest[moment().subtract(4,'M').format("MM/YYYY")] = 0;
    dateLabelsTest[moment().subtract(3,'M').format("MM/YYYY")] = 0;
    dateLabelsTest[moment().subtract(2,'M').format("MM/YYYY")] = 0;
    dateLabelsTest[moment().subtract(1,'M').format("MM/YYYY")] = 0;
    dateLabelsTest[moment().format("MM/YYYY")] = 0;
    // console.log(stat);  
    if(stat.length != 0){
        console.log('stat: ', stat);
        stat.forEach(item => {
            console.log('item: ',item);
            var itemTime = item.completeTime;
            label = itemTime.split('-')[1]+"/"+itemTime.split('-')[0];
            // label = ['02/2022','01/2022','12/2021','11/2021',];
            // item.forEach(detail => { // = item[i]
                totalPoints += item.score;
                // dateLabelsTest[label] = totalPoints;
                dateLabelsTest[label] = totalPoints;
            // });
        });
        avg = totalPoints/stat.length;

    }else{
        graph = false;
    }
    data = Object.values(dateLabelsTest);
    dateLabels = Object.keys(dateLabelsTest);
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
            <Card.Title>Perfromance graph</Card.Title>
                <Card.Divider />
                {/* https://github.com/indiespirit/react-native-chart-kit */}
                {graph?(
                    <>
                    <LineChart
                    data={{
                    labels: dateLabels,
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
                    decimalPlaces: 0, // optional, defaults to 2dp
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
                {/* <Text style={{padding:SIZES.padding, fontWeight:"bold"}}>Comments: </Text>
                <Text style={{padding:SIZES.padding}}>you are improving!!</Text> */}
                </>
                ):(
                    <Text>No quiz record, Let's do some quiz!</Text>
                )}
                {/* <Button title='ScrollView Details' onPress={()=>navigation.navigate("Performance")}></Button> */}
            </Card>
            <Button title="Reward list"
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
                onPress={()=>navigation.navigate("RewardList",{
                    rewards:rewards
                })}/>

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
                    <AccountStack.Screen name="SubmitHistoryDetail" component={HistoryFullDetail} options={{ title: 'History Detail' }}/>
                </AccountStack.Navigator>
            );
        }else if(role == USER_ROLE.student){
            return(
            <AccountStack.Navigator>
                <AccountStack.Screen name="StudnetAccountMain" component={studnetMainAccountScreen} options={{ title: 'Your Account' }}/>
                <AccountStack.Screen name="AccountSetting" component={accountSettingScreen} options={{ title: 'Account Setting' }}/>
                <AccountStack.Screen name="RewardList" component={rewardListScreen} options={{ title: 'Reward List' }}/>

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
                        <AccountStack.Screen name="PasswordEmail" component={PasswordEmailScreen} options={{ title: 'Email form' }}/>
                        <AccountStack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ title: 'Reset password',headerShown:false }}/>
                        <AccountStack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }}/>
                    </AccountStack.Navigator>
            ); 
    }
}


export default AccountScreen;