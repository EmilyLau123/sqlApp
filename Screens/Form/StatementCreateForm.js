import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState,useEffect} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator, Model, KeyboardAvoidingView} from 'react-native';
import { Text, Button, Input,ButtonGroup, Card, Image, Overlay, LinearProgress } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {COLORS, SIZES, ICONS, STRINGS, STYLES} from '../../components/style/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { SliderBox } from "react-native-image-slider-box";
import * as FileSystem from 'expo-file-system'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";

// import {checkSize} from '../SignUpScreen';
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

    const [isLoading,setIsLoading] = useState(false);

    const [images, setImages] = useState([]);
    const [haveImage, setHaveImage] = useState(false);
    const [showImage, setShowImage] = useState(false);
    
    const [currentImage, setCurrentImage] = useState(0);
    const [imageUris, setImageUris] = useState([]);

    const [difficulty, setDifficulty] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const formData = new FormData();

    const toggleOverlay = (status) => {
        setIsLoading(status);
    };

    function refresh(){
        setDes("");
        setTitle("");
        setImages([]);
        setHaveImage(false);
        setShowImage(false);
        setCurrentImage(0);
        setImageUris([]);
    }

    

const insertStatement = async (title, description,images) => {
        console.log(title, description,images);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        //https://mufyptest.herokuapp.com/api/question/insert/
        const API_URL = 'https://mufyptest.herokuapp.com/api/statement/insert/';
    
        try {
            toggleOverlay(true);
            const response = await fetch(API_URL,{
             method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
             body: JSON.stringify({
                title: title,
                description: description,
                difficulty: difficulty,
            }),
         });
        const json = await response.json();
        console.log('JSON: ',json);
        const statement_id = json._id;
        if(haveImage){
        for(let i = 0; i<images.length;i++){
            formData.append(i, images[i]);
            console.log(formData);
        }}
        //upload img
        const IMAGES_API_URL = 'https://mufyptest.herokuapp.com/api/statement/images/insert/'+statement_id;
            const imageResponse = await fetch(IMAGES_API_URL,{
             method:"POST",
                headers: {
                    'Content-Type':'multipart/form-data',
                    'Accept':'application/json',
                },
             body: formData,
         });

         const imageResponseJson = await imageResponse.json();
         if(response.status == 200 && imageResponse.status == 200){
             toggleOverlay(false);
            console.log("json",json);
            Alert.alert("Success","Submit success",
            [
                {
                  text: "Back to home",
                  onPress: () => navigation.navigate("HomePage",{
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
         }else{
            console.log("json",json);
            alert("error");

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    //   base64:true
    });
    // console.log(result);
    if (!result.cancelled) {
        console.log(result.uri);
        var sizeConfirm = await checkSize(result.uri);//<= 5MB
        // console.log("size: ",sizeConfirm.then(re=>{
        //                                     if(re == false){
        //                                         return alert("Image is too large, cannot exceed 5MB");
        //                                         }}));
        console.log(sizeConfirm);
            if(sizeConfirm == false){
                return alert("Image is too large, cannot exceed 5MB");
            }
        images.push({uri:result.uri, type: result.type});
        imageUris.push(result.uri);

        // var base64 = 'data:image/jpg;base64,' + result.base64;
        // images.push(base64);
        setImages(images);
        setHaveImage(false);
        setHaveImage(true);
        console.log('confirm selected: ',imageUris);
        // console.log(images);
    };
  };

const checkSize = async (imageUri) => {
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        if(fileInfo.size){
            console.log(fileInfo.size);
            if(fileInfo.size > 5000000){
                return false;
            }
        }
        return true;
    }

const deleteImages = () => {
        // delete images[currentImage];
        images.splice(currentImage, 1);
        imageUris.splice(currentImage, 1);
        console.log('confirm delete: ',images);
        if(imageUris.length == 0){
            setHaveImage(false);
        }
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
            <Text>Difficulty: </Text>
            <Text>For tailor-made today's knowledge card </Text>
            <ButtonGroup
                textStyle={{fontWeight:"bold"}}
                buttons={['Easy', 'Medium', 'Hard']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                    setDifficulty(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />
           {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                    <Text>Description:</Text>
                    <RichEditor
                        // ref={des}
                        onChange={ des => {
                            setDes(des);
                            console.log("descriptionText:", des);
                        }}
                    />
                </KeyboardAvoidingView> */}
            <Text>Description</Text><Input
                style={STYLES.input}
                onChangeText={des => setDes(des)}
                defaultValue={des}
                placeholder="Enter statement details"
                multiline={true}
            />
            <Text>
            {/* {images.forEach(image => {
          <Image  source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                PlaceholderContent={<ActivityIndicator />}>
          </Image>
        })} */}
            </Text>
        {images.length != 5?(
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
        ):(
            <></>
        )}
            {haveImage?(
                <View>
                <Text style={{alignSelf:"center"}}>Maximum 5 images. Each cannot exceed 5 MB</Text>
                 <SliderBox 
                    images={imageUris}
                    sliderBoxHeight={400}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 15,
                        marginHorizontal: 10,
                        padding: 0,
                        margin: 0
                    }}
                    paginationBoxVerticalPadding={20}
                    ImageComponentStyle={{borderRadius: 15, width: '93%', margin:10}}
                    // resizeMethod={'resize'}
                    // resizeMode={'cover'}
                    parentWidth = {390}
                    circleLoop
                    imageLoadingColor={COLORS.primary}
                    // onCurrentImagePressed={(index) => toggleShowImage(true, index)}
                    currentImageEmitter = {(index)=>setCurrentImage(index)}
                />
                <Button title='Delete current image'
                    titleStyle={{ fontWeight: 'bold' }}
                    buttonStyle={{
                        backgroundColor: COLORS.primary,
                        borderWidth: 2,
                        borderColor: COLORS.primary,
                        borderRadius: 30,
                        }}
                    containerStyle={{
                        width: 'auto',
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                    onPress={()=>deleteImages()}
                />
                </View>
            ):(
                <></>
            )}
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
            {/* <Overlay isVisible={isLoading}>
                <View style={{height:100, width:250, margin:10}}>
                    <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                    <LinearProgress color={COLORS.primary}/>
                </View>
            </Overlay> */}
        </ScrollView>

    );
}

