import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState,useEffect} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator, Model} from 'react-native';
import { Text, Button, Input,ButtonGroup, Card, Image, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {COLORS, SIZES, ICONS, STRINGS, STYLES} from '../../components/style/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

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
    const [images, setImages] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

  const toggleOverlay =() => {
        setIsLoading(!isLoading);
    };

    function refresh(){
        setDes("");
        setTitle("");
        setImages([]);
    }

    const insertStatement = async (title, description,images) => {
        // console.log(question, difficulty, answer, options, author);
        //https://reactnative.dev/movies.json
        //localhost:8099/api/retrieveStatements/
        //https://mufyptest.herokuapp.com/
        const API_URL = 'https://mufyptest.herokuapp.com/api/statement/insert/';
    
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
                images: images
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
const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    // console.log(result);
    if (!result.cancelled) {
        var base64 = 'data:image/jpg;base64,' + result.base64;
        images.push(base64);
        setImages(images);
        console.log(images);
    }
  };
//NOT WORKING
//  const choosePic = async ()=>{
      
//      try{
//         const result = await launchImageLibrary();

        // launchImageLibrary({mediaType:'photo'},(response=>{
        //     alert(response);

        // })).then(
        //     alert('dsa')
        // ).catch(
        //     console.log('error')
        // ).finally(
        //     console.log("done")
        // );
        //     alert(result);
    //  }catch(error){
    //      alert("err: ",error);
    //      console.log(error);
    //  }
    
    // result.then(function(item){
    //     console.log(item);
    // }).catch(function(error){
    //     alert("choosePic Error:",error)
    // });

//}

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
            <Text>
            {images.forEach(image => {
          <Image  source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                PlaceholderContent={<ActivityIndicator />}>
          </Image>
        })}
            </Text>
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
                onPress={()=>pickImage()}
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
                onPress={()=>insertStatement(title, des, images)}
            /> 
        </ScrollView>

    );
}

