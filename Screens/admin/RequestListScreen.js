import React, {Component, useEffect, useState} from 'react';
import { FlatList, ScrollView, SafeAreaView, View, ActivityIndicator, Alert  } from 'react-native';
import {COLORS, SIZES, ICONS, STRINGS, REQUEST_STATUS, STYLES} from '../../components/style/theme.js';
import {  Text, Button, ListItem, Card} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";


export function requestList({navigation}){

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const getRequests = async () => {
      const API_URL = 'https://mufyptest.herokuapp.com/api/requests/find/';
  
      try {
        setLoading(true);
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
   useFocusEffect(
    React.useCallback(() => {
      getRequests();
      // Do something when the screen is focused
      return () => {
        console.log('not focused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
   );
   
    const renderItem = ({ item }) => {
        var iconName = ICONS.approved;
        var statusString = 'Approved';
        var status = item.status;
        if(status == REQUEST_STATUS.rejected){
            statusString = 'Rejected';
            iconName = ICONS.rejected;
        }else if(status == REQUEST_STATUS.waiting){
            statusString = 'Waiting';
            iconName = ICONS.waiting;
        }
    return(
        <TouchableOpacity onPress={() => navigation.navigate("RequestDetail",{
            question_id :item._id,
            question :item.question,
            difficulty : item.difficulty,
            answer : item.answer,
            options : item.options,
            images : item.images,
            authorName : item.authorName,
            authorRole : item.authorRole,
            status : item.status,
            submitted_at: item.submitted_at,
            updated_at: item.updated_at,
            statusString: statusString,
            iconName: iconName,

        })}>
            
            <ListItem>
                <Ionicons name={iconName} size={SIZES.icon} />
                <ListItem.Content>
                <ListItem.Title>Q: {item.question}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        );
    }
    return(
        
        <SafeAreaView style={{flex:1, paddingBottom:SIZES.tabBarheight}}>
            {isLoading?<ActivityIndicator/>:(
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                onRefresh={() => getRequests()}
                refreshing={isLoading}
                /> 
            )}
        </SafeAreaView>
    );
}

export function requestDetail({route, navigation}){
    const {question_id,iconName, statusString, question, difficulty, answer, options, authorName, authorRole, submitted_at, updated_at} = route.params;
    const images = route.params.images;
    var imagesLength = 0;
    if(images){
        console.log('images: ',images);
        imagesLength = images.length;
        var imageName = [];
        console.log(images);
        images.forEach(image=>{
            imageName.push("https://res.cloudinary.com/emilyfyp/image/upload/v1644578522/questions/"+image);
        });
    }
    var difficultyString = "Easy";
    if(difficulty == 1){
        difficultyString = "Medium";
    }
    if(difficulty == 2){
        difficultyString = "Hard";
    }
//delete a question
const deleteQuestion = async(question_id) => {
    console.log(question_id);
    const API_URL = 'https://mufyptest.herokuapp.com/api/question/delete/';

    try {
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            question_id: question_id,
            }),
        
     });
     const json = await response.json();
     if(response.status == 200){
        console.log("json",json);
        Alert.alert("Success","Question deleted",
        [
            {
              text: "Close",
              onPress: () => navigation.navigate("RequestList"),
              style: "close",
            },
          ]
        );
     }
   } catch (error) {
     console.error(error);
   } finally {
    // setLoading(false);
    console.log("done");
   }
 }
 
//approve or reject the question
const changeQuestionStatus = async(question_id, status) => {
    console.log(question_id);
    const API_URL = 'https://mufyptest.herokuapp.com/api/question/status/change/';

    try {
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            question_id: question_id,
            status: status,
            // updated_at: Danow(),
        }),
        
     });
     const json = await response.json();
     if(response.status == 200){
        console.log("json",json);
        Alert.alert("Success","question updated",
        [
            {
              text: "Close",
              onPress: () => navigation.navigate("RequestList"),
              style: "close",
            },
          ]
        );
     }
   } catch (error) {
     console.error(error);
   } finally {
    // setLoading(false);
    console.log("done");
   }
 }


    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
            <ScrollView>
                <Card borderRadius={SIZES.round}>
                    <Ionicons name={iconName} size={SIZES.icon} />
                    <Text style={{padding:SIZES.padding, fontSize:SIZES.text}}>Status: {statusString}</Text>
                    <Text style={{padding:SIZES.padding}}>Question: </Text>
                    <Text style={{padding:SIZES.padding}}>{question}</Text>
                    <Text style={{padding:SIZES.padding}}>Difficulty: {difficultyString}</Text>
                    <Text style={{padding:SIZES.padding}}>Answer: </Text>
                    <View  style={{padding:SIZES.padding, borderRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.primary,
                            marginBottom:SIZES.margin}}>
                            <Text style={{fontWeight:"bold",color:"white"}}>{answer+1}. {options[answer]}</Text>
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
                    
                    <Text style={{padding:SIZES.padding}}>Uploaded images: {imagesLength}</Text>
                    {images?(
                        <SliderBox 
                        images={imageName}
                        sliderBoxHeight={250}
                        dotColor="#FFFFFF"
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
                        ImageComponentStyle={{
                            width: '90%', 
                            margin:10,
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "center",
                          }}
                        resizeMethod={'resize'}
                        resizeMode={'contain'}
                        parentWidth = {360}
                        circleLoop
                        imageLoadingColor={COLORS.primary}
                    />
                    ):(
                        <></>
                    )}
                    <Text style={{padding:SIZES.padding}}>Submitted_at: {submitted_at}</Text>
                    <Text style={{padding:SIZES.padding}}>Updated_at: {updated_at}</Text>

                </Card>

                {statusString == "Approved"?(
                <View>
                <Button
                    title="Delete"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>deleteQuestion(question_id)}
                />
                <Button
                        title="Reject"
                        buttonStyle={{
                            backgroundColor: 'orange',
                            borderWidth: 2,
                            borderColor: 'orange',
                            borderRadius: 30,
                            opacity:0.8
                            }}
                        containerStyle={{
                            width: 'auto',
                            marginHorizontal: 50,
                            marginVertical: 10,
                            }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>changeQuestionStatus(question_id, REQUEST_STATUS.rejected)}
                    />
                </View>
            ):(
                <View></View>
            )}
            {statusString == "Rejected"?(
                <View>
                <Button
                    title="Delete"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>deleteQuestion(question_id)}
                />
                <Button
                        title="Approve"
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderWidth: 2,
                            borderColor: 'green',
                            borderRadius: 30,
                            opacity:0.8
                            }}
                        containerStyle={{
                            width: 'auto',
                            marginHorizontal: 50,
                            marginVertical: 10,
                            }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>changeQuestionStatus(question_id, REQUEST_STATUS.approved)}
                    />
                </View>
            ):(
                <View></View>
            )}
            {statusString == "Waiting"?(
                <View>
                    <Button
                        title="Approve"
                        buttonStyle={{
                            backgroundColor: 'green',
                            borderWidth: 2,
                            borderColor: 'green',
                            borderRadius: 30,
                            opacity:0.8
                            }}
                        containerStyle={{
                            width: 'auto',
                            marginHorizontal: 50,
                            marginVertical: 10,
                            }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>changeQuestionStatus(question_id, REQUEST_STATUS.approved)}
                    />
                    <Button
                        title="Reject"
                        buttonStyle={{
                            backgroundColor: 'orange',
                            borderWidth: 2,
                            borderColor: 'orange',
                            borderRadius: 30,
                            opacity:0.8
                            }}
                        containerStyle={{
                            width: 'auto',
                            marginHorizontal: 50,
                            marginVertical: 10,
                            }}
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={()=>changeQuestionStatus(question_id, REQUEST_STATUS.rejected)}
                    />
                </View>
                    ):(
                        <View></View>
                    )}
                </ScrollView>
            </SafeAreaView>

    );
}