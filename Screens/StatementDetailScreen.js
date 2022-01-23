import React, { Component } from 'react';
import {
  Card,
    Text,
    Image
    } from 'react-native-elements';
import { SafeAreaView, ActivityIndicator} from 'react-native';
    //import{Stacks} from './SqlSectionList';
import { createStackNavigator } from '@react-navigation/stack';
import { SIZES,COLORS } from '../components/style/theme';

const DetailStack = createStackNavigator();

const StatementDetailScreen = ({route}) => {  
  const { title, description, images } = route.params;
  console.log(images);
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
    <SafeAreaView style={{height:SIZES.height, backgroundColor:COLORS.background}}>
      <Card>
        <Card.Title style={{fontSize:20}}>{title}</Card.Title>
        <Card.Divider></Card.Divider>
        {/* {images.map(image => {
                    console.log('image',image); */}

          <Image  source={{ uri: images[0] }}
                style={{ width: 300, height: 200 }}
                PlaceholderContent={<ActivityIndicator />}>
          </Image>
        {/* })} */}
        
       <Text style={{fontSize:18}}>description: {description}</Text>
      </Card>
    </SafeAreaView>
      );
 
}
export default StatementDetailScreen;