import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component} from 'react';
import { ListItem, Text,  Button } from 'react-native-elements';
import { View, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen.js';
import StatementDetailScreen from './StatementDetailScreen.js';
import axios from 'axios';





const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0
  },
  sectionHeader: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
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

//http://220.246.129.225:19006/Statements';

// const getResultFromApi = async() => {
//   // const API_URL = Platform.OS === 'ios' ? 'http://localhost:19006/Statements' : 'http://220.246.129.225:19006/Statements';
//   const API_URL = 'http://localhost:19009/statements';

//   try{
//     const res = await axios.get(API_URL);
//     console.log(res.data);
  
//   }catch(error){
//     console.log(error.message);
//   }
// }
const getResultFromApiAsync = async () => {
  try {
    const response = await fetch(
      'http://localhost:19009/statements'
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

// const getResultFromApi = () => {
//   //fatch api
//   console.log("fetching.."+API_URL);//https://reqres.in/api/products/3
//   return fetch(API_URL,{
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json'
//     }
//   })//
//           .then((response) => response.json())
//           .then((json) => {
//     return json;
//   })
//     .catch((error) => {
//     console.error("error:"+error);
//   });
// }

function StatementsSectionList({navigation}){
  //const [dateSource, setDateSource] = useState([]);
  const renderItem = ({ item }) => (
                
      <ListItem>
          <ListItem.Content>
          <ListItem.Title>
          <TouchableOpacity onPress={() => navigation.navigate("StatementDetail",{
                  title:"titlee",
                  description:"description"
                })}><Text>{item}</Text></TouchableOpacity>
                </ListItem.Title>
          </ListItem.Content>
      </ListItem>
      );
  var dateSource= getResultFromApiAsync();
  console.log(dateSource);
  //setDateSource(getResultFromApiAsync());
  // console.log("dateSource",dateSource.then(data => {
  // 	console.log(data)}
  // ));
  
  // var dateSource=[{"category": "SELECT","name": "Select","description": "Select .. from table_name",},
  //                         {"category": "JOIN", "name": "Join","description": "Join table_name",},
  //                         {"category": "DELETE", "name": "Delete","description": "Delete table_name",},
  //                 ];
    
    //loop json
   // var retrievedArray = [];
    //var retrievedJson = JSON.stringify(dateSource.assign({}, retrievedArray))
    //console.log("retrievedJson",retrievedJson);

    var sectionArr=[];
    //push correct datasource object into correct object in sectionArr
    //correct means dataSource.category === sectionArr.title
    // retrievedJson.forEach(jsonElement => {
    //   const indexOfTitle = sectionArr.findIndex(element=>element.title === jsonElement.category);//jsonElement.category
    //   if(indexOfTitle == -1){//if can't find then create a section
    //     var newSection={'title':jsonElement.category, data:[jsonElement]};
    //     sectionArr.push(newSection);
    //   }else{
    //       var sectionData = sectionArr[indexOfTitle];
    //       sectionData.data.push(jsonElement);
    //   }
    // })
    // const setData = (title,des) => {
    //   this.state.description = "des";
    // }
      return(
        <FlatList
          data={dateSource}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> 
    )

}

const Stack = createStackNavigator();

const StatementsScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
        <Stack.Navigator>
              <Stack.Screen name="StatementsList" component={StatementsSectionList} optios={{title:"Statements List"}}/>
              <Stack.Screen name="StatementDetail" component={StatementDetailScreen} optios={{title:"Statements Detail"}}/>
            </Stack.Navigator>
      </View>
    );
}

export default StatementsScreen;

