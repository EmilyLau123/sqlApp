import React, { Component, useState, useEffect } from 'react';
import {
    Text,
    Image,
    Button,
    Alert,
    Card,
    FAB,
    Overlay
    } from 'react-native-elements';

import { SectionList,ScrollView, StyleSheet, SafeAreaView, ImageBackground, View, ActivityIndicator, Model } from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {requestSubmitScreen} from './form/RequestSubmitScreen';
import {Quiz, quizChooseScreen, congratScreen} from './QuizScreen';
import {askSignInScreen} from './QuizScreen';
import {SIZES, COLORS, USER_ROLE} from '../components/style/theme';
import { createStackNavigator } from '@react-navigation/stack';
//auth
import { Provider, useSelector } from 'react-redux';

import { WebView } from 'react-native-webview';


const styles = StyleSheet.create({
  Text: {
   padding:5
  },
  Title:{
    fontWeight:'bold',
    fontSize:16,
    padding:10
  },
  
  item: {
    padding: 5,
    fontSize: 12,
    height: 30,
  },
  listItem: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    opacity: 0.5,
  },
})


function homeWelcomeHeader({route,navigation}){
  const username = useSelector(state => state.usernameReducer.username);
  const nickname = useSelector(state => state.nicknameReducer.nickname);
  const role = useSelector(state => state.roleReducer.role);
  const stat = useSelector(state => state.statReducer.stat);
  const user_id = useSelector(state => state.userIdReducer.user_id);
  const [knowledgeTitle, setknowledgeTitle] = useState("");
  var [knowledgeImages, setKnowledgeImages] = useState([]);
  const [knowledgeContent, setknowledgeContent] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isView, setIsView] = useState(false);
  const [displayContent, setDisplayContent] = useState("");

  

  var haveImage = false;
  var imageName = [];

const toggleOverlay =() => {
        setIsView(!isView);
    };

const loginUser = async (inputUsername,password, userRole) => {
        console.log(inputUsername,password, userRole);
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/login/';
    
        try {
         const response = await fetch(API_URL,{
             method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                username: inputUsername,
                password: password,
                role: userRole
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
            alert("Logged in");
            
         }else{
             alert("User not found");
         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }

  const getKnowledge = async (userRole, username) => {
    
    console.log("know. role: ", userRole,username);
    var API_URL = 'https://mufyptest.herokuapp.com/api/knowledge/find/'+username;
    if(userRole != 0 || stat == []){
      API_URL = 'https://mufyptest.herokuapp.com/api/knowledge/find/any';
    }

    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log("knowledge card content:", json[0]);
        setknowledgeTitle(json[0].title);
        setknowledgeContent(json[0].description);
        setKnowledgeImages(json[0].images);
        var des = '';
        des = json[0].description.split('.')[0].substring(8);
        setDisplayContent(json[0].description.split('.')[0]+"...");
    
      } catch (error) {
        console.error(error);
      } finally {
        
        setLoading(false);
        console.log("done");
      }
    }
useEffect(() => {
  getKnowledge(role,username);
 }, []);


  return(
    <SafeAreaView style={{flex:1}}>

      
      <ScrollView style={{backgroundColor:COLORS.background}}>
        <Card borderRadius={SIZES.round}>
        <Card.Title> Welcome</Card.Title>
          <Card.Divider />
          <Text size={SIZES.text} style={{padding:SIZES.text}}>Hi {nickname}!</Text>
          <Text size={SIZES.text} style={{padding:SIZES.text}}>Remember practice makes perfect!</Text>
        </Card>
        <Card borderRadius={SIZES.round}>
          <Card.Title> Today's Knowledge</Card.Title>
          <Card.Divider />
          {isLoading?(
            <ActivityIndicator/>
          ):(
            <>
            
            <Text size={SIZES.title} style={{padding:SIZES.text, fontWeight:"bold"}}>{knowledgeTitle}</Text>
      
            <WebView 
              style={{flex:1,height:80}}
              originWhitelist={['*']}
              source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-family: Optima">'+displayContent+'</body></html>' }}
            />
            <Button title='View Details' 
                  buttonStyle={{
                    backgroundColor: COLORS.primary,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={() => navigation.navigate("StatementDetail",{
        title:knowledgeTitle,
        description:knowledgeContent,
        images:knowledgeImages,

      })}
                  />
            </>
          )}
          
        </Card>

        {role == USER_ROLE.anonymous?(
          <Button title='Quiz' 
                buttonStyle={{
                  backgroundColor: '#77afac',
                  borderWidth: 2,
                  borderColor: '#77afac',
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 'auto',
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>navigation.navigate("AskSignIn")}></Button>
        ):(
          <Button title='Quiz' 
                buttonStyle={{
                  backgroundColor: '#77afac',
                  borderWidth: 2,
                  borderColor: '#77afac',
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 'auto',
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>navigation.navigate("Choose")}></Button>
        )}
        
      </ScrollView>
    </SafeAreaView>

  )
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen=({route})=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={homeWelcomeHeader} options={{title:"Home"}}/>
      <Stack.Screen name="Choose" component={quizChooseScreen} options={{title:"Choose a difficulty"}}/>
      <Stack.Screen name="AskSignIn" component={askSignInScreen} options={{title:"Quiz"}}/>
      <Stack.Screen name="Quiz" component={Quiz} options={{title:"Quiz",headerShown: false}}/>
      <Stack.Screen name="Congrats" component={congratScreen} options={{title:"congrats", headerShown: false}}/>
      <Stack.Screen name="RequestSubmit" component={requestSubmitScreen} options={{title:"Request Form"}}/>

    </Stack.Navigator>
  );
}
export default HomeScreen;
