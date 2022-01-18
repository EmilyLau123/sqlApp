import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Button, Input,ButtonGroup } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {COLORS, SIZES, ICONS, STRINGS, STATUS, STYLES} from '../components/style/theme.js';

function submitRequest(question, difficulty, answer, options, author){
    alert(options[0]);
}

export function requestSubmitScreen(){
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexAnswer, setSelectedIndexAnswer] = useState(0);

    const [question, setQuestion] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [answer, setAnswer] = useState();
    const [option1 , setOption1] = useState("");
    const [option2 , setOption2] = useState("");
    const [option3 , setOption3] = useState("");
    const [option4 , setOption4] = useState("");


    return(
        <View>
            <Text>Submit a quiz question</Text>
            <Text>You may upload 1-5 pictures for one question, answer should be provided in MC format</Text>
            <Divider></Divider>
            <Text>Question *</Text><Input
                style={STYLES.input}
                onChangeText={question => setQuestion(question)}
                defaultValue={question}
            />
            <Text>Difficulty *</Text>
            <ButtonGroup
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
                buttons={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
                selectedIndex={selectedIndexAnswer}
                onPress={(value) => {
                    setSelectedIndexAnswer(value);
                    setAnswer(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />
            <Text>Options *</Text><Input
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

            <Button 
                title="Submit"
                onPress={()=>submitRequest(
                                question,
                                difficulty,
                                answer,
                                [option1,option2,option3,option4],
                                "Admin")}
            />

        </View>

    );
}

