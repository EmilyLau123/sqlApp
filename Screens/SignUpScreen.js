import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {Component, useState} from 'react';
import {View, StyleSheet, SafeAreaView,Alert,ScrollView, Model, ActivityIndicator} from 'react-native';
import { Text, Button, Input, Card, Tab, TabView, LinearProgress, Overlay, Image } from 'react-native-elements';
import {STYLES, COLORS, SIZES, USER_ROLE} from '../components/style/theme';

//import { Form, FormItem } from 'react-native-form-component';
//https://www.npmjs.com/package/react-native-form-component
//image
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();

const AuthContext = React.createContext();

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");

    const [image, setImage] = useState({});

    const [role, setRole] = useState(0);
    const [index, setIndex] = useState(0);
    const [haveImage, setHaveImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const formData = new FormData();

    const toggleOverlay = (status) => {
        setIsLoading(status);
    };
  
   
    //to upload image NOT DONE
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64:true
        });
        // console.log(result);
        if (!result.cancelled) {
            // var base64 = 'data:image/jpg;base64,' + result.base64;
            // images.push(base64);
            
            setImage({uri: result.uri, name:'test.jpg', type:result.type});
            setHaveImage(true);
            console.log('confirm selected: ',image);
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

    // const uploadImages = async() => {
    //     const API_URL = 'https://mufyptest.herokuapp.com/api/user/images/insert/';
    //     formData.append('image', image);

    //     try {
    //         toggleOverlay(true);
    //         const response = await fetch(API_URL,{
    //          method:"POST",
    //             headers: {
    //                 'Content-Type':'multipart/form-data',
    //                 'Accept':'application/json'
    //             },
    //          body: JSON.stringify({
    //             username : username,
    //             image: formData
    //         }),
            
    //      });
    //      const json = await response.json();
    // }catch(error){
    //     return alert('error');
    // }finally{
    //     console.log('Images uploaded');
    // }
    // }

    // const insertImage = async(formData) => {
    //     const API_URL = 'https://mufyptest.herokuapp.com/api/user/insert/images/';
    
    //     try {
    //         toggleOverlay(true);
    //         const response = await fetch(API_URL,{
    //          method:"POST",
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Accept:'application/json',
    //             },
    //      body: formData,
    //     });
    //     const json = await response.json();
    // //      if(response.status == 200){
            
    // //         console.log("json",json);
    // //         Alert.alert("Success","Sign up success",
    // //         [
    // //             {
    // //               text: "Close",
    // //               onPress: () => navigation.goBack(),
    // //               style: "close",
    // //             },
    // //           ]
    // //         );
    // //      }else{
    // //          alert("Account already exist!");
    // //      }
    //    } catch (error) {
    //      console.error(error);
    //    } finally {
    //        toggleOverlay(false);
    //     // setLoading(false);
    //     console.log("done");
    //    }
    // }

    const insertUser = async () => {
        console.log(username,password,nickname, role, email);
        formData.append('image', image);
        console.log(formData);
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
                username: username,
                password: password,
                nickname: nickname,
                role: role,
                email: email,

            }),
            
         });

         //upload img
        const IMAGES_API_URL = 'https://mufyptest.herokuapp.com/api/user/images/insert/'+username+'/'+role;
        

            const imageResponse = await fetch(IMAGES_API_URL,{
             method:"POST",
                headers: {
                    // 'Content-Type':'multipart/form-data',
                    'Content-Type':'multipart/form-data',
                    'Accept':'application/json',
                    // enctype:"multipart/form-data"
                    
                },
             body: formData
            ,
            
         }).then((response)=>console.log(response));

         const json = await response.json();
         const imageJson = await imageResponse.json();
         if(response.status == 200 && imageResponse.status == 200){
            
            console.log("json",json);
            Alert.alert("Success","Sign up success",
            [
                {
                  text: "Close",
                  onPress: () => navigation.goBack(),
                  style: "close",
                },
              ]
            );
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
        <SafeAreaView style={{backgroundColor:COLORS.background,}}>
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
                                onPress={()=>insertUser(username, nickname, password, role)}
                            />
                        </Card>
                    </TabView.Item>
                    
                    <TabView.Item style={{backgroundColor:COLORS.background, margin:20,
                                        alignItems: 'center', //Centered vertically
                                        flex:1}}>
                        
                        <Card borderRadius={SIZES.round}>
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
                                    placeholder="we will notify you via email"
                                />

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
                        {haveImage?(
                            <Button title='View uploaded image'
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
                                titleStyle={{ fontWeight: 'bold' }}
                                onPress={()=>setShowImage(true)}

                            />
                        ):(
                            <></>
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
                                onPress={()=>insertUser(username, nickname, password, role, email)}
                            />
                        </Card>
                        {/* <Overlay isVisible={haveImage} on>
                            <Text>Uploaded Images</Text>
                            <Image
                                source={{uri:}}
                            
                            />
                        </Overlay> */}
                        
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
                
               </ScrollView> 
        </SafeAreaView>

    )

}

export default SignUpScreen;