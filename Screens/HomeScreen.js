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
import {requestSubmitScreen} from './RequestSubmitScreen';
import {QuizScreen} from './QuizScreen';
// import {AccountScreen} from './AccountScreen';

import { createStackNavigator } from '@react-navigation/stack';

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

function homeWelcomeHeader({navigation}){
  return(
    <View>
      <Text style={styles.Text}>Welcome User !</Text>
      <Text style={styles.Text}>Remember practice makes perfect!</Text>
      <Card>
        <Card.Title> Today's Knowledge</Card.Title>
        <Card.Divider />
        <Text style={styles.Title}>--Knowledge title--</Text>
        <Text style={styles.Text}>--Knowledge Content--</Text>
        <Button title='View Details' 
                buttonStyle={{
                  backgroundColor: '#61696f',
                  borderWidth: 2,
                  borderColor: '#61696f',
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
              onPress={()=>navigation.navigate("Quiz")}></Button>
      <FAB
          visible={true}
          onPress={() =>navigation.navigate("RequestSubmit")}
          placement="right"
          icon={{ name: 'add', color: 'white' }}
          color="#d9cc35"
        />
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
      <Stack.Screen name="RequestSubmit" component={requestSubmitScreen} optios={{title:"Request Form"}}/>

    </Stack.Navigator>
  );
}
export default HomeScreen;
