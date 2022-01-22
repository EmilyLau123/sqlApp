//import { createStackNavigator } from '@react-navigation/stack';
import React, { Component,useState, useEffect } from 'react';
import {
    Text,
    Image,
    Card,
    Button
    } from 'react-native-elements'; 
import { SectionList, FlatList,View, ActivityIndicator, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {ANSWER,COLORS,SIZES,DIFFICULTY} from '../components/style/theme.js';

export function congratScreen({route,navigation}){
  const {score} = route.params;
  return(
    <SafeAreaView>
      <Text>Score: {score} / 10</Text>
      <Button title="Back to Home" 
              onPress={()=>navigation.navigate("Home")}/>
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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [storingData, setStoringData] = useState([]);

  const totalQuestion = 9;
  const {difficulty} = route.params;
  console.log(difficulty);


  const updateUser = async (user_id, storingData, score, {navigation}) => {
    console.log(user_id, storingData, score);
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'http://localhost:8099/api/user/update/';

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
        console.log("json",json);
        navigation.navigate("Congrats",{
          score:score
        });
     }
   } catch (error) {
     console.error(error);
   } finally {
    // setLoading(false);
    console.log("done");
   }
 }


  function nextQuestion(key){
      var oldScore = score;
      var oldQuestionIndex = questionIndex;


      if(questionIndex >= totalQuestion){
        //Add result to the user's quizeDone array[obj_id, mark(1/0)]
        // const API_URL = 'http://localhost:8099/api/user/update/';

        // try {
        //   const response = await fetch(API_URL);
        //   const json = await response.json();
        //   console.log(json);
        //   setData(json);
        // } catch (error) {
        //   console.error(error);
        // } finally {
        //   setLoading(false);
        //   console.log("done");
        // }
        if(questionIndex == totalQuestion){
          if(data[questionIndex].answer==key){
            console.log("right");
  
            // alert(this.DATA[this.state.questionNumberIndex].answer);
            storingData.push({question_id:data[questionIndex]._id, 
                              point: 1,
                              answerTime:Date.now()
                            });
            setScore(oldScore + 1);
            setStoringData(storingData);
          }else{
            console.log("wrong");
            storingData.push({question_id:data[questionIndex]._id, 
                              point: 0, 
                              answerTime:Date.now()
                            });
  
            setStoringData(storingData);
  
          }
        }
        
        var result = updateUser("61e676a817b1701f87c00711",storingData, score,{navigation});
        result.then(function(){
          console.log("success")}
        ).catch(function(err){
          console.log("Fail:",err)}
        );

        
      
      }else{
        if(data[questionIndex].answer==key){
          console.log("right");

          // alert(this.DATA[this.state.questionNumberIndex].answer);
          storingData.push({question_id:data[questionIndex]._id, 
                            point: 1,
                            answerTime:Date.now()
                          });
          setScore(oldScore + 1);
          setQuestionIndex(oldQuestionIndex + 1);
          setStoringData(storingData);
        }else{
          console.log("wrong");
          storingData.push({question_id:data[questionIndex]._id, 
                            point: 0, 
                            answerTime:Date.now()
                          });

          setQuestionIndex(oldQuestionIndex + 1);
          setStoringData(storingData);

        }
        
      }
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

    const API_URL = 'http://localhost:8099/api/questions/find/difficulty/'+intDifficulty;
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
  
console.log('data',data[questionIndex]);
// console.log('index',questionIndex);
console.log("storingData: ",storingData);


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
  var usedIndex = [];

  return(
    <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>

        {isLoading?<ActivityIndicator/>:(
        <View>
          <Card borderRadius={SIZES.round}>
            <Text style={{alignSelf:"flex-end", fontSize:16}}>Score: {score} / 10</Text>
            <Text style={{fontWeight:"bold", alignSelf:"center", fontSize:24, paddingBottom:SIZES.padding}}>{questionIndex+1} / 10</Text>
            
            <Card.Divider />
            <Text style={{fontSize:16, alignSelf:"center", paddingBottom:10}}>Q: {data[questionIndex].question}</Text>
          
 {/* {this.DATA[this.state.questionNumberIndex].options.map((item,key) => (
             <Button title={item} onPress={()=>this.nextQuestion({item})}/>
           ))} */}

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
    <SafeAreaView style={{backgroundColor:COLORS.background, height:SIZES.height}}>
      <Button title="Easy"
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
          width: 'auto',
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
          width: 'auto',
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