import React, {Component} from 'react';
import { FlatList, ScrollView, SafeAreaView } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS, STATUS} from '../components/style/theme.js';
import {  Text, Button, ListItem, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';



export function userList({navigation}){

    const DATA = [
        {
            username: 'asdf123',
            nickname: 'sdfgb',
            password: 'dsadas',
            quizDone: [{quizID: 1, quizMark: 6},
                        {quizID: 3, quizMark: 5}],
            role: 'student',
            status: 1,//approved
            token:'String',
          },
          {
            username: 'kitty123',
            nickname: 'kitty123',
            password: 'dsadas',
            quizDone: [{quizID: 1, quizMark: 6},
                        {quizID: 1, quizMark: 5}],
            role: 'teacher',
            status: 2,//rejected
            token:'String',
          },
          {
            username: 'fuxk',
            nickname: 'shxt',
            password: 'dsadas',
            quizDone: [{quizID: 1, quizMark: 6},
                        {quizID: 1, quizMark: 5}],
            role: 'student',
            status: 3,//banned
            token:'String',
          },
    ];
    const renderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var statusString = STATUS.approved;
        var status = item.status;
        if(status == STATUS.rejected){
            statusString = 'Rejected';
            iconName = ICONS.waiting;
        }else if(status == STATUS.waiting){
            statusString = 'Waiting';
            iconName = ICONS.waiting;
        }else if(status == STATUS.banned){
            statusString = 'Banned';
            iconName = ICONS.banned;
        }
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("UserDetail",{
            status:item.status,
            username: item.username,
            nickname:item.nickname,
            created_at:item.created_at,
            approved_at:item.approved_at,
            statusString: statusString,
            iconName : iconName,
          })}>
            <ListItem>
            <Ionicons name={iconName} size={SIZES.icon} />
            <ListItem.Content>
            <ListItem.Title>{item.username} ({item.nickname})</ListItem.Title>
            <Text>{item.created_at}</Text>
            </ListItem.Content>
        </ListItem>
        </TouchableOpacity>
        
        );
    }
    return(

        <FlatList 
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}

        />
            
    );
}


export function userDetail({route}){
    const { iconName, statusString, username, nickname, created_at, approved_at } = route.params;
    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Ionicons name={iconName} size={SIZES.icon} />
                    <Text style={{padding:SIZES.padding}}>Status: {statusString} </Text>
                    <Text style={{padding:SIZES.padding}}>Username: {username} </Text>
                    <Text style={{padding:SIZES.padding}}>Nickname: {nickname} </Text>
                    <Text style={{padding:SIZES.padding}}>Created_at: {created_at} </Text>
                    <Text style={{padding:SIZES.padding}}>Approved_at: {approved_at} </Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}


const Stack = createStackNavigator();

// function userListScreen(){
//     return(
//         <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
//                 <Stack.Navigator>
//                     <Stack.Screen name="UserList" component={userList} options={{ title: 'User List', headerShown: false}}/>
//                     <Stack.Screen name="UserDetail" component={userDetail} options={{ title: 'User Detail', headerShown: true }}/>

//                 </Stack.Navigator>
//         </SafeAreaView>
//     );
// }

// export default userListScreen;
