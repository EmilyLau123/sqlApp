import React, {Component} from 'react';
import { FlatList, ScrollView, SafeAreaView } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS} from '../components/style/theme.js';
import {  Text, Button, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';



function userList({navigation}){
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
    const renderItem = ({ item , navigation}) => (
        <TouchableOpacity onPress={()=>navigation.navigate("UserDetail")}>
            <ListItem>
            <ListItem.Content>
            <ListItem.Title>{item.title}, This thing is checked</ListItem.Title>
            </ListItem.Content>
        </ListItem>
        </TouchableOpacity>
        
        );
    return(
        <FlatList 
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}

        />
            
    );
}

function userDetail(){
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
                <Text style={{padding:SIZES.padding}}>Status: </Text>
                <Text style={{padding:SIZES.padding}}>Username: </Text>
                <Text style={{padding:SIZES.padding}}>Nickname: </Text>
                <Text style={{padding:SIZES.padding}}>Created_at: </Text>
                <Text style={{padding:SIZES.padding}}>Approved_at: </Text>
            </ScrollView>
        </SafeAreaView>
    );
}


const Stack = createStackNavigator();

function userListScreen(){
    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Stack.Navigator>
                    <Stack.Screen name="UserList" component={userList} options={{ title: 'User List' }}/>
                    <Stack.Screen name="userDetail" component={userDetail} options={{ title: 'User Detail' }}/>

                </Stack.Navigator>
            </ScrollView>
        </SafeAreaView>
    );
}

export default userListScreen;
