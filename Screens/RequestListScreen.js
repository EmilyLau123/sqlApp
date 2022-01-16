import React, {Component} from 'react';
import { FlatList, ScrollView, SafeAreaView } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS} from '../components/style/theme.js';
import {  Text, Button, ListItem, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function requestList({navigation}){
    const DATA = [
        {
            username: 'asdf123',
            nickname: 'sdfgb',
            password: 'dsadas',
            quizDone: [{quizID: 1, quizMark: 6},
                        {quizID: 3, quizMark: 5}],
            role: 'teacher',
            approved:Boolean,
            token:String,
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
        <TouchableOpacity onPress={() => navigation.navigate("RequestDetail")}>
            <ListItem>
                <ListItem.Content>
                <ListItem.Title>{item.title}, This thing is checked</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        );
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

export function requestDetail(){
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
   
    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Text style={{padding:SIZES.padding, fontSize:SIZES.text}}>Status: </Text>
                    <Text style={{padding:SIZES.padding}}>Title: </Text>
                    <Text style={{padding:SIZES.padding}}>Description: </Text>
                    <Text style={{padding:SIZES.padding}}>Images: should be image element</Text>
                    <Text style={{padding:SIZES.padding}}>Author: </Text>
                    <Text style={{padding:SIZES.padding}}>Created_at: </Text>
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