//import { createStackNavigator } from '@react-navigation/stack';
import React, { Component,useState, useEffect } from 'react';
import {
    Text,
    Image,
    Card,
    Button,
    Overlay,
    LinearProgress
    } from 'react-native-elements'; 
import { SectionList, FlatList,View, ActivityIndicator, SafeAreaView, Model } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {ANSWER,COLORS,SIZES,DIFFICULTY,USER_ROLE} from '../components/style/theme.js';
import moment from 'moment';
//auth
import {changeNickname, changeRole, changeUserId, changeStat, changeEmail,changePassword} from '../model/action'
import { useDispatch, useSelector } from 'react-redux';

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
  return(
    <SafeAreaView
        style={{backgroundColor:COLORS.background, height:SIZES.height,
        justifyContent: 'center', //Centered horizontally
          alignItems: 'center', //Centered vertically
          flex:1}}>
      <Text style={{color:"white", fontWeight:"bold", fontSize:20, padding:20}}>Score: {score} / 10</Text>
      <Button title="Back to Home" 
              onPress={()=>navigation.navigate("HomePage")}/>
    </SafeAreaView>
  );
}
// export function Quiz(props){
//   const DATA = [
//     {
//       questions: ['Q1','Q2','Q3'],
//       difficulty: 'Easy',
//       answer:1,
//       options:['option A', 'option B', 'option C', 'option D'],
//       images: '',
//       author: 'Admin',
//     }
//   ];

//   var score=0;
//   var questionIndex=0;
//   var totalQuestion = 9;
//   var modelAnswer=DATA[0].answer;

//   return(
//     <View>
//       <Text>{questionIndex+1} / 10</Text>
//       <Text>Score: {score} / 10</Text>

//       <Divider></Divider>
//       <Text>Q: {DATA[0].questions[questionIndex]}</Text>
//       <Button title={DATA[0].options[0]} onPress={()=>nextQuestion(0,modelAnswer)}/>
//       <Button title={DATA[0].options[1]} onPress={()=>nextQuestion(1,modelAnswer)}/>
//       <Button title={DATA[0].options[2]} onPress={()=>nextQuestion(2,modelAnswer)}/>
//       <Button title={DATA[0].options[3]} onPress={()=>nextQuestion(3,modelAnswer)}/>

//     </View>
//   );
// }

//Quiz class 
// export class Quiz extends Component{
  
//   constructor(props){
//     super(props);
//     this.state = {
//       score:0,
//       quizNumber:0,
//       questionNumberIndex:0,
//       totalQuestions:9,
//       difficulty: this.props.difficulty
//   }

//   try {
//     const response = await fetch(API_URL);
//     const json = await response.json();
//     console.log(json);
//     setData(json);
//   } catch (error) {
//     console.error(error);
//   } finally {
//    setLoading(false);
//    console.log("done");
//   }


// // useEffect(() => {
// //  getRequests();
// // }, []);

//   this.DATA = [{
//   }]
  

// // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
// this.nextQuestion = this.nextQuestion.bind(this);
// }

// nextQuestion(key) {
//   if(this.state.questionNumberIndex >= this.state.totalQuestions){
//     alert("end");
//   }else{
//     if(this.DATA[this.state.questionNumberIndex].answer==key){
//       // alert(this.DATA[this.state.questionNumberIndex].answer);
//         this.setState((state)=>{
//         return {questionNumberIndex : state.questionNumberIndex + 1,
//                 score: state.score + 1};
//       });
//     }else{
//       this.setState((state)=>{
//       return {questionNumberIndex : state.questionNumberIndex + 1};
//       });
//     }
    
//   }
  
// }
//   // const DATA = [
//   //   {
//   //     questions: ['Q1','Q2','Q3'],
//   //     difficulty: 'Easy',
//   //     answer:1,
//   //     options:['option A', 'option B', 'option C', 'option D'],
//   //     images: '',
//   //     author: 'Admin',
//   //   }
//   // ];
  
