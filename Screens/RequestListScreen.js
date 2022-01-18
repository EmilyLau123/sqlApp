import React, {Component, useEffect, useState} from 'react';
import { FlatList, ScrollView, SafeAreaView, View, ActivityIndicator } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS, STATUS} from '../components/style/theme.js';
import {  Text, Button, ListItem, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


export function requestList({navigation}){

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
  
    const getRequests = async () => {
      //https://reactnative.dev/movies.json
      //http://localhost:8099/api/retrieveStatements/
      const API_URL = 'http://localhost:8099/api/retrieveRequests/';
  
      try {
       const response = await fetch(API_URL);
       const json = await response.json();
       console.log(json);
       setData(json);
     } catch (error) {
       console.error(error);
     } finally {
      setLoading(false);
      console.log("done");
     }
   }
  
   useEffect(() => {
    getRequests();
   }, []);
    const renderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var statusString = 'Approved';
        var status = item.status;
        if(status == STATUS.rejected){
            statusString = 'Rejected';
            iconName = ICONS.rejected;
        }else if(status == STATUS.waiting){
            statusString = 'Waiting';
            iconName = ICONS.waiting;
        }
    return(
        <TouchableOpacity onPress={() => navigation.navigate("RequestDetail",{
            question :item.question,
            difficulty : item.difficulty,
            answer : item.answer,
            options : item.options,
            images : item.images,
            author : item.author,
            status : item.status,
            created_at: item.created_at,
            statusString: statusString,
            iconName: iconName,

        })}>
            
            <ListItem>
                <Ionicons name={iconName} size={SIZES.icon} />
                <ListItem.Content>
                <ListItem.Title>Q: {item.question}</ListItem.Title>
                <Text>From: {item.author}</Text>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        );
    }
    return(
        
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            {isLoading?<ActivityIndicator/>:(
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                /> 
            )}
        </SafeAreaView>
    );
}

export function requestDetail({route}){
    const {iconName, statusString, question, difficulty, answer, options, images, author, created_at} = route.params;
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Ionicons name={iconName} size={SIZES.icon} />
                    <Text style={{padding:SIZES.padding, fontSize:SIZES.text}}>Status: {statusString}</Text>
                    <Text style={{padding:SIZES.padding}}>Question: {question}</Text>
                    <Text style={{padding:SIZES.padding}}>Difficulty: {difficulty}</Text>
                    <Text style={{padding:SIZES.padding}}>Answer: </Text>
                    <View  style={{padding:SIZES.padding, borderRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.primary,
                            marginBottom:SIZES.margin}}>
                            <Text style={{fontWeight:"bold",color:"white"}}>{options[answer]}</Text>
                        </View>
                    <Text style={{padding:SIZES.padding}}>Options: </Text>

                    {options.map(item => (
                        <View  style={{padding:SIZES.padding, borderRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.primary,
                            marginBottom:SIZES.margin}}>
                            <Text style={{fontWeight:"bold",color:"white"}}>{item}</Text>
                        </View>
                    ))}
                    <Text style={{padding:SIZES.padding}}>Images: should be image element{images}</Text>
                    <Text style={{padding:SIZES.padding}}>Author: {author}</Text>
                    <Text style={{padding:SIZES.padding}}>Created_at: {created_at}</Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

// function requestListScreen(){
//     return(
//         <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
//             <Stack.Navigator>
//                 <Stack.Screen name="RequestList" component={requestList} options={{ title: 'Request List', headerShown: false}}/>
//                 <Stack.Screen name="RequestDetail" component={requestDetail} options={{ title: 'Request Detail', headerShown: false }}/>
//             </Stack.Navigator>
//         </SafeAreaView>
//     );
// }

// export default requestListScreen;