import React, {Component, useState, useEffect, useRef} from 'react';
import { FlatList, ScrollView, View, SafeAreaView, ActivityIndicator, Alert, Model } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS, USER_STATUS, USER_ROLE} from '../../components/style/theme.js';
import {  Text, Button, ListItem, Card, LinearProgress, Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';



export function userList({navigation,route}){

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const mounted=useRef(false);
    // const [update, setUpdate] = useState(false);
    
    // if(route.params != null){
    //         setUpdate(true);
    //     }
    //get user list
    const getUsers = async () => {
      //https://reactnative.dev/movies.json
      //http://localhost:8099/api/retrieveStatements/
      const API_URL = 'https://mufyptest.herokuapp.com/api/find/users/';
  
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
       if(mounted.current===false){
           getUsers();
        mounted.current=true;
        /* 下面是 第一次渲染後 */
    
    
        /* 上面是 第一次渲染後 */      
      }
      else{
          getUsers();
        /* 下面是元件更新後 */
    
    
        /* 上面是元件更新後 */

      }
    
   }, []);

    
    

    const renderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var statusString = 'Approved';
        var status = item.status;
        if(status == USER_STATUS.rejected){
            statusString = 'Rejected';
            iconName = ICONS.rejected;
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
            email:item.email,
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
                height={SIZES.height}
                /> 
            )}
        </SafeAreaView>
    );
}


export function userDetail({route,navigation}){
    const { submitted_at,user_id, iconName, statusString, username, nickname, updated_at, email } = route.params;
    
    const [progress, setProgress] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [back, setBack] = useState(false);
    const toggleOverlay = (back) => {
        setIsSending(!isSending);
        if(back == true){
            setBack(back);
        }
    };
    // const progressAdjust = (amount) => {
    //     setProgress(progress+amount);
    // };

// useEffect(() => {
//     let subs = true;
//     if (progress < 1 && progress !== 0) {
//       setTimeout(() => {
//         if (subs) {
//           setProgress(progress + 0.1);
//         }
//       }, 100);
//     }
//     return () => {
//       subs = false;
//     };
//   }, [progress]);

    //delete a user
    const deleteUser = async(user_id) => {
        console.log(user_id);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/delete';
    
        try {
            toggleOverlay();
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
            // setUpdate(true);
            console.log("json",json);
            toggleOverlay(true);
            // Alert.alert("Success","User deleted",
            // [
            //     {
            //       text: "Close",
            //       onPress: () => navigation.navigate("UserList"),
            //       style: "close",
            //     },
            //   ]
            // );
         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }

//change a user status, not send email
const changeUserStatus = async(user_id, status) => {
    console.log(user_id);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/status/change';

    try {
        toggleOverlay();
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            user_id: user_id,
            status: status,
            // updated_at: Danow(),
        }),
        
     });
     const json = await response.json();
     toggleOverlay(true);
    //  return response;
    //  if(response.status == 200){
    //     console.log("json",json);
    //     Alert.alert("Success","User updated",
    //     [
    //         {
    //           text: "Close",
    //           onPress: () => navigation.navigate("UserList"),
    //           style: "close",
    //         },
    //       ]
    //     );
    //  }else{
    //     console.log("Fail");

    //  }
   } catch (error) {
     console.error(error);
   } finally {
    // setLoading(false);
    console.log("status");
    

   }
 }

const sendEmail = async(email, status) => {
    try{
       var EMAIL_API_URL = 'https://mufyptest.herokuapp.com/api/sendEmail/rejected';

         if(status == USER_STATUS.approved){
            EMAIL_API_URL = 'https://mufyptest.herokuapp.com/api/sendEmail/approved';
         
     }
        
        const emailResponse = await fetch(EMAIL_API_URL,{
            method:"POST",
               headers: {
                   'Content-Type':'application/json',
                   'Accept':'application/json'
               },
            body: JSON.stringify({
               email: email,
            //    status: status,
               // updated_at: Danow(),
           }),
           
        });
        
        // var emailJson = await emailResponse.json();
        return emailResponse;
     
     
    } catch (error) {
        console.error(error);
    } finally {
        // setLoading(false);
        // setIsSending(false);
        console.log("email");
    }
    }

//change a user status, DO send email
const changeUserStatusAndEmail = async(user_id, email, status) => {
    // const [progress, setProgress] = React.useState(0);
    // console.log("change");
    try{
        // const [progress, setProgress] = useState(0);
        // setIsSending(true);
        toggleOverlay();
        //send email
        var EMAIL_API_URL = 'https://mufyptest.herokuapp.com/api/sendEmail/rejected';

         if(status == USER_STATUS.approved){
            EMAIL_API_URL = 'https://mufyptest.herokuapp.com/api/sendEmail/approved';
        }
        
        const emailResponse = await fetch(EMAIL_API_URL,{
            method:"POST",
               headers: {
                   'Content-Type':'application/json',
                   'Accept':'application/json'
               },
            body: JSON.stringify({
               email: email,
            //    status: status,
               // updated_at: Danow(),
           }),
           
        });
        //var emailResponse = await sendEmail(email, status);
        //change status
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/status/change';

        const response = await fetch(API_URL,{
            method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                user_id: user_id,
                status: status,
                // updated_at: Danow(),
            }),
            
        });
        const json = await response.json();
        const emailJson = await emailResponse.json();

        if(emailResponse.status == 200 && response.status == 200){
            // alert("User approved and notified!");
            
            console.log("approved and emailed");
            toggleOverlay(true);
        }else{
            alert("Oops! Something went wrong...");
            console.log("NO approved and emailed");
        }

    }catch(error){
        console.log(error);
    }finally{
        console.log("sent");
        
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
                    <Text style={{padding:SIZES.padding}}>Email: {email} </Text>

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
                    onPress={()=>deleteUser(user_id)}
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
                    onPress={()=>changeUserStatus(user_id, USER_STATUS.banned)}
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
                onPress={()=>changeUserStatus(user_id, USER_STATUS.approved)}
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
                    onPress={()=>deleteUser(user_id)}
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
                onPress={()=>changeUserStatusAndEmail(user_id, email, USER_STATUS.approved)}
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
                    onPress={()=>changeUserStatusAndEmail(user_id, email, USER_STATUS.rejected)}
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
                    onPress={()=>deleteUser(user_id)}
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
                    onPress={()=>changeUserStatus(user_id, USER_STATUS.approved)}
                />
                </View>
            ):(<View></View>)}

      <Overlay isVisible={isSending} onBackdropPress={()=>navigation.navigate("UserList")}>
        <View style={{height:100, width:250, margin:10}}>
                {back?(
                    <>
                    <Text style={{padding:10, alignSelf:"center",fontSize:16,}}>User status changed!</Text>
                    <Button title="Back to user list"
                    buttonStyle={{
                        backgroundColor: COLORS.primary,
                        borderWidth: 2,
                        borderColor: COLORS.primary,
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    onPress={()=>navigation.navigate("UserList")}/>
                    </>
                ):(
                    <>
                    <Text style={{padding:10, alignSelf:"center", paddingBottom:10, fontSize:16}}>Loading...</Text>
                    <LinearProgress color={COLORS.primary}/>
                    </>
                )}
        </View>
                
            </Overlay>

            
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
