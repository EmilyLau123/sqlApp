import React, { Component } from 'react';
import {
    Text,
    Image,
    SectionList
    } from 'react-native-elements';
import { View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import store from './model/store';
import {COLORS,SIZES} from './components/style/theme';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatementsScreen from './screens/StatementsScreen.js';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';

<<<<<<< HEAD

=======
import * as SecureStore from 'expo-secure-store';
>>>>>>> auth


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
<<<<<<< HEAD
// const menuItemData = useSelector(state => state.menuItemData);
=======
const AuthContext = React.createContext();

>>>>>>> auth

const Tab = createBottomTabNavigator();

const App=()=>{

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        
      console.log(username,password, role);
      //https://reactnative.dev/movies.json
      //http://localhost:8099/api/retrieveStatements/
      const API_URL = 'http://localhost:8099/api/user/login/';
  
      try {
       const response = await fetch(API_URL,{
           method:"POST",
              headers: {
                  'Content-Type':'application/json',
                  'Accept':'application/json'
              },
           body: JSON.stringify({
              username: username,
              password: password,
              role: role,
              token:userToken
          }),
          
       });
       const json = await response.json();
       if(response.status == 200){
          console.log("json",json);
          Alert.alert("Success","Sign In success",
          [
              {
                text: "Close",
                onPress: () => navigation.navigate("Home",{
                    role:json[0].role,
                    status:true,
                    nickname:json[0].nickname,
                }),
                style: "close",
              },
            ]
          );
       }
     } catch (error) {
       console.error(error);
     } finally {
      // setLoading(false);
      console.log("done");
     }

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
<<<<<<< HEAD
    <Provider store={store}>
=======
    <AuthContext.Provider value={authContext}>

>>>>>>> auth
    <NavigationContainer>
      {/* {state.userToken == null ? ():()} */}
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
<<<<<<< HEAD
    </Provider>
=======
    </AuthContext.Provider>

>>>>>>> auth
  );
}
export default App;
