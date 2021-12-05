import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component} from 'react';
import { SectionList, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen.js';
import StatementDetailScreen from './StatementDetailScreen.js';





const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
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

function StatementsSectionList({navigation}){
  var dateSource=[{"category": "SELECT","name": "Select","description": "Select .. from table_name",},
                          {"category": "JOIN", "name": "Join","description": "Join table_name",},
                          {"category": "DELETE", "name": "Delete","description": "Delete table_name",},];

    //loop json
    const retrievedJson = dateSource;
    var sectionArr=[];
    //push correct datasource object into correct object in sectionArr
    //correct means dataSource.category === sectionArr.title
    retrievedJson.forEach(jsonElement => {
      const indexOfTitle = sectionArr.findIndex(element=>element.title === jsonElement.category);//jsonElement.category
      if(indexOfTitle == -1){//if can't find then create a section
        var newSection={'title':jsonElement.category, data:[jsonElement]};
        sectionArr.push(newSection);
      }else{
          var sectionData = sectionArr[indexOfTitle];
          sectionData.data.push(jsonElement.name);
      }
    })
      return(
        <SectionList
                sections={sectionArr}
                //renderItem={({item}) => <Button style={styles.listItem} onPress={()=>console.log('asfdgfg')}>{item}</Button>}
                renderItem={({item}) => 
                <TouchableOpacity onPress={() => navigation.navigate("StatementDetail",{
                  title:{item},
                  description:{item}
                })}>
                <Text >{item}</Text>
                </TouchableOpacity>
                                  }
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
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

