import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import {Alert,
        TouchableOpacity,
        Dimensions, 
        StyleSheet, 
        ScrollView, 
        FlatList, 
        SafeAreaView,
        View } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import accountSettingScreen from './AccountSettingScreen';
import { userList,userDetail } from './admin/UserListScreen';
import {requestList,requestDetail} from './admin/RequestListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatementsFullList} from './admin/AdminStatementList';
import {statementEditScreen} from './form/AdminStatementDetail';

import {HistoryFullList, HistoryFullDetail} from './teacher/SubmitHistoryScreen';
import {PasswordEmailScreen} from './form/PasswordEmailScreen';
import {PasswordResetScreen} from './form/PasswordResetScreen';
import {teacherMainAccountScreen} from './teacher/TeacherAccountScreen';


import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS} from '../components/style/theme.js';
import 'react-native-gesture-handler';
import {
    LineChart,
    PieChart,
  } from "react-native-chart-kit";
import {LinearGradient} from 'expo-linear-gradient';
//auth
import {changeNickname, changeRole, changeUserId, replaceStat, replaceReward, changeEmail, changePassword} from '../model/action'
import { useDispatch, useSelector } from 'react-redux';
//time
import moment from 'moment';

const AccountStack = createStackNavigator();

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

    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Card.Title>Your Information</Card.Title>
                    <Card.Divider />
                    <Text style={{padding:SIZES.padding}}>Hello! {nickname}</Text>
                </Card>
                    
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
                    
                    <Button title='View Question List'
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

    const Item = ({item}) => (
        <ListItem 
            linearGradientProps={{
                colors: ['#89e3f5','#94c7f2' ],
                start: { x: 1.3, y: 1},
                end: { x: 0.2, y: 2 },
            }}
            ViewComponent={LinearGradient}
            margin={10}
            // containerStyle = {{rounded}}
            pad={20}
            containerStyle={{borderRadius:30}}
        >
        
            <Ionicons name="golf" size={SIZES.icon} color="white"/>
            <Text style={{lineHeight:25, color:"white", fontSize:16, fontWeight:"bold", fontFamily:"AmericanTypewriter-Bold"}}>{item.name}{"\n"}
              Obtained at: {item.retrieveTime}
            </Text>
        </ListItem>
    );

  
    return(
        <View style={{backgroundColor:"white", height:SIZES.height-SIZES.listPaddingBottom}}>
            {user_rewards.length != 0 ?(
                <FlatList
                    data={user_rewards}
                    renderItem= {Item}
                    keyExtractor={item => item.id}
                /> 
            ):(
                <Text style={{fontSize:16, fontWeight:"bold", alignSelf:"center", margin:10}}>You have not obtain any rewards yet!</Text>
            )}
                
        </View>
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
    var total_quiz_easy = 0;
    var total_quiz_medium = 0;
    var total_quiz_hard = 0;
    var performanceComment = "Keep it up!!"; // same as last month
    var difficultyComment = "Seems like you have done many easy level quiz,let's try medium "; // same as last month
    var percentage = 0;
    var iconName = "arrow-forward";
    var iconColor = "black";

    console.log('rewards: ',rewards);

    var dateLabelsTest = {};
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
            //graph
            var itemTime = item.completeTime;
            label = itemTime.split('-')[1]+"/"+itemTime.split('-')[0];
            totalPoints += item.score;
            dateLabelsTest[label] += item.score;
            console.log("data: ",dateLabelsTest,"label: ",label);
            //quiz analysis
            if(item.quizDifficulty == 0){
                total_quiz_easy += 1;
            }
            if(item.quizDifficulty == 1){
                total_quiz_medium += 1;
            }
            if(item.quizDifficulty == 2){
                total_quiz_hard += 1;
            }
            
        });
        avg = totalPoints/stat.length;

    }else{
        graph = false;
    }
    
    data = Object.values(dateLabelsTest);
    dateLabels = Object.keys(dateLabelsTest);
    var preMonth = data[data.length-2];
    var currentMonth = data[data.length-1];
   
    if(currentMonth < preMonth){
        currentMonth = preMonth - currentMonth;
    }else if(currentMonth > preMonth){
        percentage = currentMonth - preMonth;
        percentage = percentage / preMonth;
        percentage = percentage * 100 ;
        percentage = Math.round(percentage, -2) ;
    }else{
        percentage = 0;
    }
    
    if(percentage < 0){
        iconName = "arrow-down";
        iconColor = "red";
        performanceComment = "Your Performance is dropping, try to read more, and gain more points in the quiz!!";

    }else if(percentage > 0){
        iconName = "arrow-up";
        iconColor = "green";
        performanceComment = "You are improving!!";
    }else{
        iconName = "arrow-forward";
        iconColor = "black";
        performanceComment = "You are keep up as last month!!";
    }
    //pie chart data
    const pieData = [
        {
            name: "Easy",
            population: total_quiz_easy,
            color: "rgba(65, 223, 170, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 13
        },
        {
            name: "Medium",
            population: total_quiz_medium,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 13
        },
        {
            name: "Hard",
            population: total_quiz_hard,
            color: "rgba(238, 164, 80, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 13
        },
    ]

    return(
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <ScrollView>
            <Card borderRadius={SIZES.round}>
                <Card.Title>Your Information</Card.Title>
                <Card.Divider />
                <Text style={{padding:SIZES.padding}}>Hello! {nickname}</Text>
                <Card.Divider />
                <Card.Title>Overall quiz record</Card.Title>
                <Card.Divider />
                {graph?(
                    <>
                    <PieChart
                        data={pieData}
                        width={SIZES.width}
                        height={220}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[5, 5]}
                        absolute
                    />
                    <Text style={{padding:SIZES.padding}}>Quizzes done: {stat.length}</Text>
                    <Text style={{padding:SIZES.padding}}>Quizzes average score: {avg.toFixed(0)}</Text>
                    </>
                ):(
                    <Text>No quiz record, Let's do some quiz!</Text>
                )}
                
            </Card>
            <Card borderRadius={SIZES.round}>
            <Card.Title>Perfromance graph (Recent 5 months)</Card.Title>
                <Card.Divider />
                {graph?(
                    <>
                    <Text><Ionicons name={iconName} size={SIZES.icon} style={{color:iconColor}}/>
                    {percentage} %</Text>
                    <LineChart
                    data={{
                    labels: dateLabels,
                    datasets: [
                        {
                        data: data
                        }
                    ],
                    legend: ["Total points in a month"] 
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
                <Text style={{padding:SIZES.padding, fontWeight:"bold"}}>Comments: </Text>
                <Text style={{padding:SIZES.padding}}>{performanceComment}</Text>
                    
                
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
                    <AccountStack.Screen name="RequestList" component={requestList} options={{ title: 'Question List' }}/> 
                    <AccountStack.Screen name="UserDetail" component={userDetail} options={{ title: 'User List' }}/>
                    <AccountStack.Screen name="RequestDetail" component={requestDetail} options={{ title: 'Question List' }}/>
                    <AccountStack.Screen name="StatementsFullList" component={StatementsFullList} options={{ title: 'All Statements' }}/>
                    <AccountStack.Screen name="statementEditScreen" component={statementEditScreen} options={{ title: 'Statement Edit Detail' }}/>
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