import React, { Component } from 'react';
import {
    Text,
    Image,
    Button,
    Alert,
    Card,
    FAB 
    } from 'react-native-elements';
import { SectionList,View, StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {QuizScreen} from './QuizScreen';
// import {AccountScreen} from './AccountScreen';

import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  Text: {
   flex: 1,
   paddingTop: 0
  },
  sectionHeader: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
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
        <Button title='View Details' onPress={()=>alert("Jump to the statement's detail page")}></Button>
      </Card>
      <Button title='Quiz' onPress={()=>navigation.navigate("Quiz")}></Button>
      <FAB
          visible={true}
          onPress={() => alert("Request form")}
          placement="right"
          icon={{ name: 'add', color: 'white' }}
          color="#5facdd"
        />
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
