import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { Text, Button, Input,ButtonGroup, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {COLORS, SIZES, ICONS, STRINGS, STYLES} from '../../components/style/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import customButton from '../components/customButton.js';

const styles = StyleSheet.create({
    header:{
        color:"black", 
        fontSize:16, 
        alignSelf:"center", 
        fontWeight:"bold",
        padding:5
        },
    }
);


export function statementSubmitScreen({navigation}){
   
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
   

    function refresh(){
        setDes("");
        setTitle("");

    }
    

    const insertStatement = async (title, description) => {
        // console.log(question, difficulty, answer, options, author);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        const API_URL = 'http://localhost:8099/api/statement/insert/';
    
        try {
         const response = await fetch(API_URL,{
             method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                title: title,
                description: description,
                // images: images
            }),
            
         });
         const json = await response.json();
         if(response.status == 200){
            console.log("json",json);
            Alert.alert("Success","Submit success",
            [
                {
                  text: "Back to home",
                  onPress: () => navigation.navigate("Home",{
                      role:1,
                      status:true,
                  }),
                  style: "close",
                },
                {
                    text: "Continue Adding",
                    onPress: () => refresh(),
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
//to upload image NOT DONE
 const choosePic= async()=>{
     const [response, setResponse] = useState(null);
     try{

        const result = await launchImageLibrary({mediaType:'photo'},((response) =>{
            alert(response);

        }));
            alert(result);
     }catch(error){
         alert("err: ",error);
     }
    
    // result.then(function(item){
    //     console.log(item);
    // }).catch(function(error){
    //     alert("choosePic Error:",error)
    // });

}

    return(
        <ScrollView style={{backgroundColor:COLORS.background}}>
            <Card borderRadius={SIZES.round}>
                <Text style={styles.header}>Submit a statement's detail</Text>
            
            </Card>
            <Card borderRadius={SIZES.round}>
            
            <Text>Title</Text><Input
                style={STYLES.input}
                onChangeText={title => setTitle(title)}
                defaultValue={title}
                placeholder="Enter statement name"
                multiline={true}
            />
           
            <Text>Description</Text><Input
                style={STYLES.input}
                onChangeText={des => setDes(des)}
                defaultValue={des}
                placeholder="Enter statement details"
                multiline={true}
            />
            <Button 
                buttonStyle={{
                    backgroundColor: '#77afac',
                    borderWidth: 2,
                    borderColor: '#77afac',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                style={{paddingTop:SIZES.padding}}
                title="Upload images"
                onPress={()=>choosePic()}
                // onPress={()=>choosePic().then(function(){alert("success")})
                // .catch(function(err){alert("fail: ",err)})}
            />
            </Card>
            <Button 
                buttonStyle={{
                    backgroundColor: '#77afac',
                    borderWidth: 2,
                    borderColor: '#77afac',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
                style={{paddingTop:SIZES.padding}}
                title="Submit"
                onPress={()=>insertStatement(title, des)}
            /> 
        </ScrollView>

    );
}

