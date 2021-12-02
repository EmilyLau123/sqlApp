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
import StatementsScreen from './StatementsScreen.js';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const HomeScreen=()=>{
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
export default HomeScreen;
