//import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    SectionList,
    Button
    } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const QuizStack = createStackNavigator();

export function QuizScreen({navigation}){
    return (
      <QuizStack.Navigator>
        <QuizStack.Screen name="Easy" component={homeWelcomeHeader} optios={{title:"Home"}}/>
        <QuizStack.Screen name="Medium" component={DailyKnowledge} optios={{title:"Daily Knowledge"}}/>
        <QuizStack.Screen name="Hard" component={Quiz} optios={{title:"Quiz"}}/>
  
      </QuizStack.Navigator>
    );
}