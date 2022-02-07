import React, {Component, useState, useEffect} from 'react';
import { Alert,TouchableOpacity, View, StyleSheet, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS,REQUEST_STATUS} from '../../components/style/theme';

export function HistoryFullList({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const username = useSelector(state => state.usernameReducer.username);

            


  const getHistories = async (username) => {

    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/questions/find/';
  console.log('try');
    try {
      console.log('fetch');
        const response = await fetch(API_URL,{
            method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                username: username,
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
    }finally{
      console.log("user history found");
    }
  }

 useEffect(() => {
  getHistories(username);
 }, []);

//  const searchButton = (searchText) => {
//     setLoading(true);
//    setSearch(searchText);
//    getHistories(searchText);
// //    console.log(search);
//  }

const renderItem = ({ item }) => {
  //status from int to string
    var iconName = ICONS.approved;
    var status = item.status;
    var statusString  = "Approved";
    if(status == REQUEST_STATUS.rejected){
        iconName = ICONS.rejected;
        statusString  = "Rejected";
    }else if(status == REQUEST_STATUS.waiting){
        iconName = ICONS.waiting;
        statusString  = "Waiting";
    }
//diff from int to string
    var difficulty = item.difficulty;
    var difficultyString  = "Hard";
    if(difficulty == 0){
        difficultyString  = "Easy";
    }else if(difficulty == 1){
        difficultyString  = "Medium";
    }
        
return(
    <TouchableOpacity onPress={()=>navigation.navigate("SubmitHistoryDetail",{
        // question_id:item._id,
        question: item.question,
        difficulty: difficultyString,
        answer: item.answer,
        options: item.options,
        // author: item.author,
        // role: item.role ,// admin,
        images: item.images,
        submitted_at:item.submitted_at,
        updated_at:item.updated_at,
        iconName : iconName,
        statusString: statusString

        

      })}>
        <ListItem>
        <Ionicons name={iconName} size={SIZES.icon} />
        <ListItem.Content>
        {/* <ListItem.Title>{item.title} ({item.author})</ListItem.Title> */}
        <Text>question: {item.question}</Text>
        <Text>Submitted_at: {item.submitted_at}</Text>
        </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
    
    );
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
            onRefresh={() => getHistories(username)}
            refreshing={isLoading}
            height={SIZES.height-150}
            
          /> 
        
          </View>
          )}
      </SafeAreaView>
      
  );
}


//Detail page
export function HistoryFullDetail({route,navigation}){
  const { question,difficulty, iconName, answer, options, images, statusString,updated_at, submitted_at } = route.params;
  return(
   <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
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

        {options.map((item,index) => (
            
            <View  style={{padding:SIZES.padding, borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primary,
                marginBottom:SIZES.margin}}>
                <Text style={{fontWeight:"bold",color:"white"}}>{index+1}. {item}</Text>
            </View>
        ))}
        <Text style={{padding:SIZES.padding}}>Images: should be image element{images}</Text>
        <Text style={{padding:SIZES.padding}}>Submitted_at: {submitted_at}</Text>
        <Text style={{padding:SIZES.padding}}>Updated_at: {updated_at}</Text>

    </Card>
  </SafeAreaView>
  );
}


