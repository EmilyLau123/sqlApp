import React, {Component} from 'react';
import { FlatList, ScrollView, SafeAreaView, View } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS, STATUS} from '../components/style/theme.js';
import {  Text, Button, ListItem, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function requestList({navigation}){
    const DATA = [
        {
            question: 'What is SQL? ',
            difficulty: 'Easy',
            answer:'A',
            options:[{A:'language', B: 'thing', C: 'idk', D:'sdasd'}],
            images: 'imagesss',
            author: 'admin',
            status:1,
          },
          {
            question: 'What is IDE? ',
            difficulty: 'Easy',
            answer:'D',
            options:[{A:'language', B: 'thing', C: 'idk', D:'sdasd'}],
            images: 'imagesss',
            author: 'avc',
            status:4,
          },
          {
            question: 'What is SELECT? ',
            difficulty: 'Medium',
            answer:'B',
            options:[{A:'language', B: 'thing', C: 'idk', D:'sdasd'}],
            images: 'imagesss',
            author: 'dsq',
            status:2,
          },
    ];
    const renderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var statusString = STATUS.approved;
        var status = item.status;
        if(status == STATUS.rejected){
            statusString = STATUS.rejected;
            iconName = 'Rejected';
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
            <FlatList 
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}

            />
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
                    <Text style={{padding:SIZES.padding}}>Answer: {answer}</Text>
                    {/* <View  style={{padding:SIZES.padding, borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: COLORS.primary,
                                    backgroundColor: COLORS.secondary,
                                    opacity:0.5,
                                    color:"white",
                                    marginBottom:SIZES.margin}}>{options[0].answer}</View> */}
                    <Text>Options: </Text>
                    <View  style={{padding:SIZES.padding, borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: COLORS.primary,
                                    backgroundColor: COLORS.black,
                                    opacity:0.5,
                                    color:"white",
                                    fontWeight:"bold",
                                    marginBottom:SIZES.margin}}>{options[0].A}</View>
                    <View  style={{padding:SIZES.padding, borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: COLORS.primary,
                                    backgroundColor: COLORS.black,
                                    opacity:0.5,
                                    color:"white",
                                    fontWeight:"bold",
                                    marginBottom:SIZES.margin}}>{options[0].B}</View>
                    <View  style={{padding:SIZES.padding, borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: COLORS.primary,
                                    backgroundColor: COLORS.black,
                                    opacity:0.5,
                                    color:"white",
                                    fontWeight:"bold",
                                    marginBottom:SIZES.margin}}>{options[0].C}</View>
                    <View  style={{padding:SIZES.padding, borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: COLORS.primary,
                                    backgroundColor: COLORS.black,
                                    opacity:0.5,
                                    color:"white",
                                    fontWeight:"bold",
                                    marginBottom:SIZES.margin}}>{options[0].D}</View>
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