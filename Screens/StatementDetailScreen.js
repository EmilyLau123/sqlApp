import React, { Component, useState } from 'react';
import {
  Card,
    Text,
    Image,
    Overlay
    } from 'react-native-elements';
import { SafeAreaView, ActivityIndicator, View, ScrollView, Modal } from 'react-native';
    //import{Stacks} from './SqlSectionList';
import { createStackNavigator } from '@react-navigation/stack';
import { SIZES,COLORS } from '../components/style/theme';
//image handling
import { SliderBox } from "react-native-image-slider-box";
import ImageViewer from 'react-native-image-zoom-viewer';
//description format
import { WebView } from 'react-native-webview';

const DetailStack = createStackNavigator();

const StatementDetailScreen = ({route}) => {  
  
  const { title, description } = route.params;
  const images = route.params.images;
  var imageName = [];
  var imageUrlForZoom = [];
  var [clickedIndex, setClickedIndex] = useState(0);
  var [imageOverlay, setImageOverlay] = useState(false);
  if(images){
    console.log("images: ", images);
    images.forEach(image=>{
      imageName.push("https://res.cloudinary.com/emilyfyp/image/upload/v1644909267/statements/"+image);
      imageUrlForZoom.push({url:"https://res.cloudinary.com/emilyfyp/image/upload/v1644909267/statements/"+image});
    });
    // console.log(imageName);
  }

  function toggleImageOverlay(status, clickedIndex){
    setImageOverlay(status);
    setClickedIndex(clickedIndex);
    console.log("status: ", status, "clickedIndex: ", clickedIndex);
    console.log("imageName:",imageName);
  }
    

   return (
    <SafeAreaView style={{ backgroundColor:COLORS.background, height:SIZES.height-SIZES.listPaddingBottom}}>
    <ScrollView>
      <Card containerStyle={{paddingBottom:20,marginBottom:30}}>
        <Card.Title style={{fontSize:20}}>{title}</Card.Title>
        <Card.Divider />
        {/* {images.map(image => {
                    console.log('image',image); */}
          {images.length!=0?(
                <View>
                 <SliderBox 
                    images={imageName}
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
                  <Card.Divider />

                  </View>
                ):(
                    <></>
                )}

    
       <Card.Title>Description</Card.Title>
      <Card.Divider />
      <View style= {{ height:580 }}>
      <WebView 
        style={{flex:1}}
        originWhitelist={['*']}
        source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-family: Optima">'+description+'</body></html>' }}
      />
      </View>
       {/* <Text style={{fontSize:16, paddingTop:5}}>{description}</Text> */}
      </Card>
      </ScrollView>
      <Overlay visible={imageOverlay} overlayStyle={{height:600, width:400}} onBackdropPress={()=>toggleImageOverlay(false)}>
        <ImageViewer imageUrls={imageUrlForZoom} index={clickedIndex} backgroundColor="gray" maxOverflow={200} enableSwipeDown onSwipeDown={() => toggleImageOverlay(false)}/>
      </Overlay>
    </SafeAreaView>
      );
 
}
export default StatementDetailScreen;