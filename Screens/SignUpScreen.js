import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, SafeAreaView,Alert,ScrollView, Model, ActivityIndicator} from 'react-native';
import { Text, Button, Input, Card, Tab, TabView, LinearProgress, Overlay, Image } from 'react-native-elements';
import {STYLES, COLORS, SIZES, USER_ROLE} from '../components/style/theme';
import { SliderBox } from "react-native-image-slider-box";

//import { Form, FormItem } from 'react-native-form-component';
//https://www.npmjs.com/package/react-native-form-component
//image
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'

const Stack = createStackNavigator();

const AuthContext = React.createContext();

const SignUpScreen = ({navigation}) => {
    const [role, setRole] = useState(0);

    //student
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    //teacher
    const [teacherUsername, setTeacherUsername] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [teacherNickname, setTeacherNickname] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [image, setImage] = useState([]);
    //image
    const [index, setIndex] = useState(0);
    const [haveImage, setHaveImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [imageUri, setImageUri] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    
    const formData = new FormData();

        const [re, setRe] = useState();

    const toggleOverlay = (status) => {
        setIsLoading(status);
    };
  
   
    //to upload image NOT DONE
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64:true
        });
        // console.log(result);
        if (!result.cancelled) {
        
            var sizeConfirm = await checkSize(result.uri);//<= 5MB
        
            console.log(sizeConfirm);
            if(sizeConfirm == false){
                return alert("Image is too large, cannot exceed 5MB");
            }else{
                image.push({uri: result.uri, type:result.type});// name:'test.jpg',
                setHaveImage(true);
                imageUri.push(result.uri);
                console.log('confirm selected: ',image);
            }
            
        }
    };

    const deleteImage = () => {
        for (var data in image) {
            delete image[data];
            
        }
        console.log('confirm delete: ',image);
        setShowImage(false);
        setHaveImage(false);
        // console.log(image);
    }

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
        image.splice(currentImage, 1);
        imageUri.splice(currentImage, 1);
        console.log('confirm delete: ',image);
        setHaveImage(false);
    }

   
    const insertUser = async (inputUsername, inputPassword, inputNickname, inputRole, inputEmail) => {
        console.log(inputUsername, inputPassword, inputNickname, inputRole, inputEmail);
        // formData.append('image', image);
        // console.log(formData);
        //https://reactnative.dev/movies.json
        //http://localhost:8099/api/retrieveStatements/
        //https://mufyptest.herokuapp.com
        const API_URL = 'https://mufyptest.herokuapp.com/api/user/insert/';
        //insert inputted text data
        try {
            toggleOverlay(true);
            const response = await fetch(API_URL,{
                method:"POST",
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                body: JSON.stringify({
                    username: inputUsername,
                    password: inputPassword,
                    nickname: inputNickname,
                    role: inputRole,
                    email: inputEmail,

                }),
                
            });
            const json = await response.json();

            if(response.status == 200){
                console.log('inserted');
                if(haveImage){
                        for(let i = 0; i<image.length;i++){
                            formData.append(i, image[i]);
                            console.log(formData);
                        }
                    console.log('uploading');
                //upload img
                    const IMAGES_API_URL = 'https://mufyptest.herokuapp.com/api/user/images/insert/'+inputUsername+'/'+inputRole;
                    

                        const imageResponse = await fetch(IMAGES_API_URL,{
                        method:"POST",
                            headers: {
                                // 'Content-Type':'multipart/form-data',
                                'Content-Type':'multipart/form-data',
                                'Accept':'application/json',
                                // enctype:"multipart/form-data"
                                
                            },
                        body: formData,
                        
                    });

                    const imageJson = await imageResponse.json();
                    if(imageResponse.status == 200){
                        console.log('uploaded');
                        console.log("json",json);
                        Alert.alert("Success","Sign up success and you should recvice an email about application result in 3 days");
                        // [{
                        //     text: "Close",
                        //     onPress: () => navigation.goBack(),
                        //     style: "close",
                        //     },
                        // ]);
                    }else{
                        alert("Something went wrong");
                    }
                }else{
                    console.log('signed up');
                    Alert.alert("Success","Sign up success",
                        [{
                            text: "Close",
                            onPress: () => navigation.goBack(),
                            style: "close",
                            },
                        ]);
                }
                
            }else{
                alert("Account already exist!");
            }
       } catch (error) {
         console.error(error);
       } finally {
           toggleOverlay(false);
        // setLoading(false);
        console.log("done");
       }
     }
    
    //  useEffect(() => {
    //   getStatements();
    //  }, []);

