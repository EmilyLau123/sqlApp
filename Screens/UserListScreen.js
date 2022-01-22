import React, {Component, useState, useEffect} from 'react';
import { FlatList, ScrollView, View, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS, USER_STATUS, USER_ROLE} from '../components/style/theme.js';
import {  Text, Button, ListItem, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';



export function userList({navigation}){

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
  
    

    //get user list
    const getUsers = async () => {
      //https://reactnative.dev/movies.json
      //http://localhost:8099/api/retrieveStatements/
      const API_URL = 'http://localhost:8099/api/find/users/';
  
      try {
       const response = await fetch(API_URL);
       const json = await response.json();
    //    console.log(json);
       setData(json);
     } catch (error) {
       console.error(error);
     } finally {
      setLoading(false);
      console.log("done");
     }
   }
  
   useEffect(() => {
    getUsers();
   }, []);

    // const DATA = [
    //     {
    //         username: 'asdf123',
    //         nickname: 'sdfgb',
    //         password: 'dsadas',
    //         quizDone: [{quizID: 1, quizMark: 6},
    //                     {quizID: 3, quizMark: 5}],
    //         role: 'student',
    //         status: 1,//approved
    //         token:'String',
    //       },
    //       {
    //         username: 'kitty123',
    //         nickname: 'kitty123',
    //         password: 'dsadas',
    //         quizDone: [{quizID: 1, quizMark: 6},
    //                     {quizID: 1, quizMark: 5}],
    //         role: 'teacher',
    //         status: 2,//rejected
    //         token:'String',
    //       },
    //       {
    //         username: 'fuxk',
    //         nickname: 'shxt',
    //         password: 'dsadas',
    //         quizDone: [{quizID: 1, quizMark: 6},
    //                     {quizID: 1, quizMark: 5}],
    //         role: 'student',
    //         status: 3,//banned
    //         token:'String',
    //       },
    // ];
    const renderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var statusString = 'Approved';
        var status = item.status;
        if(status == USER_STATUS.rejected){
            statusString = 'Rejected';
            iconName = ICONS.waiting;
        }else if(status == USER_STATUS.waiting){
            statusString = 'Waiting';
            iconName = ICONS.waiting;
        }else if(status == USER_STATUS.banned){
            statusString = 'Banned';
            iconName = ICONS.banned;
        }
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("UserDetail",{
            user_id:item._id,
            status:item.status,
            username: item.username,
            nickname:item.nickname,
            submitted_at:item.submitted_at,
            updated_at:item.updated_at,
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
        <SafeAreaView>
            {isLoading?<ActivityIndicator/>:(
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                onRefresh={() => getUsers()}
                refreshing={isLoading}
                /> 
            )}
        </SafeAreaView>
    );
}


export function userDetail({route,navigation}){
    const { submitted_at,user_id, iconName, statusString, username, nickname, updated_at } = route.params;
    
    //delete a user
    const deleteUser = async(user_id) => {
        console.log(user_id);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'http://localhost:8099/api/user/delete';
    
        try {
         const response = await fetch(API_URL,{
             method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                user_id: user_id
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
            console.log("json",json);
            Alert.alert("Success","User deleted",
            [
                {
                  text: "Close",
                  onPress: () => navigation.navigate("UserList"),
                  style: "close",
                },
              ]
            );
         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }
     
//ban a user
const changeUserStatus = async(request_id, status) => {
    console.log(request_id);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'http://localhost:8099/api/user/status/change';

    try {
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            request_id: request_id,
            status: status,
            // updated_at: Danow(),
        }),
        
     });
     const json = await response.json();
     if(response.status == 200){
        console.log("json",json);
        Alert.alert("Success","User updated",
        [
            {
              text: "Close",
              onPress: () => navigation.navigate("UserList"),
              style: "close",
            },
          ]
        );
     }
   } catch (error) {
     console.error(error);
   } finally {
    // setLoading(false);
    console.log("done");
   }
 }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Ionicons name={iconName} size={SIZES.icon} />
                    <Text style={{padding:SIZES.padding}}>Status: {statusString} </Text>
                    <Text style={{padding:SIZES.padding}}>Username: {username} </Text>
                    <Text style={{padding:SIZES.padding}}>Nickname: {nickname} </Text>
                    <Text style={{padding:SIZES.padding}}>Submitted At: {submitted_at} </Text>
                    <Text style={{padding:SIZES.padding}}>Updated At: {updated_at} </Text>
                </Card>
            {/* <Button
                title="Edit"
                onPress={()=>} 
            /> */}
            {statusString == "Approved"?(
                <View>
                <Button
                    title="Delete"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>deleteUser(request_id)}
                />
                <Button
                    title="Ban"
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
                    onPress={()=>changeUserStatus(request_id, USER_STATUS.banned)}
                />
                </View>
            ):(<View></View>)}


            {statusString == "Rejected"?(
                <View>
                <Button
                title="approve"
                buttonStyle={{
                    backgroundColor: 'green',
                    borderWidth: 2,
                    borderColor: 'green',
                    borderRadius: 30,
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>changeUserStatus(request_id, USER_STATUS.approved)}
                />
                <Button
                    title="Delete"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>deleteUser(request_id)}
                />
                
                </View>
            ):(<View></View>)}

            {statusString == "Waiting"?(
                <View>
                <Button
                title="approve"
                buttonStyle={{
                    backgroundColor: 'green',
                    borderWidth: 2,
                    borderColor: 'green',
                    borderRadius: 30,
                    opacity:0.8
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>changeUserStatus(request_id, USER_STATUS.approved)}
                />
                <Button
                    title="reject"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>changeUserStatus(request_id, USER_STATUS.rejected)}
                />
                </View>
            ):(<View></View>)}
            
            {statusString == "Banned"?(
                <View>
                <Button
                    title="Delete"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>deleteUser(request_id)}
                />
                <Button
                    title="Unban"
                    buttonStyle={{
                        backgroundColor: 'green',
                        borderWidth: 2,
                        borderColor: 'green',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>changeUserStatus(request_id, USER_STATUS.approved)}
                />
                </View>
            ):(<View></View>)}

            
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
