import React, {Component, useState, useEffect} from 'react';
import { Alert,TouchableOpacity, View, StyleSheet, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS} from '../../components/style/theme';

export function HistoryFullList({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const user_id = useSelector(state => state.statReducer.stat);

            


  const getHistories = async (user_id) => {

    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/questions/find/';

    try {
        const response = await fetch(API_URL,{
            method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                user_id: user_id,
            }),
                
        });
          const json = await response.json();

         if(response.status == 200){
           
            setData(json);
            setLoading(false);
            
         }else{
           console.log("error");
         }
    }catch(error){
      console.log(error);
    }

 useEffect(() => {
  getHistories(user_id);
 }, []);

//  const searchButton = (searchText) => {
//     setLoading(true);
//    setSearch(searchText);
//    getHistories(searchText);
// //    console.log(search);
//  }

const renderItem = ({ item }) => {
    var iconName = ICONS.approved;
    var hide = item.hide;
    // if(hide == 1){
    //     iconName = ICONS.rejected;
    // }else if(hide == 0){
    //     iconName = ICONS.approved;
    // }
        
return(
    <TouchableOpacity onPress={()=>navigation.navigate("HistoryFullDetail",{
        question_id:item._id,
        question: item.question,
        difficulty: item.difficulty,
        answer: item.answer,
        options: item.options,
        author: item.author,
        role: item.role ,// admin,
        images: item.images,
        submitted_at:item.submitted_at,
        updated_at:item.updated_at,
        iconName : iconName,

        

      })}>
        <ListItem>
        <Ionicons name={iconName} size={SIZES.icon} />
        <ListItem.Content>
        <ListItem.Title>{item.title} ({item.author})</ListItem.Title>
        <Text>Submitted_at: {item.submitted_at}</Text>
        </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
    
    );
 }
   }

    return(
      //style={{backgroundColor:COLORS.background}}
      <SafeAreaView>
        {/* <SearchBar 
          searchIcon={true}
          clearIcon={true}
          placeholder="Type Here..."
          onChangeText={(value)=>searchButton(value)}
          value={search}
        /> */}
        {isLoading?<ActivityIndicator/>:(
          
        <View style={{paddingBottom:SIZES.listPaddingBottom}}>
          <FlatList
            data={data}
            renderItem= {renderItem}
            keyExtractor={item => item._id}
            onRefresh={() => getHistories(user_id)}
            refreshing={isLoading}
            
          /> 
        
          </View>
          )}
      </SafeAreaView>
      
  );
}

