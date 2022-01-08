import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    SectionList,
    Button,
    Alert
    } from 'react-native';
import { Card } from 'react-native-elements';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {QuizScreen} from './QuizScreen';
// import {AccountScreen} from './AccountScreen';

import { createStackNavigator } from '@react-navigation/stack';



// class HomeScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return(
//       <View>
//         <Text>Home</Text>
//       </View>
//     );
//   }
// }

// class AccountScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return(
//       <View>
//         <Text>Account</Text>
//       </View>
//     );
//   }
// }

function homeWelcomeHeader({navigation}){
  return(
    <View>
      <Text>Welcome User !</Text>
      <Text>Remember practice makes perfect!</Text>
      <Card>
        <Card.Title>Today's Knowledge</Card.Title>
        <Card.Divider />
        <Text>--Knowledge title--</Text>
        <Text>--Knowledge Content--</Text>
        <Button title='View Details' onPress={()=>Alert.alert("Jump to the statement's detail page")}></Button>
      </Card>
      <Button title='Quiz' onPress={()=>navigation.navigate("Quiz")}></Button>
    </View>
    
  )
}

function DailyKnowledge({navigation}){
  return(
    <View>
      <Text>
        knowledge
      </Text>
    </View>
    
  )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen=()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={homeWelcomeHeader} optios={{title:"Home"}}/>
      <Stack.Screen name="Quiz" component={QuizScreen} optios={{title:"Quiz"}}/>

    </Stack.Navigator>
  );
}
export default HomeScreen;
