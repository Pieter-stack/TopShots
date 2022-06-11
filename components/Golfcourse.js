//Import Components
import react, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Button, Modal, Pressable, Alert } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import BottomSheet from './BottomSheet';
//Import fonts
import * as Font from 'expo-font';

//firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


//Import images

import ham from '../assets/images/hambr.png';
import {  Gesture, GestureDetector , GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';



//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//get fonts
Font.loadAsync({
  'Allan': require('../assets/fonts/Allan-Bold.ttf'),
  'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
});

//Content
export default function Golfcourse({ route, navigation }) {

  const { compitation, score } = route.params;

  console.log("route.params", route.params);

  const [modalVisible, setModalVisible] = useState(false);



  const translateY = useSharedValue(0);
  const context = useSharedValue({y:0});
  const gesture = Gesture.Pan().onStart(() =>{
    context.value = {y: translateY.value};
  }).onUpdate((event) =>{
   translateY.value = event.translationY + context.value.y;
   translateY.value = Math.max(translateY.value,-height*0.85)
   translateY.value = Math.min(translateY.value,-height/14)

  }).onEnd(() =>{
    if(translateY.value > -height/3 ){
      translateY.value = withSpring(-height/14, { damping:50})
    }else if(translateY.value < -height/1.5 ){
      translateY.value = withSpring(-height*0.85, { damping:50})
    }
  })
  
  const rBottomSheetStyle = useAnimatedStyle(() =>{
    const borderRadius = interpolate(translateY.value, [-height*0.85+50, -height*0.85], [25,5], Extrapolate.CLAMP)
    return{
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(()=> {
    translateY.value = withSpring(-height/6, { damping:50});

  },[]);



  //Content Render
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />

      <Text style={styles.heading}>{score?.title}</Text>
      <Text style={styles.venuetitle}>{score?.venue}</Text>
      <Text style={styles.heading}>{score?.uid}</Text>
      <TouchableOpacity style={styles.back} onPress={() => setModalVisible(true)}>
        <Image source={ham} style={{ marginTop: 11, alignSelf: 'center' }} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}

      >
        <View style={[styles.centeredView, { marginTop: Platform.OS === 'ios' ? height * 0.06 : height * 0.03 }]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{compitation?.name}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> 

<GestureDetector gesture={gesture}>
    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
      <View style ={styles.line}>
        
      </View>
      <View style={{backgroundColor:'red', width, height:500}}></View>
    </Animated.View>
    </GestureDetector>











     </View> 

    </GestureHandlerRootView>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginLeft: width * 0.8,
    marginTop: height * 0.075
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50

  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: height * 0.079,
    textAlign: "left",
    marginLeft: width * 0.10,
  },
  venuetitle: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "left",
    marginLeft: width * 0.10,
  },
  bottomSheetContainer:{
    width,
     height, 
     backgroundColor:'white',
      position:'absolute', 
      top:height,
      borderRadius:25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
  },
  line:{
   width: 75,
   height:5,
   borderRadius:10,
   backgroundColor:'grey',
   alignSelf:'center',
   marginVertical:15
  
  }




});
