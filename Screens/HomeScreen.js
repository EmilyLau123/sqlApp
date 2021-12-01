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
import {StatementsScreen} from './StatementsScreen.js';
import {StatementDetailScreen} from './StatementDetailScreen';
import {AccountScreen} from './AccountScreen';

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


 export default function HomeScreen(){
  return (
    <NavigationContainer

          screenOptions={({route}) => ({
        //   tabBarIcon: ({foused, color, size}) => {
        //     let iconName;

        //     if(route.name==='Home'){
        //       iconName = './assets/home.png';
        //     }
        //     if(route.name==='Statements'){
        //       iconName = './assets/statement.png';
        //     }
        //     if(route.name==='Account'){
        //       iconName = './assets/account.png';
        //      }
          
        //   return <Image 
        //             source={require('./assets/account.png')}/>;
        // },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Navigator>
      
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Statements" component={StatementsScreen}/>
        <Tab.Screen name="Account" component={AccountScreen}/>
        <Tab.Screen name="StatementDetail" component={StatementDetailScreen}/>
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}
