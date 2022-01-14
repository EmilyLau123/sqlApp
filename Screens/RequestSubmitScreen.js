import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

export function requestSubmitScreen(){
    return(
        <View>
            <Text>Submit a quiz</Text>
            <Text>A quiz should have 10 questions, you may upload 1-5 pictures for one question, answer should be provided in MC format</Text>
            
        </View>

    );
}

