import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component, useState, useEffect} from 'react';
import { ListItem, Text,  Button, SearchBar, Card, Image } from 'react-native-elements';
import { ScrollView, FlatList, Alert, StyleSheet, TouchableOpacity, SafeAreaView, View, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../HomeScreen.js';
import StatementDetailScreen from '../StatementDetailScreen.js';
import { COLORS, SIZES, ICONS } from '../../components/style/theme.js';
import { statementSubmitScreen } from './form/RequestSubmitScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';



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
export function StatementsFullList({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getStatements = async (searchText) => {
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'https://mufyptest.herokuapp.com/api/statements/all/find/'+searchText;

    try {
     const response = await fetch(API_URL);
     const json = await response.json();
     console.log(json);
     setData(json);
   } catch (error) {
     console.error(error);
   } finally {
    setLoading(false);
    console.log("done");
   }
}
   const renderItem = ({ item }) => {
    var iconName = ICONS.approved;
    var hide = item.hide;
    if(hide == 1){
        iconName = ICONS.rejected;
    }else if(hide == 0){
        iconName = ICONS.approved;
    }
    
return(
    <TouchableOpacity onPress={()=>navigation.navigate("StatementFullDetail",{
        statement_id:item._id,
        title: item.title,
        description:item.description,
        images:item.images,
        author:item.author,
        submitted_at:item.submitted_at,
        updated_at:item.updated_at,
        iconName : iconName,
        hide:item.hide,
        difficulty:item.difficulty

      })}>
        <ListItem>
        <Ionicons name={iconName} size={SIZES.icon} />
        <ListItem.Content>
        <ListItem.Title>{item.title} ({item.author})</ListItem.Title>
        <Text>Submitted_at: {item.submitted_at}</Text>
        </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
    
    );
 }

 useEffect(() => {
  getStatements("");
 }, []);

 const searchButton = (searchText) => {
    setLoading(true);
   setSearch(searchText);
   getStatements(searchText);
 }


    return(
      <SafeAreaView>
        <SearchBar 
          searchIcon={true}
          clearIcon={true}
          placeholder="Type Here..."
          onChangeText={(value)=>searchButton(value)}
          value={search}
        />
        {isLoading?<ActivityIndicator/>:(
        <View>
          <View style={{paddingBottom:SIZES.listPaddingBottom}}>
            <FlatList
            data={data}
            renderItem= {renderItem}
            keyExtractor={item => item._id}
            onRefresh={() => getStatements("")}
            refreshing={isLoading}
              
            /> 
          </View>
        </View>
        )}
      </SafeAreaView>
      
  )
}



export function StatementsFullDetail({route, navigation}){
    const {images,hide,statement_id,iconName, title, description, author, submitted_at, updated_at} = route.params;
    
//delete a question
const deleteStatement = async(statement_id) => {
    console.log(statement_id);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'https://mufyptest.herokuapp.com/api/statement/delete/';

    try {
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            statement_id: statement_id,
            }),
        
     });
     const json = await response.json();
     if(response.status == 200){
        console.log("json",json);
        Alert.alert("Success","Statement deleted",
        [
            {
              text: "Close",
              onPress: () => navigation.navigate("StatementsFullList"),
              style: "close",
            },
          ]
        );
     }
   } catch (error) {
     console.error(error);
   } finally {
    console.log("done");
   }
 }

//approve or reject the question
const changeStatementHide = async(statement_id, status) => {
    const API_URL = 'https://mufyptest.herokuapp.com/api/statement/status/change/';
    console.log(statement_id);
    try {
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            statement_id: statement_id,
            hide: status,
            // updated_at: Danow(),
        }),
        
     });
     const json = await response.json();
     if(response.status == 200){
        console.log("json",json);
        Alert.alert("Success","statement updated",
        [
            {
              text: "Close",
              onPress: () => navigation.navigate("StatementsFullList"),
              style: "close",
            },
          ]
        );
     }
   } catch (error) {
     console.error(error);
   } finally {
    // setLoading(false);
    console.log("done");
   }
 }

 return(
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
        <ScrollView>
            <Card borderRadius={SIZES.round}>
                <Ionicons name={iconName} size={SIZES.icon} />
                <Text style={{padding:SIZES.padding}}>Status: {hide==1?("Hidden"):("Showing")} </Text>
                <Text style={{padding:SIZES.padding}}>Author: {author} </Text>
                <Text style={{padding:SIZES.padding}}>Title: {title} </Text>
                {images[0]?(
                    <Image  source={{ uri: images[0] }}
                    style={{ width: 300, height: 200 }}
                    PlaceholderContent={<ActivityIndicator />}>
                </Image>
                ):(<View></View>)}
                
                <Text style={{padding:SIZES.padding}}>Description: {description} </Text>
                <Text style={{padding:SIZES.padding}}>Submitted At: {submitted_at} </Text>
                <Text style={{padding:SIZES.padding}}>Updated At: {updated_at} </Text>
            </Card>
     
        {hide == 1?(
            <View>
                <Button
                    title="Delete"
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 30,
                        opacity:0.8
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={()=>deleteStatement(statement_id)}
                />
                <Button
                    title="Show"
                    buttonStyle={{
                        backgroundColor: COLORS.black,
                        borderWidth: 2,
                        borderColor: COLORS.black,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    onPress={()=>changeStatementHide(statement_id, 0)}
                />
            </View>
        ):(<View>
            <Button
                title="Delete"
                buttonStyle={{
                    backgroundColor: 'red',
                    borderWidth: 2,
                    borderColor: 'red',
                    borderRadius: 30,
                    opacity:0.8
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>deleteStatement(statement_id)}
            />
            <Button
                title="Hide"
                buttonStyle={{
                    backgroundColor: COLORS.black,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    borderRadius: 30,
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                onPress={()=>changeStatementHide(statement_id, 1)}
            />
        </View>)}
        </ScrollView>
    </SafeAreaView>
);

}
