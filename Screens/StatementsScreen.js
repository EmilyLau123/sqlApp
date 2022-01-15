import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import { ListItem, Text,  Button, SearchBar } from 'react-native-elements';
import { ScrollView, FlatList, Platform, StyleSheet, TouchableOpacity, SafeAreaView, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen.js';
import StatementDetailScreen from './StatementDetailScreen.js';





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
// const getResultFromApiAsync = async () => {
//   try {
//     const response = await fetch(
//       // 'https://mufyptest.herokuapp.com/statements/'
//       'http://localhost:8099/api/retrieveStatements/'
//     );
//     return response.json();
//   } catch (error) {
//     console.error(error);
//   }
// };

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
const Item = ({ item }) => (
  <View>
  <ListItem>
      <ListItem.Content>
      <TouchableOpacity onPress={() => navigation.navigate("StatementDetail",{
              title:"titlee",
              description:"description"
            })}><Text>{item.title}</Text></TouchableOpacity>
      </ListItem.Content>
  </ListItem>
  </View>
   );
// async function StatementsSectionList({navigation}){
  function StatementsFlatList({navigation}){
    const renderItems = ({ item }) => (
  //     <ListItem>
  //     <ListItem.Content>
  //     <TouchableOpacity onPress={() => navigation.navigate("StatementDetail",{
  //             title:"titlee",
  //             description:"description"
  //           })}><Text>{item.title}</Text></TouchableOpacity>
  //     </ListItem.Content>
  // </ListItem>
 <Text>dsa</Text>
    );
  // const [data, setData] = useState([]);
  
  // var dataSource= getResultFromApiAsync();
  //var data = await getResultFromApiAsync();
  // var s = dataSource.then(function(item){
  //   var data = item;
  //   return data
  //   }
  // ).catch((error)=>{
  //   console.log(error);
  // }).finally(() => {
  //   console.log("done");
  // });

  //setDateSource(getResultFromApiAsync());
  // console.log("dateSource",dateSource.then(data => {
  // 	console.log(data)}
  // ));
  
  var data=[{"category": "SELECT",title: "Select","description": "Select .. from table_name"},
                          {"category": "JOIN", title: "Join","description": "Join table_name"},
                          {"category": "DELETE", title: "Delete","description": "Delete table_name"}
                  ];
    
    //loop json
   // var retrievedArray = [];
    //var retrievedJson = JSON.stringify(dateSource.assign({}, retrievedArray))
    //console.log("retrievedJson",retrievedJson);

    // var sectionArr=[];
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
    console.log('data',data);

    return(
        <FlatList
        data={data}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => navigation.navigate("StatementDetail",{
          title:"titlee",
          description:"description"
        })}>
        <Text>{item.name}</Text>
        </TouchableOpacity>}
        keyExtractor={item => item.title}
        style={{zindex:1}}
      /> 
        
      
  )

}

const Stack = createStackNavigator();

const StatementsScreen = ({navigation}) => {
  const [search, setSearch] = useState("");
    return (
        <ScrollView >
          <SearchBar 
            clearIcon={true}
            placeholder="Type Here..."
            // onChangeText={(value)=>setSearch({value})}
            // value={search}
          />
        <Stack.Navigator>
              <Stack.Screen name="StatementsList" component={StatementsFlatList} optios={{title:"Statements List"}}/>
              <Stack.Screen name="StatementDetail" component={StatementDetailScreen} optios={{title:"Statements Detail"}}/>
            </Stack.Navigator>
      </ScrollView>
      
    );
}

export default StatementsScreen;

