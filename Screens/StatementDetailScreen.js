import React, { Component } from 'react';
import {
    Text,
    View,
    } from 'react-native';
//import{Stacks} from './SqlSectionList';



export class Detail extends Component {
  
  constructor(props) {
    super(props);
    this.navigateToDetail=this.navigateToDetail.bind(this);
  }
  
//     this.state = {
//               dateSource:[{"category": "SELECT","name": "Select","description": "Select .. from table_name",},
//                           {"category": "JOIN", "name": "Join","description": "Join table_name",},
//                           {"category": "DELETE", "name": "Delete","description": "Delete table_name",},]
//   }
// }
  
render() {
  //const car = this.props.navigation.getParam("name", "novalue");
 //const car = this.props.navigation.getParam("name", "novalue)
   return <Text>car</Text>
 }
}