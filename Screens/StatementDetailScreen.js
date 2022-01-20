import React, { Component } from 'react';
import {
    Text
    } from 'react-native-elements';
import { SafeAreaView} from 'react-native';
    //import{Stacks} from './SqlSectionList';
import { createStackNavigator } from '@react-navigation/stack';


const DetailStack = createStackNavigator();

const StatementDetailScreen = ({route}) => {  
  const { title, description, category } = route.params;
  // const [description, setDes] = useState("");
  // const [title, setTitle] = useState("");

//     this.state = {
//               dateSource:[{"category": "SELECT","name": "Select","description": "Select .. from table_name",},
//                           {"category": "JOIN", "name": "Join","description": "Join table_name",},
//                           {"category": "DELETE", "name": "Delete","description": "Delete table_name",},]
//   }
// }

  //const car = this.props.navigation.getParam("name", "novalue");
 //const car = this.props.navigation.getParam("name", "novalue)
   return (
    <SafeAreaView>
      <Text>title: {title}</Text>
      <Text>category: {category}</Text>
      <Text>description: {description}</Text>
    </SafeAreaView>
      );
 
}
export default StatementDetailScreen;