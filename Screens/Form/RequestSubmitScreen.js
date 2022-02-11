import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Model} from 'react-native';
import { Text, Button, Input,ButtonGroup, Card, Overlay, LinearProgress } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {COLORS, SIZES, ICONS, STRINGS, STATUS, STYLES} from '../../components/style/theme.js';
import * as ImagePicker from 'expo-image-picker';
//auth
import { Provider, useSelector } from 'react-redux';
// import customButton from '../components/customButton.js';

const styles = StyleSheet.create({
    header:{
        color:"black", 
        fontSize:16, 
        alignSelf:"center", 
        fontWeight:"bold",
        padding:5
        },
    }
);


export function requestSubmitScreen({navigation}){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexAnswer, setSelectedIndexAnswer] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [question, setQuestion] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [option1 , setOption1] = useState("");
    const [option2 , setOption2] = useState("");
    const [option3 , setOption3] = useState("");
    const [option4 , setOption4] = useState("");
    const [images, setImages] = useState([]);
    const username = useSelector(state => state.usernameReducer.username);
    const role = useSelector(state => state.roleReducer.role);
   

    function refresh(){
        setQuestion("");
        setDifficulty(0);
        setAnswer(0);
        setSelectedIndexAnswer(0);
        setSelectedIndex(0);
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");

    }
    
    const toggleOverlay =(status) => {
        setIsLoading(status);
    };

    const insertQuiz = async (question, difficulty, answer, options, username, role) => {

        console.log(question, difficulty, answer, options);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        //https://mufyptest.herokuapp.com/api/question/insert/
        const API_URL = 'https://mufyptest.herokuapp.com/api/question/insert/';
    
        try {
            toggleOverlay(true);
         const response = await fetch(API_URL,{
             method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                question: question,
                difficulty: difficulty,
                answer: answer,
                options: options,
                author: username,
                role: role ,// admin,
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
             toggleOverlay(false);
            console.log("json",json);
            Alert.alert("Success","Submit success",
            [
                {
                  text: "Back to home",
                  onPress: () => navigation.navigate("Home",{
                      role:1,
                      status:true,
                  }),
                  style: "close",
                },
                {
                    text: "Continue Adding",
                    onPress: () => refresh(),
                    style: "close",
                  },
              ]
            );
         }else{
            console.log("json",json);
            alert("error");

         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }
//to upload image NOT DONE
const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    // console.log(result);
    if (!result.cancelled) {
        var base64 = 'data:image/jpg;base64,' + result.base64;
        images.push(base64);
        setImages(images);
        // console.log(images);
    }
  };
//   useEffect(()=>{
//     alert("added");
//     return(
//         <Text>click</Text>
//     )
// },[images]
// );
    return(
        <ScrollView style={{backgroundColor:COLORS.background}}>
            <Card borderRadius={SIZES.round}>
                <Text style={styles.header}>Submit a quiz question</Text>
                <Text style={styles.header}>You may upload 1-5 pictures for one question, answer should be provided in MC format</Text>
            
            </Card>
            <Card borderRadius={SIZES.round}>
            <Text>Question *</Text><Input
                style={STYLES.input}
                onChangeText={question => setQuestion(question)}
                defaultValue={question}
                multiline={true}
            />
            <Text>Difficulty *</Text>
            <ButtonGroup
                textStyle={{fontWeight:"bold"}}
                buttons={['Easy', 'Medium', 'Hard']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                    setDifficulty(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />
            <Text>Answer: </Text>
            <ButtonGroup
                textStyle={{fontWeight:"bold"}}
                buttons={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
                selectedIndex={selectedIndexAnswer}
                onPress={(value) => {
                    setSelectedIndexAnswer(value);
                    setAnswer(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />
            <Text>Options</Text><Input
                style={STYLES.input}
                onChangeText={option1 => setOption1(option1)}
                defaultValue={option1}
                placeholder="Enter value for option 1"
                multiline={true}
            /><Input
                style={STYLES.input}
                onChangeText={option2 => setOption2(option2)}
                defaultValue={option2}
                placeholder="Enter value for option 2"
                multiline={true}
            /><Input
                style={STYLES.input}
                onChangeText={option3 => setOption3(option3)}
                defaultValue={option3}
                placeholder="Enter value for option 3"
                multiline={true}
            /><Input
                style={STYLES.input}
                onChangeText={option4 => setOption4(option4)}
                defaultValue={option4}
                placeholder="Enter value for option 4"
                multiline={true}

            />
            <Button 
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
                style={{paddingTop:SIZES.padding}}
                title="Upload images"
                onPress={()=>pickImage()}
                // onPress={()=>choosePic().then(function(){alert("success")})
                // .catch(function(err){alert("fail: ",err)})}
            />
            </Card>
            <Button 
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
                style={{paddingTop:SIZES.padding}}
                title="Submit"
                onPress={()=>insertQuiz(
                                question,
                                difficulty,
                                answer,
                                [option1,option2,option3,option4],
                                username,
                                role
                            )}
            /> 

            <Overlay isVisible={isLoading}>
                <View style={{height:100, width:250, margin:10}}>
                    <Text style={{padding:10, alignSelf:"center", paddingBottom:10, fontSize:16}}>Loading...</Text>
                    <LinearProgress color={COLORS.primary}/>
                </View>
            </Overlay>

        </ScrollView>

    );
}

