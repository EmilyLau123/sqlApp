import React, { Component, useState } from 'react';
import {
  Card,
    Text,
    Image
    } from 'react-native-elements';
import { SafeAreaView, ActivityIndicator, } from 'react-native';
    //import{Stacks} from './SqlSectionList';
import { createStackNavigator } from '@react-navigation/stack';
import { SIZES,COLORS } from '../components/style/theme';
import ImgToBase64 from 'react-native-image-base64';

const DetailStack = createStackNavigator();

const StatementDetailScreen = ({route}) => {  
  const { title, description, images } = route.params;
  // const [pic, setPic] = useState("");
  // console.log(images);
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
//  ImgToBase64.getBase64String('file:///Users/emilylau/Library/Developer/CoreSimulator/Devices/48A3C137-CB08-4F60-A9DB-ACC122C04EB9/data/Containers/Data/Application/AE41CFA0-5E22-4EA3-8BA1-F2D82399FE0F/Library/Caches/ExponentExperienceData/%2540anonymous%252FsqlApp-5983158c-a27e-43e6-a52c-78faec2afa68/ImagePicker/04BF3938-0492-4D2F-9F7A-F3CD4C37FAB9.jpg')
//  .then(base64String => setPic(base64String))
//  .catch(err => console.log(err));
 
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