import React, {Component} from 'react';
import { FlatList, ScrollView, SafeAreaView } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS} from '../components/style/theme.js';
import {  Text, Button, ListItem } from 'react-native-elements';


function requestListScreen(){
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
    const renderItem = ({ item }) => (
        <ListItem>
            <ListItem.Content>
            <ListItem.Title>{item.title}, This thing is checked</ListItem.Title>
            </ListItem.Content>
        </ListItem>
        );
    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <FlatList 
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}

                />
            </ScrollView>
        </SafeAreaView>
    );
}

export default requestListScreen;