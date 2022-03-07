import React, {Component, useState,useEffect} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator, Model, KeyboardAvoidingView} from 'react-native';
import { Text, Button, Input,ButtonGroup, Card, Image, Overlay, LinearProgress, Switch } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {COLORS, SIZES, ICONS, STRINGS, STYLES} from '../../components/style/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { SliderBox } from "react-native-image-slider-box";
import * as FileSystem from 'expo-file-system'
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import ImageViewer from 'react-native-image-zoom-viewer';

export function statementEditScreen({navigation, route}){

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

   console.log("params: ",route.params);
   

    const [statement_id, setStatement_id] = useState(route.params.statement_id);
    const [title, setTitle] = useState(route.params.title);
    const [des, setDes] = useState(route.params.description);
    const [hide, setHide] = useState(route.params.hide);

    const [isLoading,setIsLoading] = useState(false);

    const [images, setImages] = useState(route.params.images);
    const [haveImage, setHaveImage] = useState(images.lrngth != 0?true:false);
    const [showImage, setShowImage] = useState(false);
    
    const [currentImage, setCurrentImage] = useState(0);
    const [imageUris, setImageUris] = useState([]);
    const [imageAdded, setImageAdded] = useState(false);

    const [difficulty, setDifficulty] = useState(route.params.difficulty);
    const [selectedIndex, setSelectedIndex] = useState(route.params.difficulty);

    const [checked, setChecked] = useState(route.params.hide == 0?false:true);

    const [imageUrlForZoom, setImageUrlForZoom] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(0);
    const [imageOverlay, setImageOverlay] = useState(false);
    //editor
    const richText = React.useRef();

    const formData = new FormData();

    const toggleOverlay = (status) => {
        setIsLoading(status);
    } 
    function toggleImageOverlay(status, clickedIndex){
        setImageOverlay(status);
        setClickedIndex(clickedIndex);
        console.log("status: ", status, "clickedIndex: ", clickedIndex);
    }
    const toggleSwitch = () => {
        setChecked(!checked);
        setHide(checked == false?0:1);
        console.log("hide: ",hide);
      };
    
    const imageConvert = () => {
    if(images.length != 0){
        console.log("images: ",images);
        
        images.forEach(item => {
            let imageFullName = "https://res.cloudinary.com/emilyfyp/image/upload/v1646458947/statements/"+item;
            imageUris.push(imageFullName);
            
            imageUrlForZoom.push({url:imageFullName});
            console.log(imageUrlForZoom);
            });
        }
    }
const updateStatement = async (title, description,images) => {
        // console.log("originImages: ",originImages,"images: ",imageUris);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        //https://mufyptest.herokuapp.com/api/question/insert/
        const API_URL = 'https://mufyptest.herokuapp.com/api/statement/update/';
        var apiBody = JSON.stringify({
            statement_id: statement_id,
            title: title,
            description: description,
            difficulty: difficulty,
            hide: hide,
        });
        if(imageAdded == true){//need image api
            console.log("sth added");
            try {
                toggleOverlay(true);
                const response = await fetch(API_URL,{
                method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                body: apiBody,
            });
            const json = await response.json();
            console.log('JSON: ',json);
            if(images.length != 0){
                for(let i = 0; i<images.length;i++){
                    formData.append(i, images[i]);
                    console.log('formData: ',formData);
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
                Alert.alert("Success","Edit success",
                [
                    {
                    text: "Back to home",
                    onPress: () => navigation.goBack(),
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
            console.log("update with image done!!");
        }


    
     }else{//dont need image api
        console.log("nothing added");
        apiBody = JSON.stringify({
            statement_id: statement_id,
            title: title,
            description: description,
            difficulty: difficulty,
            hide: hide,
            images: images
        });

        try {
            toggleOverlay(true);
            const response = await fetch(API_URL,{
            method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: apiBody,
            });
            const json = await response.json();
            console.log('JSON: ',json);
            
            if(response.status == 200){
                toggleOverlay(false);
                console.log("json",json);
                Alert.alert("Success","Edit success",
                [
                    {
                        text: "Back to home",
                        onPress: () => navigation.goBack(),
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
        console.log("update with image done!!");
        }
     }
}
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
        setImageAdded(true);
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
        setImageAdded(false);
    }

    useEffect(() =>{
            imageConvert()
        },[]
    );
   

    return(
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}

        >
        <ScrollView style={{backgroundColor:COLORS.background}}>
            <Card borderRadius={SIZES.round}>
                <Text style={styles.header}>Edit a statement's detail</Text>
            
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
            <Text>Hide?: </Text>
            <Switch
                    value={hide==0?false:true}
                    onValueChange={() => toggleSwitch()}
                />
           
            <Text>Description</Text>
            {/* <Input
                style={STYLES.input}
                onChangeText={des => setDes(des)}
                defaultValue={des}
                placeholder="Enter statement details"
                multiline={true}
            /> */}
            <RichToolbar
                editor={richText}
                actions={[  actions.setBold,
                            actions.setItalic, 
                            actions.setUnderline, 
                            actions.heading1,
                            actions.insertBulletsList,
		                    actions.insertOrderedList, 
                            actions.checkboxList, 
                            actions.undo, 
                            actions.redo,
                            actions.removeFormat,
                            actions.indent,
                            actions.outdent,
                            actions.table,
                            actions.code,
                            actions.alignRight,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.fontSize,
                            ]}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
                // customAction = {}
            />
            <RichEditor
                ref={richText}
                onChange={ des => setDes(des)}
                usecontainer = {true}
                defaultValue={des}
                placeholder="Enter statement details"
                initialContentHTML={des}

                    />
                    {/* <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        onChange={(newContent) => {}}
      /> */}

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
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    parentWidth = {390}
                    circleLoop
                    imageLoadingColor={COLORS.primary}
                    onCurrentImagePressed={(index) => toggleImageOverlay(true, index)}
                    // currentImageEmitter = {(index)=>setCurrentImage(index)}
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
                title="Update"
                onPress={()=>updateStatement(title, des, images)}
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
                onPress={()=>deleteStatement(statement_id)}
            />

            <Overlay isVisible={isLoading} onBackdropPress={()=>toggleOverlay(false)} >
              <View style={{height:100, width:250, margin:10}}>
                <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                <LinearProgress color={COLORS.primary}/>
              </View>
            </Overlay>
            <Overlay visible={imageOverlay} overlayStyle={{height:600, width:400}}      onBackdropPress={()=>toggleImageOverlay(false)}>
              <ImageViewer imageUrls={imageUrlForZoom} index={clickedIndex} backgroundColor="gray" maxOverflow={200} enableSwipeDown onSwipeDown={() => toggleImageOverlay(false)}/>
            </Overlay>
            
        </ScrollView>
        </KeyboardAvoidingView>
    )}