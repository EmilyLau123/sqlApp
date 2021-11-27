import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component} from 'react';
import { SectionList, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Detail} from './Detail.js';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
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

//function to get data from mongodb
function getFromMongo(){

  return;//return json object array
}
//function to get data from mongodb

export class SqlSectionListCom extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
              dateSource:[{"category": "SELECT","name": "Select","description": "Select .. from table_name",},
                          {"category": "JOIN", "name": "Join","description": "Join table_name",},
                          {"category": "DELETE", "name": "Delete","description": "Delete table_name",},]
  }
}
  
  render() {
    const Stack = createStackNavigator();
    //loop json
    const retrievedJson = this.state.dateSource;
    var sectionArr=[{title:'SELECT', data:[]},{title:'JOIN', data:[]}];
    //push correct datasource object into correct object in sectionArr
    //correct means dataSource.category === sectionArr.title
    retrievedJson.forEach(jsonElement => {
      const indexOfTitle = sectionArr.findIndex(element=>element.title === jsonElement.category);//jsonElement.category
      if(indexOfTitle == -1){//if can't find then create a section
        var newSection={'title':jsonElement.category, data:[jsonElement.name]};
        sectionArr.push(newSection);
      }else{
          var sectionData = sectionArr[indexOfTitle];
          sectionData.data.push(jsonElement.name);
      }
          
    });

  
    return (
      <View style={styles.container}>
        <SectionList
          sections={sectionArr}
          //renderItem={({item}) => <Button style={styles.listItem} onPress={()=>console.log('asfdgfg')}>{item}</Button>}
          renderItem={({item}) => 
                              <Stack.Navigator>
                                <Stack.Screen name='detail' component={Detail} />
                              </Stack.Navigator>
                             
                            }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
}
}
