//import { createStackNavigator } from '@react-navigation/stack';
import React, { Component,useState, useEffect } from 'react';
import {
    Text,
    Image,
    Card,
    Button,
    Overlay,
    LinearProgress,
    ListItem
    } from 'react-native-elements'; 
import { SectionList, FlatList,View, ActivityIndicator, SafeAreaView, Model, Alert,ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {ANSWER,COLORS,SIZES,DIFFICULTY,USER_ROLE, REWARDS} from '../components/style/theme.js';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';

//auth
import {changeNickname, changeRole, changeUserId, changeStat, changeEmail,changePassword,changeReward,} from '../model/action'
import { useDispatch, useSelector } from 'react-redux';
//image
import { SliderBox } from "react-native-image-slider-box";
import ImageViewer from 'react-native-image-zoom-viewer';

//counter
import CountDown from 'react-native-countdown-component';


export function askSignInScreen({route,navigation}){
  return(
    <SafeAreaView
        style={{backgroundColor:COLORS.background, height:SIZES.height,
        justifyContent: 'center', //Centered horizontally
          alignItems: 'center', //Centered vertically
          flex:1}}>
      <Text style={{color:"white", fontWeight:"bold", fontSize:20, padding:20}}>You have to sign in first!</Text>
      <Button title="Go sign in" 
              onPress={()=>navigation.navigate("Account")}/>
    </SafeAreaView>
  );
}

export function congratScreen({route,navigation}){
  const {score} = route.params;
  var rewards = route.params.rewards;
  // var rewards = [0,1];
  console.log("rewards: ", rewards);
  return(
    <SafeAreaView
        style={{backgroundColor:COLORS.background, height:SIZES.height,
        justifyContent: 'center', //Centered horizontally
          alignItems: 'center', //Centered vertically
          flex:1}}>
      <Text style={{color:"white", fontWeight:"bold", fontSize:20, padding:20}}>Score: {score} / 5</Text>
      {rewards.length != 0?(
        <>
         
        <Text style={{color:"white", fontWeight:"bold", fontSize:20, padding:20}}>You have earn reward(s):</Text>
        
        {rewards.map(item =>{
          return (
          <>
            <ListItem 
            linearGradientProps={{
                colors: ['#3ba9f7','#4a84f0' ],
                start: { x: 1, y: 3 },
                end: { x: 0.2, y: 2 },
            }}
            ViewComponent={LinearGradient}
            margin={10}
            // containerStyle = {{rounded}}
            pad={20}
            containerStyle={{borderRadius:30}}
        >
        
            <Ionicons name="golf" size={SIZES.icon} color="white"/>
            <Text style={{color:"white", fontSize:16, fontWeight:"bold", fontFamily:"AmericanTypewriter-Bold"}}>{item.name}
            </Text>
        </ListItem>
        </>
        // <Text style={{color:"white", fontWeight:"bold", fontSize:18, padding:5}}>
        //     {item.name}
        //   </Text>
          )
          })}
        </>
            ):(
              <></>
            )}   
        
      <Button title="Back to Home" 
              onPress={()=>navigation.navigate("HomePage")}/>
    </SafeAreaView>
  );
}

export function Quiz({route, navigation}){
  //   var totalQuestion = 9;
  //   var modelAnswer=DATA[0].answer;
  const user_id = useSelector(state => state.userIdReducer.user_id);
  const user_role = useSelector(state => state.roleReducer.role);
  const user_reward = useSelector(state => state.rewardReducer.reward);
  const user_stat = useSelector(state => state.statReducer.stat);
  const dispatch = useDispatch(); 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [intDifficulty, setIntDifficulty] = useState(0);
  
  const [time, setTime] = useState(60);
  const [timerStatus, setTimerStatus] = useState(true);
  //images
  const [imageName, setImageName] = useState([]);
  const [haveImage, setHaveImage] = useState(false);
  const [imageUrlForZoom, setImageUrlForZoom] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [imageOverlay, setImageOverlay] = useState(false);
  
  // const [isSending, setIsSending] = useState(false);

  const [isLast, setIsLast] = useState(false);

  const toggleOverlay =(status) => {
        setIsLast(status);
    };
  const totalQuestion = 4;
  const {difficulty} = route.params;
  
  function toggleImageOverlay(status, clickedIndex){
    setImageOverlay(status);
    setClickedIndex(clickedIndex);
    console.log("status: ", status, "clickedIndex: ", clickedIndex);
  }

  const updateUser = async (user_id,int_difficulty,score) => {
    // console.log(user_id, storingData, score);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
   setTimerStatus(false);
    const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var userRewardId = [];
    var retrievedReward = [];
    //all correct in one quiz (first time only)
    user_reward.forEach(item => {
        userRewardId.push(item.id);
    });
    if(score >= 4 && userRewardId.includes(0) == false){
      dispatch(changeReward({id:0, name:REWARDS[0],retrieveTime: currentTime}));
      retrievedReward.push({id:0, name:REWARDS[0],retrieveTime: currentTime});
    }
    //all wrong
    if(score <= 0 && userRewardId.includes(1) == false){
      dispatch(changeReward({id:1, name:REWARDS[1],retrieveTime: currentTime}));
      retrievedReward.push({id:1, name:REWARDS[1],retrieveTime: currentTime});
    }
    var cumlativeScore = 0;
    //cumulated 30 scores
    user_stat.forEach(item => {
        cumlativeScore += item.score;
    });
    if(cumlativeScore+score >= 30 && userRewardId.includes(2) == false){
      dispatch(changeReward({id:2, name:REWARDS[2],retrieveTime: currentTime}));
      retrievedReward.push({id:2, name:REWARDS[2],retrieveTime: currentTime});
    }

    const storingData = {quizDifficulty: int_difficulty, score: score+1, completeTime: currentTime};

    console.log("storingData: ",storingData,"retrievedReward: ",retrievedReward);
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/quiz/update/';
    if(user_role != USER_ROLE.student){
      toggleOverlay(false);
      navigation.navigate("Congrats",{
          score:score+1
        });
    }else{
      try {
        const response = await fetch(API_URL,{
            method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                user_id: user_id,
                quizDone: storingData,
                rewards: retrievedReward,
            }),
        });
        const json = await response.json();
        if(response.status == 200){
            // console.log("storingData",storingData);
            dispatch(changeStat(storingData));
            // dispatch(changeReward(retrievedReward));
            navigation.navigate("Congrats",{
              score:score+1,
              rewards: retrievedReward,
            });
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
        toggleOverlay(false);
        console.log("User updated");
        console.log(score+1);
      }
    }
 }

  const nextQuestion = async(key) => {
      if(questionIndex >= totalQuestion){
        if(questionIndex == totalQuestion){
          toggleOverlay(true);
          console.log('isLast? ',isLast);
          if(data[questionIndex].answer==key){
            console.log("right",questionIndex);
            setScore(score + 1);
          }else{
            console.log("wrong",questionIndex);
  
          }
          console.log('score: ', score);
          var result = await updateUser(user_id,intDifficulty, score);
          console.log('result: ', result);
        }   
      }else{
        if(data[questionIndex].answer==key){
          console.log("right");
          setQuestionIndex(questionIndex + 1);
          setScore(score + 1);
        }else{
          console.log("wrong");
          setQuestionIndex(questionIndex + 1);
        }
        
      }
      console.log('score: ',score);
      console.log('questionIndex: ',questionIndex);
      console.log('NextQ: ',data[questionIndex]);
    }

  

  const getQuestions = async (difficulty) => {
    
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    
    var intDifficulty = DIFFICULTY.easy
    
    if(difficulty == "Medium"){
      intDifficulty = DIFFICULTY.medium;
      setIntDifficulty(DIFFICULTY.medium);
    }else if(difficulty == "Hard"){
      intDifficulty = DIFFICULTY.hard;
      setIntDifficulty(DIFFICULTY.hard);
    }

    if(difficulty == "Easy"){
      setTime(30);
    }else if(difficulty == "Medium"){
      setTime(45);
    }
// console.log('difficulty:',intDifficulty);
    const API_URL = 'https://mufyptest.herokuapp.com/api/questions/find/difficulty/'+intDifficulty;
// console.log(API_URL);
    try {
      console.log("fetching");
      const response = await fetch(API_URL);
      const json = await response.json();
      console.log("json:",response.status);
      if(response.status == 200){
        
        console.log(json);
        json.forEach(item=>{
          if(item.hasOwnProperty('images')){
            console.log("item.images:  ",item.images);
              item.images.forEach(image=>{
                var fullUrl = "https://res.cloudinary.com/emilyfyp/image/upload/v1644578522/questions/"+image;
                imageUrlForZoom.push({url:fullUrl});
                imageName.push(fullUrl);
                // console.log('item: ',item);
                console.log("imageUrlForZoom: ",imageUrlForZoom, "fullUrl: ",fullUrl);

              });
          // console.log(imageUris);
        }
      });
      setData(json);
      console.log("data:",data.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log("done: ",data);
    }
  }

  useEffect(() => {
    getQuestions(difficulty);
  }, []);
  //For making questions show randomly
  const dataLength = data.length;

  return(
    <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height-SIZES.tabBarheight}}>
      <ScrollView>
        {isLoading?<ActivityIndicator/>:(
        <View>
          <Card borderRadius={SIZES.round} containerStyle={{marginBottom:15}}>
            <CountDown
              until={time}
              size={20}
              onFinish={() => {
                
                Alert.alert(
                  "Message",
                  "Time is up!",
                  [{
                      text: "Ok",
                      onPress: () => updateUser(user_id,intDifficulty,score),
                      style: "cancel"
                    },
                  ]);
                }}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: COLORS.attention}}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'minutes', s: 'second'}}
              running = {timerStatus}
            />
            <Text style={{alignSelf:"flex-end", fontSize:16}}>Score: {score} / 5</Text>
            <Text style={{fontWeight:"bold", alignSelf:"center", fontSize:24, paddingBottom:SIZES.padding}}>{questionIndex+1} / 5</Text>
            
            <Card.Divider />
            <Text style={{fontSize:16, alignSelf:"center", paddingBottom:10, fontWeight:"bold"}}>{data[questionIndex].question}</Text>
            <Card.Divider />

        {data[questionIndex].hasOwnProperty('images')?(
          <SliderBox 
              images={imageName}
              sliderBoxHeight={250}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10
              }}

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
              onCurrentImagePressed={(index) => toggleImageOverlay(true, index)}
              // currentImageEmitter = {(index)=>setCurrentImage(index)}
          />
        ):(
          <></>
        )}
        
         <Button title={data[questionIndex].options[0]}
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
                  onPress={()=>nextQuestion(0)}/>
         <Button title={data[questionIndex].options[1]}
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
                  onPress={()=>nextQuestion(1)}/>
         <Button title={data[questionIndex].options[2]}
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
                  onPress={()=>nextQuestion(2)}/>
         <Button title={data[questionIndex].options[3]}
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
                  onPress={()=>nextQuestion(3)}/>

          </Card>
            <Overlay isVisible={isLast} >
              <View style={{height:100, width:250, margin:10}}>
                <Text style={{padding:10, alignSelf:"center", paddingBottom:40, fontSize:16}}>Loading...</Text>
                <LinearProgress color={COLORS.primary}/>
              </View>
            </Overlay>
            <Overlay visible={imageOverlay} overlayStyle={{height:600, width:400}} onBackdropPress={()=>toggleImageOverlay(false)}>
              <ImageViewer imageUrls={imageUrlForZoom} index={clickedIndex} backgroundColor="gray" maxOverflow={200} enableSwipeDown onSwipeDown={() => toggleImageOverlay(false)}/>
            </Overlay>
          </View>
            
        )}
        </ScrollView>
      </SafeAreaView>
  );
}
// }

        
export function quizChooseScreen({navigation}){
  return(
    <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height,
          justifyContent: 'center', //Centered horizontally
          alignItems: 'center', //Centered vertically
          flex:1}}>
      <Button title="Easy"
        buttonStyle={{
          backgroundColor: COLORS.primary,
          borderWidth: 2,
          borderColor: COLORS.primary,
          borderRadius: 30,
      }}
      containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
      }}
      onPress={()=>navigation.navigate("Quiz",{
        difficulty:'Easy'
      })}/>
      <Button title="Medium"
        buttonStyle={{
          backgroundColor: COLORS.primary,
          borderWidth: 2,
          borderColor: COLORS.primary,
          borderRadius: 30,
      }}
      containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
      }}
      onPress={()=>navigation.navigate("Quiz",{
        difficulty:'Medium'
      })}/>
      <Button title="Hard" 
        buttonStyle={{
          backgroundColor: COLORS.primary,
          borderWidth: 2,
          borderColor: COLORS.primary,
          borderRadius: 30,
      }}
      containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
      }}
        onPress={()=>navigation.navigate("Quiz",{
        difficulty:'Hard'
      })}/>
    </SafeAreaView>
  );
}