//   render(){
//     return(
//       <View>
//         <Text>{this.state.questionNumberIndex+1} / 10</Text>
//         <Text>Score: {this.state.score} / 10</Text>

//         <Divider></Divider>
//         <Text>Q: {this.DATA[this.state.questionNumberIndex].question}</Text>
      
//         {/* {this.DATA[this.state.questionNumberIndex].options.map((item,key) => (
//             <Button title={item} onPress={()=>this.nextQuestion({item})}/>
//           ))} */}

//         <Button title={this.DATA[this.state.questionNumberIndex].options[0]} onPress={()=>this.nextQuestion(0)}/>
//         <Button title={this.DATA[this.state.questionNumberIndex].options[1]} onPress={()=>this.nextQuestion(1)}/>
//         <Button title={this.DATA[this.state.questionNumberIndex].options[2]} onPress={()=>this.nextQuestion(2)}/>
//         <Button title={this.DATA[this.state.questionNumberIndex].options[3]} onPress={()=>this.nextQuestion(3)}/>

//       </View>
//     );
//   }
// }
export function Quiz({route, navigation}){
  //   var totalQuestion = 9;
  //   var modelAnswer=DATA[0].answer;
  const user_id = useSelector(state => state.userIdReducer.user_id);
  const user_role = useSelector(state => state.roleReducer.role);
  const dispatch = useDispatch(); 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [score, setScore] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [storingData, setStoringData] = useState([]);
  // const [isSending, setIsSending] = useState(false);

  const [isLast, setIsLast] = useState(false);

  const toggleOverlay =(status) => {
        setIsLast(status);
    };

  const totalQuestion = 9;
  const {difficulty} = route.params;
  // console.log(difficulty);


  const updateUser = async (user_id, storingData,score) => {
    // console.log(user_id, storingData, score);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/update/';
    if(user_role != USER_ROLE.student){
      toggleOverlay(false);
      navigation.navigate("Congrats",{
          score:score
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
            }),
            
        });
        const json = await response.json();
        
        if(response.status == 200){
            // console.log("storingData",storingData);
            dispatch(changeStat(storingData));
            navigation.navigate("Congrats",{
              score:score
            });
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
        toggleOverlay(false);
        console.log("done");
        console.log(score);
      }
    }
    
 }


  const nextQuestion = (key) => {

      if(questionIndex >= totalQuestion){
        //Add result to the user's quizeDone array[obj_id, mark(1/0)]
        
        if(questionIndex == totalQuestion){
          toggleOverlay(true);
          console.log(isLast);
          if(data[questionIndex].answer==key){
            console.log("right",questionIndex);
            setScore(score + 1);
            alert(score);
            // alert(this.DATA[this.state.questionNumberIndex].answer);
            storingData.push({question_id:data[questionIndex]._id, 
                              point: 1,
                              answerTime:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                            });
            
            setStoringData(storingData);
            
          }else{
            console.log("wrong");
            storingData.push({question_id:data[questionIndex]._id, 
                              point: 0, 
                              answerTime:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                            });
  
            setStoringData(storingData);
  
          }
          var result = updateUser(user_id,storingData,score);
          result.then(function(){
            console.log("success")}
          ).catch(function(err){
            console.log("Fail:",err)}
          );

        }     
      
      }else{
        if(data[questionIndex].answer==key){
          console.log("right");

          // alert(this.DATA[this.state.questionNumberIndex].answer);
          storingData.push({question_id:data[questionIndex]._id, 
                            point: 1,
                            answerTime:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                          });
          setQuestionIndex(questionIndex + 1);
          setScore(score + 1);
          
          setStoringData(storingData);
        }else{
          console.log("wrong");
          storingData.push({question_id:data[questionIndex]._id, 
                            point: 0, 
                            answerTime:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                          });

          setQuestionIndex(questionIndex + 1);
          setStoringData(storingData);

        }
        
      }
            console.log(score);
    }

  const getQuestions = async (difficulty) => {
    console.log('difficulty:',difficulty);

    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    var intDifficulty = DIFFICULTY.easy
    if(difficulty == "Medium"){
      intDifficulty = DIFFICULTY.medium;
    }else if(difficulty == "Hard"){
      intDifficulty = DIFFICULTY.hard;
    }

    const API_URL = 'https://mufyptest.herokuapp.com/api/questions/find/difficulty/'+intDifficulty;
console.log(API_URL);
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      console.log(json);
      if(response.status == 200){
      setData(json);
    }
    } catch (error) {
      console.error(error);
    } finally {
      // if(typeof(data)=='undefined'){
      //   setData(null);
      // }
      setLoading(false);
      console.log("done");
    }
  }

  useEffect(() => {
    getQuestions(difficulty);
  }, []);
  
