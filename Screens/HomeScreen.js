import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    SectionList
    } from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {StatementDetailScreen} from './StatementDetailScreen';
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

function homeWelcomeHeader(){
  return(
    <View>
      <Text>Welcome User !</Text>
      <Text>Remember practice makes perfect!</Text>
    </View>
    
  )
}

function DailyKnowledge(){
  return(
    <View>
      <Text>
        Welcome User !
        </Text>
          <Text>
        Remember practice makes perfect!
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
      <Stack.Screen name="DailyKnowledge" component={DailyKnowledge} optios={{title:"Daily Knowledge"}}/>
    </Stack.Navigator>
  );
}
export default HomeScreen;
