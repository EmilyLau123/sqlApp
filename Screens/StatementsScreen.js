import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component, useState, useEffect, useContext, useRef} from 'react';
import { ListItem, Text,  Button, SearchBar, FAB } from 'react-native-elements';
import { ScrollView, FlatList, Platform, StyleSheet, TouchableOpacity, SafeAreaView, View, ActivityIndicator } from 'react-native';
import {USER_ROLE} from '../components/style/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen.js';
import StatementDetailScreen from './StatementDetailScreen.js';
import { COLORS, SIZES } from '.././components/style/theme.js';
import { statementSubmitScreen } from './form/StatementCreateForm.js';
//auth
import { Provider, useSelector } from 'react-redux';

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
// async function StatementsSectionList({navigation}){
 function StatementsFlatList({navigation}){
  const role = useSelector(state => state.roleReducer.role);
    const renderItems = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate("StatementDetail",{
        title:item.title,
        description:item.description,
        images:item.images,

      })}>
        <ListItem>
          <ListItem.Content>
          <Text>{item.title}</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  // const [data, setData] = useState([]);
  
  // var dataSource= getResultFromApiAsync();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getStatements = async (searchText) => {
      
    const API_URL = 'https://mufyptest.herokuapp.com/api/statements/find/'+searchText;

    try {
     const response = await fetch(API_URL);
     const json = await response.json();
    //  console.log(json);
     setData(json);
   } catch (error) {
     console.error(error);
   } finally {
    setLoading(false);
    console.log("done");
   }
 }

 useEffect(() => {
  getStatements("");
 }, []);

 const searchButton = (searchText) => {
   setSearch(searchText);
   getStatements(searchText);

 }

 
    return(
      <SafeAreaView>
        {isLoading?<ActivityIndicator/>:(
          <View>
          <SearchBar 
          searchIcon={true}
          clearIcon={true}
          placeholder="Type Here..."
          onChangeText={(value)=>searchButton(value)}
          value={search}
        />
          <FlatList
            style={{height:SIZES.height - SIZES.tabBarheight-180}}
            data={data}
            renderItem= {renderItems}
            keyExtractor={item => item._id}
            onRefresh={() => getStatements("")}
            refreshing={isLoading}

          />
        </View>
          )} 
          {role==USER_ROLE.admin?(
          <FAB
                visible={true}
                onPress={() =>navigation.navigate("StatementSubmit")}
                placement="right"
                icon={{ name: 'add', color: 'white' }}
                color={COLORS.attention}
                style={{zIndex:2, position:"absolute"}}
                />
            ):(
              <View></View>
            )}
      </SafeAreaView>
  )
}

const Stack = createStackNavigator();

const StatementsScreen = () => {
    return (
      
        <Stack.Navigator>
              <Stack.Screen name="StatementsList" component={StatementsFlatList} options={{title:"Statements List"}}/>
              <Stack.Screen name="StatementDetail" component={StatementDetailScreen} options={{title:"Statements Detail"}}/>
              <Stack.Screen name="StatementSubmit" component={statementSubmitScreen} options={{title:"Statements Submit"}}/> 
        </Stack.Navigator>
      
    );
}

export default StatementsScreen;