// const QuizStack = createStackNavigator();


// export function QuizScreen(){
//     return (
//       // <QuizStack.Navigator>
//       //   <QuizStack.Screen name="Easy" component={Quiz} 
//       //     // initialParams={{DATA:{questions: ['Q1','Q2','Q3'],
//       //     // difficulty: 'Easy',
//       //     // answer:1,
//       //     // options:['option A', 'option B', 'option C', 'option D'],
//       //     // images: '',
//       //     // author: 'Admin'}}}
//       //    optios={{title:"Home"}}/>
//       //   <QuizStack.Screen name="Medium" component={Quiz} optios={{title:"Daily Knowledge"}}/>
//       //   <QuizStack.Screen name="Hard" component={Quiz} optios={{title:"Quiz"}}/>
  
//       // </QuizStack.Navigator>
//       <QuizStack.Navigator>
//         <QuizStack.Screen name="Choose" component={quizChooseScreen} options={{title:"Choose", headerShown: false}}/>
//         <QuizStack.Screen name="Quiz" component={Quiz} options={{title:"Quiz",headerShown: false}}/>
//         <QuizStack.Screen name="Congrats" component={congratScreen} options={{title:"congrats", headerShown: false}}/>

        
//       </QuizStack.Navigator>
//       // </QuizStack.Navigator>
//       // <View>
//       //   <Button title="Easy" />
//       //   <Button title="Medium" />
//       //   <Button title="Hard" />
//       // </View>
//     );
// }