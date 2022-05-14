import React, {Component, useState, useEffect} from 'react';
import { Alert,TouchableOpacity, View, StyleSheet, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import {  Text, Button, Card, ListItem, Icon, ListItemProps } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, ICONS, STRINGS, USER_ROLE, USER_STATUS,REQUEST_STATUS} from '../../components/style/theme';
import { SliderBox } from "react-native-image-slider-box";

export function HistoryFullList({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const userId = useSelector(state => state.userIdReducer.user_id);

  const getHistories = async (userId) => {
    const API_URL = 'https://mufyptest.herokuapp.com/api/user/questions/find/';
  console.log('try');
    try {
      console.log('fetch');
        const response = await fetch(API_URL,{
            method:"POST",
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
            body: JSON.stringify({
                userId: userId,
            }),
                
        });
          const json = await response.json();

         if(response.status == 200){
           
            setData(json);
            setLoading(false);
            
         }else{
           console.log("error");
         }
    }catch(error){
      console.log(error);
    }finally{
      console.log("user history found");
    }
  }

 useEffect(() => {
  getHistories(userId);
 }, []);

//  const searchButton = (searchText) => {
//     setLoading(true);
//    setSearch(searchText);
//    getHistories(searchText);
// //    console.log(search);
//  }

const renderItem = ({ item }) => {
  //status from int to string
    var iconName = ICONS.approved;
    var status = item.status;
    var statusString  = "Approved";
    if(status == REQUEST_STATUS.rejected){
        iconName = ICONS.rejected;
        statusString  = "Rejected";
    }else if(status == REQUEST_STATUS.waiting){
        iconName = ICONS.waiting;
        statusString  = "Waiting";
    }
//diff from int to string
    var difficulty = item.difficulty;
    var difficultyString  = "Hard";
    if(difficulty == 0){
        difficultyString  = "Easy";
    }else if(difficulty == 1){
        difficultyString  = "Medium";
    }
        
return(
    <TouchableOpacity onPress={()=>navigation.navigate("SubmitHistoryDetail",{
        question: item.question,
        difficulty: difficultyString,
        answer: item.answer,
        options: item.options,
        images: item.images,
        submitted_at:item.submitted_at,
        updated_at:item.updated_at,
        iconName : iconName,
        statusString: statusString

        

      })}>
        <ListItem>
        <Ionicons name={iconName} size={SIZES.icon} />
        <ListItem.Content>
        <Text>question: {item.question}</Text>
        <Text>Submitted_at: {item.submitted_at}</Text>
        </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
    
    );
 }
   

    return(
      <SafeAreaView>
       
        {isLoading?<ActivityIndicator/>:(
          
        <View style={{paddingBottom:SIZES.listPaddingBottom}}>
          <FlatList
            data={data}
            renderItem= {renderItem}
            keyExtractor={item => item._id}
            onRefresh={() => getHistories(userId)}
            refreshing={isLoading}
            height={SIZES.height-150}
            
          /> 
        
          </View>
          )}
      </SafeAreaView>
      
  );
}


//Detail page
export function HistoryFullDetail({route,navigation}){
  const { question,difficulty, iconName, answer, options, statusString,updated_at, submitted_at } = route.params;
  const images = route.params.images;
  var imagesLength = 0;
  if(images){
    console.log('images: ',images);
    imagesLength = images.length;
    var imageName = [];
    console.log(images);
    images.forEach(image=>{
        imageName.push("https://res.cloudinary.com/emilyfyp/image/upload/v1644578522/questions/"+image);
    });
}
  return(
   <SafeAreaView style={{flex:1,backgroundColor:COLORS.background}}>
    <Card borderRadius={SIZES.round}>
        <Ionicons name={iconName} size={SIZES.icon} />
        <Text style={{padding:SIZES.padding, fontSize:SIZES.text}}>Status: {statusString}</Text>
        <Text style={{padding:SIZES.padding}}>Question: {question}</Text>
        <Text style={{padding:SIZES.padding}}>Difficulty: {difficulty}</Text>
        <Text style={{padding:SIZES.padding}}>Answer: </Text>
        <View  style={{padding:SIZES.padding, borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primary,
                marginBottom:SIZES.margin}}>
                <Text style={{fontWeight:"bold",color:"white"}}>{options[answer]}</Text>
            </View>
        <Text style={{padding:SIZES.padding}}>Options: </Text>

        {options.map((item,index) => (
            
            <View  style={{padding:SIZES.padding, borderRadius: 10,
                borderWidth: 2,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primary,
                marginBottom:SIZES.margin}}>
                <Text style={{fontWeight:"bold",color:"white"}}>{index+1}. {item}</Text>
            </View>
        ))}
        <Text>Images: </Text>
        {images?(
          <SliderBox 
            images={imageName}
            sliderBoxHeight={250}
            dotColor="#FFFFFF"
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
          />
          ):(
            <Text style={{padding:SIZES.padding}}>No images being uploaded in this question</Text>
          )}
        
        <Text style={{padding:SIZES.padding}}>Submitted At: {submitted_at}</Text>
        <Text style={{padding:SIZES.padding}}>Updated At: {updated_at}</Text>

    </Card>
  </SafeAreaView>
  );
}


