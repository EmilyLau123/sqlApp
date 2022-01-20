import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { Text, Button, Input,ButtonGroup, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {COLORS, SIZES, ICONS, STRINGS, STATUS, STYLES} from '../components/style/theme.js';
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

    const [question, setQuestion] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [option1 , setOption1] = useState("");
    const [option2 , setOption2] = useState("");
    const [option3 , setOption3] = useState("");
    const [option4 , setOption4] = useState("");

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
    

    const insertQuiz = async (question, difficulty, answer, options, author) => {
        console.log(question, difficulty, answer, options, author);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'http://localhost:8099/api/insert/question/';
    
        try {
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
                author: author,
                role: 1 // admin
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
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
         }
       } catch (error) {
         console.error(error);
       } finally {
        // setLoading(false);
        console.log("done");
       }
     }

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
            /><Input
                style={STYLES.input}
                onChangeText={option2 => setOption2(option2)}
                defaultValue={option2}
                placeholder="Enter value for option 2"
            /><Input
                style={STYLES.input}
                onChangeText={option3 => setOption3(option3)}
                defaultValue={option3}
                placeholder="Enter value for option 3"
            /><Input
                style={STYLES.input}
                onChangeText={option4 => setOption4(option4)}
                defaultValue={option4}
                placeholder="Enter value for option 4"

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
                                "Admin"
                            )}
            /> 
        </ScrollView>

    );
}

