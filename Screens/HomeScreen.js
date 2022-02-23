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
// import {AccountScreen} from './AccountScreen';
import {SIZES, COLORS, USER_ROLE} from '../components/style/theme';
import { createStackNavigator } from '@react-navigation/stack';
//auth
import { Provider, useSelector } from 'react-redux';


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

const loginUser = async (username,password, userRole) => {
        console.log(username,password, userRole);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/login/';
    
        try {
         const response = await fetch(API_URL,{
             method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                username: username,
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

  const getKnowledge = async (userRole) => {
    console.log("know. role: ", userRole,username);
    var API_URL = 'https://mufyptest.herokuapp.com/api/knowledge/find/'+username;
    if(userRole != 0){
      API_URL = 'https://mufyptest.herokuapp.com/api/knowledge/find/any';
    }

    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(json[0]);
        setknowledgeTitle(json[0].title);
        setknowledgeContent(json[0].description);
        setKnowledgeImages(json[0].images);
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

  // const { role,nickname } = useUsername();

  // if(route.params != null){
  //     username = route.params;
  // }
  return(
    <SafeAreaView style={{flex:1}}>
          {/* <ImageBackground source={{uri: "https://reactjs.org/logo-og.png"}} resizeMode="cover" style={styles.image}> */}

      
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
            <Text size={SIZES.text} style={{padding:SIZES.text}}>{displayContent}</Text>
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
                  //onPress={()=>toggleOverlay()}
                  onPress={() => navigation.navigate("StatementDetail",{
        // statement_id: item._id,
        title:knowledgeTitle,
        description:knowledgeContent,
        images:knowledgeImages,
        // author:item.author, 
        // images: item.images

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

            {/* <Overlay isVisible={isView} onBackdropPress={()=>toggleOverlay()}>
            <SafeAreaView style={{height:SIZES.height-300, width: SIZES.width-100}}>
              <ScrollView>
                <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>{knowledgeTitle}</Text>
                 {haveImage?(
                <View>
                 <SliderBox 
                    images={imageName}
                    sliderBoxHeight={400}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 15,
                        marginHorizontal: 10,
                        padding: 0,
                        margin: 0
                    }}
                    paginationBoxVerticalPadding={20}
                    ImageComponentStyle={{borderRadius: 15, width: '93%', margin:10}}
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    parentWidth = {390}
                    circleLoop
                    imageLoadingColor={COLORS.primary}
                    // onCurrentImagePressed={(index) => toggleShowImage(true, index)}
                    currentImageEmitter = {(index)=>setCurrentImage(index)}
                />
                    </View>
                ):(
                    <></>
                )} */}
                
                {/* <Text style={{padding:10, fontSize:14}}>{knowledgeContent}</Text>

              </ScrollView>
              </SafeAreaView> */}
            {/* </Overlay> */}

      {role==USER_ROLE.admin||role==USER_ROLE.teacher?(
          <FAB
            visible={true}
            onPress={() =>navigation.navigate("RequestSubmit")}
            placement="right"
            icon={{ name: 'add', color: 'white' }}
            color="#d9cc35"
          />
      ):(
        <View></View>
      )}
        
        {/* </ImageBackground> */}
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
