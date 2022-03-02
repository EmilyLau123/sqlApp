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
//       'https://mufyptest.herokuapp.com/api/retrieveStatements/'
//     );
//     return response.json();
//   } catch (error) {
//     console.error(error);
//   }
// };


// async function StatementsSectionList({navigation}){
 function StatementsFlatList({navigation}){
  // const mounted=useRef();
  const role = useSelector(state => state.roleReducer.role);
  // const [expanded, setExpanded] = useState(false);
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
      
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
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

  //  console.log(search);
 }

  // const [fin,setFin] = useState("");
    
  //   var dataa = data.then(success => {
  //     console.log(success);
  //   })
  //   // 失敗的行為一律交給了 catch
  //   .catch(fail => {
  //     console.log(fail);
  //   }).finally(() => {
  //     console.log('done');
  //     return success;

  //   });
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
  
  // var data=[{"category": "SELECT",title: "Select","description": "Select .. from table_name"},
  //                         {"category": "JOIN", title: "Join","description": "Join table_name"},
  //                         {"category": "DELETE", title: "Delete","description": "Delete table_name"}
  //                 ];
    
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
    // console.log('data',data);
    // console.log('fin',myPromise);
  //   checkRoleUtil = { 
  //      role: userRole, 
  //      setRole: setUserRole
  //  }
//   useEffect({
//     getRole()
// },{}
//   )
// useEffect(()=>{
//   if(!mounted.current){//componentDidMount
//     // setPercent(props.value);
//     console.log("init");

//     mounted.current=true;

//     //checkRoleUtil.setRole(checkRoleUtil.role=false);
    
//   }else{
//     console.log("sth changed");
//   }},[role]
// );
    

    return(
      //style={{backgroundColor:COLORS.background}}
      <SafeAreaView>
      {/* <View> */}
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
            // height={SIZES.height-400}

          />
          {/* <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Easy</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          {data.map((item) => (
              <ListItem key={item.id} bottomDivideronPress={() => navigation.navigate("StatementDetail",{
                title:item.title,
                description:item.description,
                images:item.images,
              })}>
                <ListItem.Content>
                <Text style={{paddingLeft:10}}>{item.title}</Text>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
          ))}
        </ListItem.Accordion>

        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Medium</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          {data.map((item) => (
              <ListItem key={item.id} bottomDivideronPress={() => navigation.navigate("StatementDetail",{
                title:item.title,
                description:item.description,
                images:item.images,
              })}>
                <ListItem.Content>
                <Text style={{paddingLeft:10}}>{item.title}</Text>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
          ))}
        </ListItem.Accordion> */}

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

