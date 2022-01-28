import React, { Component } from 'react';
import {
    Text,
    Image,
    Button,
    Alert,
    Card,
    FAB 
    } from 'react-native-elements';

import { SectionList,ScrollView, StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {requestSubmitScreen} from './form/RequestSubmitScreen';
import {Quiz, quizChooseScreen, congratScreen} from './QuizScreen';
// import {AccountScreen} from './AccountScreen';
import {SIZES, COLORS, USER_ROLE} from '../components/style/theme';
import { createStackNavigator } from '@react-navigation/stack';
//auth
import { Provider, useSelector } from 'react-redux';


const styles = StyleSheet.create({
  Text: {
   padding:5
  },
  Title:{
    fontWeight:'bold',
    fontSize:16,
    padding:10
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

function useUsername() {
  const { role,nickname } = useSelector(state => ({
    ...state.role,
    ...state.nickname
  }));
  return { role,nickname };
}

function homeWelcomeHeader({route,navigation}){
  const nickname = useSelector(state => state.nicknameReducer.nickname);
  const role = useSelector(state => state.roleReducer.role);
  const user_id = useSelector(state => state.userIdReducer.user_id);


  // const { role,nickname } = useUsername();

  // if(route.params != null){
  //     username = route.params;
  // }
  return(
    <SafeAreaView style={{flex:1}}>
          {/* <ImageBackground source={{uri: "https://reactjs.org/logo-og.png"}} resizeMode="cover" style={styles.image}> */}

      
      <ScrollView style={{backgroundColor:COLORS.background}}>
        <Card borderRadius={SIZES.round}>
        <Card.Title> Welcome</Card.Title>
          <Card.Divider />
          <Text size={SIZES.text} style={{padding:SIZES.text}}>Hi {nickname} , {role}, {user_id}!</Text>
          <Text size={SIZES.text} style={{padding:SIZES.text}}>Remember practice makes perfect!</Text>
        </Card>
        <Card borderRadius={SIZES.round}>
          <Card.Title> Today's Knowledge</Card.Title>
          <Card.Divider />
          <Text size={SIZES.title} style={{padding:SIZES.text}}>--Knowledge title--</Text>
          <Text size={SIZES.text} style={{padding:SIZES.text}}>--Knowledge Content--</Text>
          <Button title='View Details' 
                  buttonStyle={{
                    backgroundColor: COLORS.primary,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={()=>alert("Jump to the statement's detail page")}></Button>
        </Card>
        <Button title='Quiz' 
                buttonStyle={{
                  backgroundColor: '#77afac',
                  borderWidth: 2,
                  borderColor: '#77afac',
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 'auto',
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>navigation.navigate("Choose")}></Button>
        
      </ScrollView>
      {role==USER_ROLE.admin||role==USER_ROLE.teacher?(
          <FAB
            visible={true}
            onPress={() =>navigation.navigate("RequestSubmit")}
            placement="right"
            icon={{ name: 'add', color: 'white' }}
            color="#d9cc35"
          />
      ):(
        <View></View>
      )}
        
        {/* </ImageBackground> */}
    </SafeAreaView>

  )
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen=()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={homeWelcomeHeader} options={{title:"Home"}}/>
      <Stack.Screen name="Choose" component={quizChooseScreen} options={{title:"Choose a difficulty"}}/>
        <Stack.Screen name="Quiz" component={Quiz} options={{title:"Quiz",headerShown: false}}/>
        <Stack.Screen name="Congrats" component={congratScreen} options={{title:"congrats", headerShown: false}}/>
      <Stack.Screen name="RequestSubmit" component={requestSubmitScreen} options={{title:"Request Form"}}/>

    </Stack.Navigator>
  );
}
export default HomeScreen;
