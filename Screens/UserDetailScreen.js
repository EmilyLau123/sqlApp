import React, {Component} from 'react';
import { FlatList, ScrollView, SafeAreaView } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS} from '../components/style/theme.js';
import {  Text, Button, ListItem } from 'react-native-elements';


function userDetailScreen(){
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

export default userDetailScreen;