//https://reactnavigation.org/docs/params passing values
console.log(index, role);

    return(
        <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height-SIZES.listPaddingBottom}}>
            <ScrollView>
                <Tab
                    value={index}
                    onChange={(e) => {setIndex(e);setRole(e)}}
                    indicatorStyle={{
                    backgroundColor: 'white',
                    height: 2,
                    }}
                    variant="primary"
                >
                    <Tab.Item
                        title="Sign up as student"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'pencil-outline', type: 'ionicon', color: 'white' }}
                    />
                    <Tab.Item
                        title="Sign up as teacher"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'school-outline', type: 'ionicon', color: 'white' }}
                    />
                </Tab>
                <TabView value={index} onChange={setIndex, setRole} animationType="spring">
                    <TabView.Item style={{backgroundColor:COLORS.background, margin:20,
                                        alignItems: 'center', //Centered vertically
                                        flex:1}}>
                        <Card borderRadius={SIZES.round} width={SIZES.width-100} >   
                             <Text>Username*</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={username => setUsername(username)}
                                    defaultValue={username}
                                    placeholder="For login"
                                />
                            <Text>Nickname</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={nickname => setNickname(nickname)}
                                    defaultValue={nickname}
                                    placeholder="How should we call you?"

                                />
                            <Text>Password*</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={password => setPassword(password)}
                                    defaultValue={password}
                                    placeholder="For login"
                                    secureTextEntry={true}

                                />
                            <Text>Email</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={email => setEmail(email)}
                                    defaultValue={email}
                                    placeholder="For password reset"
                                />
                            <Button title='SIGN UP'
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
                                onPress={()=>insertUser(username, password, nickname, role, email)}
                            />
                        </Card>
                    </TabView.Item>
                    
                    <TabView.Item style={{backgroundColor:COLORS.background, margin:20,
                                        alignItems: 'center', //Centered vertically
                                        flex:1}}>
                        
                        <Card borderRadius={SIZES.round} containerStyle={{paddingBottom:20,marginBottom:30, height:"auto"}}>
                            <Text style={{fontWeight:"bold", padding:5}}>
                            After your registration is approved,
                             you can submit add quiz question to enlarge 
                             our question database, So we need more information 
                             for our consideration
                             </Text>
                             <Card.Divider></Card.Divider>  
                             <Text>Username*</Text>
                             
                                <Input
                                    style={STYLES.input}
                                    onChangeText={teacherUsername => setTeacherUsername(teacherUsername)}
                                    defaultValue={teacherUsername}
                                    placeholder="For login"
                                />
                            <Text>Nickname</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={teacherNickname => setTeacherNickname(teacherNickname)}
                                    defaultValue={teacherNickname}
                                    placeholder="How should we call you?"

                                />
                            <Text>Password*</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={teacherPassword => setTeacherPassword(teacherPassword)}
                                    defaultValue={teacherPassword}
                                    placeholder="For login"
                                    secureTextEntry={true}
                                />
                            <Text>Email</Text>
                                <Input
                                    style={STYLES.input}
                                    onChangeText={teacherEmail => setTeacherEmail(teacherEmail)}
                                    defaultValue={teacherEmail}
                                    placeholder="we will notify you via email"
                                />

                            
                        {haveImage?(
                <View>
                <Text style={{alignSelf:"center"}}>Maximum 1 image. Image cannot exceed 5 MB</Text>
                 <SliderBox 
                    images={imageUri}
                    sliderBoxHeight={250}
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
                    ImageComponentStyle={{
                        width: '90%', 
                        margin:10,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    resizeMethod={'resize'}
                    resizeMode={'contain'}
                    parentWidth = {360}
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
                        
                        <Button title='Images to proof'

                                buttonStyle={{
                                    backgroundColor: COLORS.attention,
                                    borderWidth: 2,
                                    borderColor: COLORS.attention,
                                    borderRadius: 30,
                                    }}
                                containerStyle={{
                                    width: 'auto',
                                    marginHorizontal: 50,
                                    marginVertical: 10,
                                    }}
                                titleStyle={{ fontWeight: 'bold' }}
                                onPress={()=>pickImage()}

                            />
                    )}
                            
                            
                            <Button title='SIGN UP AS TEACHER'
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
                                onPress={()=>insertUser(teacherUsername,teacherPassword, teacherNickname, role, teacherEmail)}
                            />
                        </Card>
                        
                    </TabView.Item>
                    
                </TabView>
                {/* pop up when user click the view uploaded image button */}
                    <Overlay isVisible={showImage} onBackdropPress={()=>setShowImage(false)}>
                            <Image
                                source={{ uri:image.uri }}
                                PlaceholderContent={<ActivityIndicator />}
                                containerStyle={{width:200, height:200}}
                            />
                            <Button
                                title='delete'
                                onPress={()=>deleteImage()}
                            />
                            <Button
                                title='Close'
                                onPress={()=>setShowImage(false)}
                            />
                    </Overlay>

                    <Overlay isVisible={isLoading}>
                        <View style={{height:100, width:250, margin:10}}>
                            <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                            <LinearProgress color={COLORS.primary}/>
                        </View>
                    </Overlay>
                
               </ScrollView> 
        </SafeAreaView>

    )

}

export default SignUpScreen;