// console.log('data',data[questionIndex]);
// console.log('index',questionIndex);
// console.log("storingData: ",storingData);

// if(data == ""){
//   return(
//     <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height, }}>
//       <Text style={{fontSize:18, fontWeight:"bold", color:"white", alignSelf:"center", paddingTop:40 }}>Oops!</Text> 
//       <Text style={{fontSize:18, fontWeight:"bold", color:"white", alignSelf:"center"}}>No questions found!</Text> 
//       <Button title="Back to Home"
//                   buttonStyle={{
//                     backgroundColor: COLORS.attention,
//                     borderWidth: 2,
//                     borderColor: COLORS.attention,
//                     borderRadius: 30,
//                 }}
//                 containerStyle={{
//                     width: 'auto',
//                     marginHorizontal: 50,
//                     marginVertical: 10,
//                 }}
//                   onPress={()=>navigation.navigate("Home")}/>
//     </SafeAreaView>
//   );
// }else{
  //For making questions show randomly
  const dataLength = data.length;

  return(
    <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>

        {isLoading?<ActivityIndicator/>:(
        <View>
          <Card borderRadius={SIZES.round}>
            <Text style={{alignSelf:"flex-end", fontSize:16}}>Score: {score-1} / 10</Text>
            <Text style={{fontWeight:"bold", alignSelf:"center", fontSize:24, paddingBottom:SIZES.padding}}>{questionIndex+1} / 10</Text>
            
            <Card.Divider />
            <Text style={{fontSize:16, alignSelf:"center", paddingBottom:10}}>Q: {data[questionIndex].question}</Text>
          
 {/* {this.DATA[this.state.questionNumberIndex].options.map((item,key) => (
             <Button title={item} onPress={()=>this.nextQuestion({item})}/>
           ))} */}
           {/* {images.forEach(image => { */}
            <Image  source={{ uri: data[questionIndex].images[0] }}
                style={{ width: 300, height: 200 }}
                PlaceholderContent={<ActivityIndicator />}>
          </Image>
        {/* })} */}

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
          
                
            
          </View>
              // :
              // <View style={{backgroundColor:COLORS.background, height:SIZES.height, }}>
              //       <Text style={{fontSize:18, fontWeight:"bold", color:"white", alignSelf:"center", paddingTop:40 }}>Oops!</Text> 
              //        <Text style={{fontSize:18, fontWeight:"bold", color:"white", alignSelf:"center"}}>No questions found!</Text> 
              //        <Button title="Back to Home"
              //                   buttonStyle={{
              //                     backgroundColor: COLORS.attention,
              //                     borderWidth: 2,
              //                     borderColor: COLORS.attention,
              //                     borderRadius: 30,
              //                 }}
              //                 containerStyle={{
              //                     width: 'auto',
              //                     marginHorizontal: 50,
              //                     marginVertical: 10,
              //                 }}
              //                   onPress={()=>navigation.navigate("Home")}/>
              //     </View>
            
      
        )}
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