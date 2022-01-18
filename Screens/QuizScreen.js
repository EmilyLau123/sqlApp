//import { createStackNavigator } from '@react-navigation/stack';
import React, { Component,useState, useEffect } from 'react';
import {
    Text,
    Image,
    
    Button
    } from 'react-native-elements'; 
import { SectionList, FlatList,View, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';

function congratScreen({route}){
  const {score} = route.params;
  return(
    <View>
      <Text>Score: {score}</Text>
      <Button title="Back to Home" />
    </View>
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
function Quiz({route}){
  //   var totalQuestion = 9;
  //   var modelAnswer=DATA[0].answer;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestion = 9;
  const difficulty = route.params.difficulty;

  const nextQuestion = (key) => {
      if(questionIndex >= totalQuestion){
        alert("end");
      }else{
        if(data[questionIndex].answer==key){
          // alert(this.DATA[this.state.questionNumberIndex].answer);
          var oldScore = score;
          var oldQuestionIndex = questionIndex;
          setScore(oldScore + 1);
          setQuestionIndex(oldQuestionIndex + 1);

            
          
        }else{
          setQuestionIndex(oldQuestionIndex + 1);

        }
        
      }
    }

  const getQuestions = async () => {
    //https://reactnative.dev/movies.json
    //http://localhost:8099/api/retrieveStatements/
    const API_URL = 'http://localhost:8099/api/retrieveQuestions/';

    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log("done");
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);
console.log(data);
  return(
    <View>
        {isLoading?<ActivityIndicator/>:(
          <View>
            <Text>{questionIndex+1} / 10</Text>
         <Text>Score: {score} / 10</Text>

        <Divider></Divider>
         <Text>Q: {data[questionIndex].question}</Text>

 {/* {this.DATA[this.state.questionNumberIndex].options.map((item,key) => (
             <Button title={item} onPress={()=>this.nextQuestion({item})}/>
           ))} */}

         <Button title={data[questionIndex].options[0]} onPress={()=>nextQuestion(0)}/>
         <Button title={data[questionIndex].options[1]} onPress={()=>nextQuestion(1)}/>
         <Button title={data[questionIndex].options[2]} onPress={()=>nextQuestion(2)}/>
         <Button title={data[questionIndex].options[3]} onPress={()=>nextQuestion(3)}/>

          </View>
         
      
        )}
      </View>
  );

}

        
function quizChooseScreen({navigation}){
  return(
    <View>
      <Button title="Easy" onPress={()=>navigation.navigate("Quiz",{
        difficulty:'Easy'
      })}/>
      <Button title="Medium" onPress={()=>navigation.navigate("Quiz",{
        difficulty:'Medium'
      })}/>
      <Button title="Hard" onPress={()=>navigation.navigate("Quiz",{
        difficulty:'Hard'
      })}/>
    </View>
  );
}

const QuizStack = createStackNavigator();


export function QuizScreen(){
    return (
      // <QuizStack.Navigator>
      //   <QuizStack.Screen name="Easy" component={Quiz} 
      //     // initialParams={{DATA:{questions: ['Q1','Q2','Q3'],
      //     // difficulty: 'Easy',
      //     // answer:1,
      //     // options:['option A', 'option B', 'option C', 'option D'],
      //     // images: '',
      //     // author: 'Admin'}}}
      //    optios={{title:"Home"}}/>
      //   <QuizStack.Screen name="Medium" component={Quiz} optios={{title:"Daily Knowledge"}}/>
      //   <QuizStack.Screen name="Hard" component={Quiz} optios={{title:"Quiz"}}/>
  
      // </QuizStack.Navigator>
      <QuizStack.Navigator>
        <QuizStack.Screen name="Choose" component={quizChooseScreen} options={{title:"Choose"}}/>
        <QuizStack.Screen name="Quiz" component={Quiz} options={{title:"Quiz"}}/>
      </QuizStack.Navigator>
      // </QuizStack.Navigator>
      // <View>
      //   <Button title="Easy" />
      //   <Button title="Medium" />
      //   <Button title="Hard" />
      // </View>
    );
}