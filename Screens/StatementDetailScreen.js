import React, { Component } from 'react';
import {
    Text
    } from 'react-native-elements';
import { View} from 'react-native';
    //import{Stacks} from './SqlSectionList';
import { createStackNavigator } from '@react-navigation/stack';


const DetailStack = createStackNavigator();

const StatementDetailScreen = ({route}) => {  
  const { title, description } = route.params;
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
    <View>
      <Text>title: {title}</Text>
      <Text>description: {description}</Text>
    </View>
      );
 
}
export default StatementDetailScreen;