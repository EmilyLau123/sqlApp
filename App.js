import React, { Component } from 'react';
import {
    Text,
    Image,
    SectionList
    } from 'react-native-elements';
import { View } from 'react-native';
import {COLORS,SIZES} from './components/style/theme';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatementsScreen from './screens/StatementsScreen.js';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';

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

const App=()=>{
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home" ///the name of the initial screen

        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Statements') {
              iconName = focused ? 'book' : 'book-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        tabBarActiveTintColor: COLORS.background,
        tabBarInactiveTintColor: COLORS.black,
        headerShown: false,
        tabBarStyle: { height: SIZES.tabBarheight }
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Statements" component={StatementsScreen}/>
        <Tab.Screen name="Account" component={AccountScreen}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
