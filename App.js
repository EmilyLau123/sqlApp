import React, { Component } from 'react';
import {
    Text,
    Image,
    SectionList
    } from 'react-native-elements';
import { View } from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatementsScreen from './screens/StatementsScreen.js';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import SignInScreen from './screens/SignInScreen';

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

function MyTab(){
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Statements" component={StatementsScreen}/>
        <Tab.Screen name="Account" component={AccountScreen}/>

    </Tab.Navigator>
  );
}


const App=()=>{
  return (
    <NavigationContainer
          initialRouteName="Account" ///the name of the initial screen

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
        
      <MyTab/>
      
    </NavigationContainer>
  );
}
export default App;
