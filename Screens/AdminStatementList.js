import { NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import React, {Component, useState, useEffect} from 'react';
import { ListItem, Text,  Button, SearchBar, Card, Image } from 'react-native-elements';
import { ScrollView, FlatList, Platform, StyleSheet, TouchableOpacity, SafeAreaView, View, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen.js';
import StatementDetailScreen from './StatementDetailScreen.js';
import { COLORS, SIZES, ICONS } from '../components/style/theme.js';
import { statementSubmitScreen } from './Form/StatementCreateForm.js';
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


// async function StatementsSectionList({navigation}){
export function StatementsFullList({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const getStatements = async (searchText) => {
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'http://localhost:8099/api/statements/find/'+searchText;

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
    var statusString = 'Approved';
    var hide = item.hide;
    if(hide == 1){
        statusString = 'Hide';
        iconName = ICONS.rejected;
    }else if(hide == 0){
        statusString = 'Show';
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
        statusString: statusString,
        iconName : iconName,
        hide:item.hide

      })}>
        <ListItem>
        <Ionicons name={iconName} size={SIZES.icon} />
        <ListItem.Content>
        <ListItem.Title>{item.title} ({item.author})</ListItem.Title>
        <Text>{item.submitted_at}</Text>
        </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
    
    );
 }

 useEffect(() => {
  getStatements("");
 }, []);

 const searchButton = (searchText) => {
   setSearch(searchText);
   getStatements(searchText);

   console.log(search);
 }


    return(
      //style={{backgroundColor:COLORS.background}}
      <SafeAreaView>
        
        {isLoading?<ActivityIndicator/>:(
          <View>
          <View>
          <SearchBar 
          searchIcon={true}
          clearIcon={true}
          placeholder="Type Here..."
          onChangeText={(value)=>searchButton(value)}
          value={search}
        />
          <FlatList
          data={data}
          renderItem= {renderItem}
          keyExtractor={item => item._id}
          onRefresh={() => getStatements("")}
          refreshing={isLoading}
            height={SIZES.height-250}

          /> 
        
          </View>
          <View>

          
          </View>
          </View>
          )}
      </SafeAreaView>
      
  )
}



export function StatementsFullDetail({route, navigation}){
    const {statement_id,iconName, statusString, title, description, author, submitted_at, updated_at} = route.params;
    
//delete a question
const deleteQuestion = async(question_id) => {
    console.log(question_id);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'http://localhost:8099/api/question/delete/';

    try {
     const response = await fetch(API_URL,{
         method:"POST",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
         body: JSON.stringify({
            question_id: question_id,
            }),
        
     });
     const json = await response.json();
     if(response.status == 200){
        console.log("json",json);
        Alert.alert("Success","Question deleted",
        [
            {
              text: "Close",
              onPress: () => navigation.navigate("RequestList"),
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
                <Text style={{padding:SIZES.padding}}>Status: {statusString} </Text>
                <Text style={{padding:SIZES.padding}}>Author: {author} </Text>
                <Text style={{padding:SIZES.padding}}>Title: {title} </Text>
                <Image  source={{ uri: images[0] }}
                    style={{ width: 300, height: 200 }}
                    PlaceholderContent={<ActivityIndicator />}>
                </Image>
                <Text style={{padding:SIZES.padding}}>Description: {description} </Text>
                <Text style={{padding:SIZES.padding}}>Submitted At: {submitted_at} </Text>
                <Text style={{padding:SIZES.padding}}>Updated At: {updated_at} </Text>
            </Card>
        {/* <Button
            title="Edit"
            onPress={()=>} 
        /> */}
        {statusString == "Approved"?(
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
                onPress={()=>deleteUser(request_id)}
            />
            <Button
                title="Ban"
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
                onPress={()=>changeUserStatus(request_id, USER_STATUS.banned)}
            />
            </View>
        ):(<View></View>)}


        {statusString == "Rejected"?(
            <View>
            <Button
            title="approve"
            buttonStyle={{
                backgroundColor: 'green',
                borderWidth: 2,
                borderColor: 'green',
                borderRadius: 30,
                }}
            containerStyle={{
                width: 'auto',
                marginHorizontal: 50,
                marginVertical: 10,
                }}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={()=>changeUserStatus(request_id, USER_STATUS.approved)}
            />
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
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>deleteUser(request_id)}
            />
            
            </View>
        ):(<View></View>)}

        {statusString == "Waiting"?(
            <View>
            <Button
            title="approve"
            buttonStyle={{
                backgroundColor: 'green',
                borderWidth: 2,
                borderColor: 'green',
                borderRadius: 30,
                opacity:0.8
                }}
            containerStyle={{
                width: 'auto',
                marginHorizontal: 50,
                marginVertical: 10,
                }}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={()=>changeUserStatus(request_id, USER_STATUS.approved)}
            />
            <Button
                title="reject"
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
                onPress={()=>changeUserStatus(request_id, USER_STATUS.rejected)}
            />
            </View>
        ):(<View></View>)}
        
        {statusString == "Banned"?(
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
                onPress={()=>deleteUser(request_id)}
            />
            <Button
                title="Unban"
                buttonStyle={{
                    backgroundColor: 'green',
                    borderWidth: 2,
                    borderColor: 'green',
                    borderRadius: 30,
                    opacity:0.8
                    }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                    }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={()=>changeUserStatus(request_id, USER_STATUS.approved)}
            />
            </View>
        ):(<View></View>)}

        
        </ScrollView>
    </SafeAreaView>
);

}
 

const AdminStatementStack = createStackNavigator();

const StatementsScreen = () => {
    return (
      
        <AdminStatementStack.Navigator>
              {/* <AdminStatementStack.Screen name="StatementsFullList" component={StatementsFullList} options={{title:"Statements List"}}/> */}
              {/* <AdminStatementStack.Screen name="StatementDetail" component={StatementDetailScreen} options={{title:"Statements Detail"}}/> */}
        </AdminStatementStack.Navigator>
      
    );
}

export default StatementsScreen;

