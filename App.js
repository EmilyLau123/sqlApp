import React, { Component } from 'react';
import {
    Text,
    View,
    Image
    } from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {details, SqlSectionListCom} from './Screens/SqlSectionList.js';
import {Detail} from './Screens/Detail'



class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return(
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return(
      <View>
        <Text>Account</Text>
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();
function DetailScreen(){
  return (
    <View style={styles.container}>
        <SectionList 
          sections={['sectionArr','s']}
          //renderItem={({item}) => <Button style={styles.listItem} onPress={()=>console.log('asfdgfg')}>{item}</Button>}
          renderItem={({item}) => 
          <Button
          onPress={() =>
            navigate('Detail')
          }
          title="Go to Brent's profile"
        />

                    //<Text onPress={()=>navigate('detailScreen')}>{item}</Text>
                            }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
      );
}

 export default function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator

          screenOptions={({route}) => ({
          tabBarIcon: ({foused, color, size}) => {
            let iconName;

            if(route.name==='Home'){
              iconName = './assets/home.png';
            }
            if(route.name==='Statements'){
              iconName = './assets/statement.png';
            }
            if(route.name==='Account'){
              iconName = './assets/account.png';
             }
          
          return <Image 
                    source={require({iconName})}/>;
        },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
      })}
      >
       
      
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Statements" component={SqlSectionListCom}/>
        <Tab.Screen name="Account" component={AccountScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
