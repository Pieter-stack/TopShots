//Import Components
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Button, Modal, Pressable, Alert } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import { useFocusEffect } from "@react-navigation/native";

//firebase
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';

//import images
import arrow from '../assets/images/blackarrow.png'
import greenflag from '../assets/images/greenflag.png';
import ham from '../assets/images/hambr.png';

//Import animation
import {  Gesture, GestureDetector , GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { getCourse } from '../Database';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//Content
export default function Golfcourse({ route, navigation }) {

  //get data from route.paramaters
  const { competition, score } = route.params;
  //set variables for db calls
  const venue = competition?.venue;
  const [course, setCourse]= useState([]);

  useFocusEffect(
    React.useCallback(() => {
        //real time db calls
        const collectionRef = query(collection(db, "golfcourses"), where("venue", "==",venue));
        //snapshot listeners
        const unsubscribe = onSnapshot(collectionRef, (snapshot) =>{
          let courseData = []
            //loop through data and set useState and push to array
            snapshot.forEach((doc) =>{   
              let course ={
                  ...doc.data(),
                  id: doc.id
              }
            courseData.push(course) 
        })
          setCourse(courseData);
        })

        return () =>
        {
          unsubscribe();
        };     
    },[])   
);

//visibility of popup model 
  const [modalVisible, setModalVisible] = useState(false);
  //bottom drawer animation
  const translateY = useSharedValue(0);
  const context = useSharedValue({y:0});
  const gesture = Gesture.Pan().onStart(() =>{
    context.value = {y: translateY.value};
  }).onUpdate((event) =>{
   translateY.value = event.translationY + context.value.y;
   translateY.value = Math.max(translateY.value,-height*0.85)
   translateY.value = Math.min(translateY.value,-height/16)
  }).onEnd(() =>{
    if(translateY.value > -height/3 ){
      translateY.value = withSpring(-height/16, { damping:50})
    }else if(translateY.value < -height/1.5 ){
      translateY.value = withSpring(-height*0.85, { damping:50})
    }
  })
  //smooth animation for bottom drawer
  const rBottomSheetStyle = useAnimatedStyle(() =>{
    const borderRadius = interpolate(translateY.value, [-height*0.85+50, -height*0.85], [25,5], Extrapolate.CLAMP)
    return{
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });
  //get bottom drawer location and add animation
  useEffect(()=> {
    translateY.value = withSpring(-height/6, { damping:50});
  },[]);

  //useStates for golf course holes
  const [hole1, setHole1]= useState(score?.hole1);
  const [hole2, setHole2]= useState(score?.hole2);
  const [hole3, setHole3]= useState(score?.hole3);
  const [hole4, setHole4]= useState(score?.hole4);
  const [hole5, setHole5]= useState(score?.hole5);
  const [hole6, setHole6]= useState(score?.hole6);
  const [hole7, setHole7]= useState(score?.hole7);
  const [hole8, setHole8]= useState(score?.hole8);
  const [hole9, setHole9]= useState(score?.hole9);
  const [hole10, setHole10]= useState(score?.hole10);
  const [hole11, setHole11]= useState(score?.hole11);
  const [hole12, setHole12]= useState(score?.hole12);
  const [hole13, setHole13]= useState(score?.hole13);
  const [hole14, setHole14]= useState(score?.hole14);
  const [hole15, setHole15]= useState(score?.hole15);
  const [hole16, setHole16]= useState(score?.hole16);
  const [hole17, setHole17]= useState(score?.hole17);
  const [hole18, setHole18]= useState(score?.hole18);
  const [complete, setComplete]= useState(false);

  //input states for holes
  const [hole1input, setHole1Input]= useState(0);
  const [hole2input, setHole2Input]= useState(0);
  const [hole3input, setHole3Input]= useState(0);
  const [hole4input, setHole4Input]= useState(0);
  const [hole5input, setHole5Input]= useState(0);
  const [hole6input, setHole6Input]= useState(0);
  const [hole7input, setHole7Input]= useState(0);
  const [hole8input, setHole8Input]= useState(0);
  const [hole9input, setHole9Input]= useState(0);
  const [hole10input, setHole10Input]= useState(0);
  const [hole11input, setHole11Input]= useState(0);
  const [hole12input, setHole12Input]= useState(0);
  const [hole13input, setHole13Input]= useState(0);
  const [hole14input, setHole14Input]= useState(0);
  const [hole15input, setHole15Input]= useState(0);
  const [hole16input, setHole16Input]= useState(0);
  const [hole17input, setHole17Input]= useState(0);
  const [hole18input, setHole18Input]= useState(0);

  //set finalscore variable
  const [finalscore, setFinalscore]= useState(
    parseInt(score?.hole1)+
    parseInt(score?.hole2)+
    parseInt(score?.hole3)+
    parseInt(score?.hole4)+
    parseInt(score?.hole5)+
    parseInt(score?.hole6)+
    parseInt(score?.hole7)+
    parseInt(score?.hole8)+
    parseInt(score?.hole9)+
    parseInt(score?.hole10)+
    parseInt(score?.hole11)+
    parseInt(score?.hole12)+
    parseInt(score?.hole13)+
    parseInt(score?.hole14)+
    parseInt(score?.hole15)+
    parseInt(score?.hole16)+
    parseInt(score?.hole17)+
    parseInt(score?.hole18)); 

//get const of scorecard id
const scorecardid = score?.scorecardid;
//get const of competition id
const id =competition?.id;

  //function for hole1
  const handleHole1 = () => {
    setHole1(hole1input)
    setFinalscore(parseInt(finalscore) + parseInt(hole1input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole1:parseInt(hole1input)}, { merge: true });
  }
  //function for hole2
  const handleHole2 = () => {
    setHole2(hole2input)
    setFinalscore(parseInt(finalscore) + parseInt(hole2input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole2:parseInt(hole2input)}, { merge: true });
  }
  //function for hole3
  const handleHole3 = () => {
    setHole3(hole3input)
    setFinalscore(parseInt(finalscore) + parseInt(hole3input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole3:parseInt(hole3input)}, { merge: true });
  }
  //function for hole4
  const handleHole4 = () => {
    setHole4(hole4input)
    setFinalscore(parseInt(finalscore) + parseInt(hole4input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole4:parseInt(hole4input)}, { merge: true });
  }
  //function for hole5
  const handleHole5 = () => {
    setHole5(hole5input)
    setFinalscore(parseInt(finalscore) + parseInt(hole5input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole5:parseInt(hole5input)}, { merge: true });
  }
  //function for hole6
  const handleHole6 = () => {
    setHole6(hole6input)
    setFinalscore(parseInt(finalscore) + parseInt(hole6input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole6:parseInt(hole6input)}, { merge: true });
  } 
    //function for hole7
  const handleHole7 = () => {
    setHole7(hole7input)
    setFinalscore(parseInt(finalscore) + parseInt(hole7input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole7:parseInt(hole7input)}, { merge: true });
  }
  //function for hole8
  const handleHole8 = () => {
    setHole8(hole8input)
    setFinalscore(parseInt(finalscore) + parseInt(hole8input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole8:parseInt(hole8input)}, { merge: true });
  }  
  //function for hole9 and if statement to check amout of holes
  const handleHole9 = () => {
    setHole9(hole9input)

    if(competition?.hole == 9){
      setComplete(true); 
    }else if(competition?.hole == 18){
      setComplete(false); 
    }
    setFinalscore(parseInt(finalscore) + parseInt(hole9input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole9:parseInt(hole9input)}, { merge: true });
  }
  //function for hole10
  const handleHole10 = () => {
    setHole10(hole10input)
    setFinalscore(parseInt(finalscore) + parseInt(hole10input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole10:parseInt(hole10input)}, { merge: true });
  }
  //function for hole11
  const handleHole11 = () => {
    setHole11(hole11input)
    setFinalscore(parseInt(finalscore) + parseInt(hole11input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole11:parseInt(hole11input)}, { merge: true });
  }
  //function for hole12
  const handleHole12 = () => {
    setHole12(hole12input)
    setFinalscore(parseInt(finalscore) + parseInt(hole12input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole12:parseInt(hole12input)}, { merge: true });
  }
  //function for hole13
  const handleHole13 = () => {
    setHole13(hole13input)
    setFinalscore(parseInt(finalscore) + parseInt(hole13input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole13:parseInt(hole13input)}, { merge: true });
  }
  //function for hole14
  const handleHole14 = () => {
    setHole14(hole14input)
    setFinalscore(parseInt(finalscore) + parseInt(hole14input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole14:parseInt(hole14input)}, { merge: true });
  }
  //function for hole15
  const handleHole15 = () => {
    setHole15(hole15input)
    setFinalscore(parseInt(finalscore) + parseInt(hole15input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole15:parseInt(hole15input)}, { merge: true });
  }
  //function for hole16
  const handleHole16 = () => {
    setHole16(hole16input)
    setFinalscore(parseInt(finalscore) + parseInt(hole16input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole16:parseInt(hole16input)}, { merge: true });
  }
  //function for hole17
  const handleHole17 = () => {
    setHole17(hole17input)
    setFinalscore(parseInt(finalscore) + parseInt(hole17input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole17:parseInt(hole17input)}, { merge: true });
  }
  //function for hole18
  const handleHole18 = () => {
    setHole18(hole18input)
    setComplete(true);
    setFinalscore(parseInt(finalscore) + parseInt(hole18input))
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {hole18:parseInt(hole18input)}, { merge: true });
  }
  //function for submitting finalscore
  const handleSubmit = () => {
    navigation.pop();
    const colRef= doc(db, 'competitions',id,'scorecard',scorecardid);
    return updateDoc(colRef, {finalscore:parseInt(finalscore)}, { merge: true });
  }

  //Content Render
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
        <Text style={styles.heading}>{competition?.title}</Text>
        <Text style={styles.venuetitle}>{competition?.venue}</Text>
        <TouchableOpacity style={styles.back} onPress={() => setModalVisible(true)}>
          <Image source={ham} style={{ marginTop: 11, alignSelf: 'center' }} />
        </TouchableOpacity>
{complete == false ?(
  <>
    <View style={styles.shadow}>
      <BlurView
        style={styles.blurblock}
        tint="light"
        intensity={40}
        reducedTransparencyFallbackColor="white"
      > 
{Platform.OS === 'ios' ?
  <View style={{flexDirection:'row' }}>
  <View style={{flexDirection:'column' }}>
{score?.hole1 == 0 && hole1 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole1Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole1Stroke}</Text>
  </>
):(score?.hole2 == 0 && hole2 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole2Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole2Stroke}</Text>
  </>
):(score?.hole3 == 0 && hole3 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole3Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole3Stroke}</Text>
  </>
):(score?.hole4 == 0 && hole4 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole4Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0].Hole4Stroke}</Text>
  </>
):(score?.hole5 == 0 && hole5 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole5Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole5Stroke}</Text>
  </>
):(score?.hole6 == 0 && hole6 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole6Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole6Stroke}</Text>
  </>
):(score?.hole7 == 0 && hole7 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole7Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole7Stroke}</Text>
  </>
):(score?.hole8 == 0 && hole8 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole8Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole8Stroke}</Text>
  </>
):(score?.hole9 == 0 && hole9 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole9Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole9Stroke}</Text>
  </>
):(score?.hole10 == 0 && hole10 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole10Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole10Stroke}</Text>
  </>
):(score?.hole11 == 0 && hole11 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole11Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole11Stroke}</Text>
  </>
):(score?.hole12 == 0 && hole12 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole12Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole12Stroke}</Text>
  </>
):(score?.hole13 == 0 && hole13 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole13Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole13Stroke}</Text>
  </>
):(score?.hole14 == 0 && hole14 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole14Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole14Stroke}</Text>
  </>
):(score?.hole15 == 0 && hole15 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole15Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole15Stroke}</Text>
  </>
):(score?.hole16 == 0 && hole16 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole16Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole16Stroke}</Text>
  </>
):(score?.hole17 == 0 && hole17 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole17Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole17Stroke}</Text>
  </>
):(score?.hole18 == 0 && hole18 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole18Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole18Stroke}</Text>
  </>
):(
  <>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20, marginTop:10}}>{course[0]?.Hole18Par}</Text>
    <Text style={{fontWeight:'800', fontSize:36, marginLeft:20}}>{course[0]?.Hole18Stroke}</Text>
  </>
))))))))))))))))))}
  </View>
    <View  style={{flexDirection:'column' }}>
      <Text  style={{fontWeight:'300', fontSize:30, marginLeft:10, marginTop:15}}>Par</Text>
      <Text  style={{fontWeight:'300', fontSize:30, marginLeft:10, marginTop:8}}>Stroke</Text>
    </View>
  </View> 
:
  <View style={{flexDirection:'row' }}>
  <View style={{flexDirection:'column' }}>
{score?.hole1 == 0 && hole1 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole1Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole1Stroke}</Text>
  </>
):(score?.hole2 == 0 && hole2 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole2Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole2Stroke}</Text>
  </>
):(score?.hole3 == 0 && hole3 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole3Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole3Stroke}</Text>
  </>
):(score?.hole4 == 0 && hole4 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole4Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0].Hole4Stroke}</Text>
  </>
):(score?.hole5 == 0 && hole5 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole5Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole5Stroke}</Text>
  </>
):(score?.hole6 == 0 && hole6 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole6Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole6Stroke}</Text>
  </>
):(score?.hole7 == 0 && hole7 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole7Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole7Stroke}</Text>
  </>
):(score?.hole8 == 0 && hole8 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole8Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole8Stroke}</Text>
  </>
):(score?.hole9 == 0 && hole9 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole9Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole9Stroke}</Text>
  </>
):(score?.hole10 == 0 && hole10 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole10Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole10Stroke}</Text>
  </>
):(score?.hole11 == 0 && hole11 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole11Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole11Stroke}</Text>
  </>
):(score?.hole12 == 0 && hole12 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole12Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole12Stroke}</Text>
  </>
):(score?.hole13 == 0 && hole13 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole13Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole13Stroke}</Text>
  </>
):(score?.hole14 == 0 && hole14 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole14Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole14Stroke}</Text>
  </>
):(score?.hole15 == 0 && hole15 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole15Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole15Stroke}</Text>
  </>
):(score?.hole16 == 0 && hole16 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole16Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole16Stroke}</Text>
  </>
):(score?.hole17 == 0 && hole17 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole17Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole17Stroke}</Text>
  </>
):(score?.hole18 == 0 && hole18 == 0 ?(
  <>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20, marginTop:15}}>{course[0]?.Hole18Par}</Text>
    <Text style={{fontWeight:'800', fontSize:30, marginLeft:20}}>{course[0]?.Hole18Stroke}</Text>
  </>
):(
  <>
  </>
))))))))))))))))))}
  </View>
    <View  style={{flexDirection:'column' }}>
      <Text  style={{fontWeight:'300', fontSize:26, marginLeft:10, marginTop:17}}>Par</Text>
      <Text  style={{fontWeight:'300', fontSize:26, marginLeft:10, marginTop:8}}>Stroke</Text>
    </View>
  </View>
}
    </BlurView>
  </View>
  </>
):(
  <>
  </>
)}
{complete == false ?(
  <>
{score?.hole1 == 0 && hole1 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole1Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10 }}/>
  </>
):(score?.hole2 == 0 && hole2 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole2Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole3 == 0 && hole3 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole3Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole4 == 0 && hole4 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole4Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole5 == 0 && hole5 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole5Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole6 == 0 && hole6 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole6Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole7 == 0 && hole7 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole7Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole8 == 0 && hole8 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole8Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole9 == 0 && hole9 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole9Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole10 == 0 && hole10 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole10Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole11 == 0 && hole11 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole11Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole12 == 0 && hole12 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole12Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>      
  </>
):(score?.hole13 == 0 && hole13 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole13Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole14 == 0 && hole14 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole14Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole15 == 0 && hole15 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole15Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole16 == 0 && hole16 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole16Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole17 == 0 && hole17 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole17Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(score?.hole18 == 0 && hole18 == 0 ?(
  <>
    <Image source={{uri: course[0]?.Hole18Image}} resizeMode={'contain'} style={{height:height*0.65, width:width*0.68, bottom:height/5,position:'absolute', right:10}}/>
  </>
):(
  <>
  </>
))))))))))))))))))}
  </>
):(
  <>
    <Image source={{uri: course[0]?.Layout}} resizeMode={'contain'} style={{height:height*0.50, width:width, bottom:height/3,position:'absolute'}}/>
    <Text  style={{fontWeight:'600', fontSize:26, marginLeft:10, marginTop:8, alignSelf:'center', marginTop:height*0.50}}>Thank you for playing</Text>
    <Text  style={{fontWeight:'300', fontSize:16, marginLeft:10, marginTop:8, alignSelf:'center', marginTop:10}}>{competition?.venue}</Text>
  </>
)}
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
{Platform.OS === 'ios' ?
  <>
    <TouchableOpacity style={{marginTop:-5}} onPress={() => navigation.pop()} >
      <View style={{flexDirection:'row'}}>
        <Image source={arrow} resizeMode={'contain'} style={{width:15, height:15, marginRight:10, marginTop:1}}/>
        <Text style={styles.modalText}>Leaderboard</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('Homepage')}>
      <View style={{flexDirection:'row', marginRight:41}}>
        <Image source={arrow} resizeMode={'contain'} style={{width:15, height:15, marginRight:10, marginTop:1}}/>
        <Text style={styles.modalText}>Home</Text>
      </View>
    </TouchableOpacity>
  </>
: 
  <>
    <TouchableOpacity style={{marginTop:-5}} onPress={() => navigation.pop()} >
      <View style={{flexDirection:'row'}}>
        <Image source={arrow} resizeMode={'contain'} style={{width:15, height:15, marginRight:10, marginTop:3}}/>
          <Text style={styles.modalText}>Leaderboard</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('Homepage')}>
      <View style={{flexDirection:'row', marginRight:41}}>
        <Image source={arrow} resizeMode={'contain'} style={{width:15, height:15, marginRight:10, marginTop:3}}/>
        <Text style={styles.modalText}>Home</Text>
      </View>
    </TouchableOpacity>
  </>
}
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
      </View>
    </View>
  </Modal>  
<GestureDetector gesture={gesture}>
  <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
    <View style ={styles.line}>
      </View>
{Platform.OS === 'ios' ?
  <>
    <View style={{ width, height:120, flexDirection:'row'}}>
{complete == false?(
  <>
    <Image source={greenflag} resizeMode={'contain'} style={{marginTop:35, marginLeft:20 }}/>
  </>
):(
  <>
  </>
)}
{score?.hole1 == 0 && hole1 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 1</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }   
      value={hole1input}
      onChangeText={setHole1Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole1}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole1Distance}m</Text>
  </>
):(score?.hole2 == 0 && hole2 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 2</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      returnKeyType={ 'done' }
      value={hole2input}
      onChangeText={setHole2Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole2}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole2Distance}m</Text>
  </>
):(score?.hole3 == 0 && hole3 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 3</Text>
    <TextInput
      selectionColor={'#064635'}
      returnKeyType={ 'done' }
      keyboardType='number-pad'   
      value={hole3input}
      onChangeText={setHole3Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole3}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole3Distance}m</Text>
  </>
):(score?.hole4 == 0 && hole4 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 4</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }   
      value={hole4input}
      onChangeText={setHole4Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole4}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole4Distance}m</Text>
  </>
):(score?.hole5 == 0 && hole5 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 5</Text>
    <TextInput
      selectionColor={'#064635'}  
      keyboardType='number-pad'
      returnKeyType={ 'done' } 
      value={hole5input}
      onChangeText={setHole5Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn }onPress={handleHole5}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole5Distance}m</Text>
  </>
):(score?.hole6 == 0 && hole6 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 6</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }   
      value={hole6input}
      onChangeText={setHole6Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole6}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole6Distance}m</Text>
  </>
):(score?.hole7 == 0 && hole7 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 7</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      returnKeyType={ 'done' }
      value={hole7input}
      onChangeText={setHole7Input}
      style={styles.input}
    />
      <TouchableOpacity style={styles.inputbtn} onPress={handleHole7}>
          <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
      </TouchableOpacity>
      <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole7Distance}m</Text>
  </>
):(score?.hole8 == 0 && hole8 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 8</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }   
      value={hole8input}
      onChangeText={setHole8Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole8}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole8Distance}m</Text>
  </>
):(score?.hole9 == 0 && hole9 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 9</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }  
      value={hole9input}
      onChangeText={setHole9Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole9}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole9Distance}m</Text>
  </>
):(score?.hole10 == 0 && hole10 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 10</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      returnKeyType={ 'done' }
      value={hole10input}
      onChangeText={setHole10Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole10}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole10Distance}m</Text>
  </>
):(score?.hole11 == 0 && hole11 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 11</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad' 
      returnKeyType={ 'done' } 
      value={hole11input}
      onChangeText={setHole11Input}
      style={styles.input}
    />
      <TouchableOpacity style={styles.inputbtn} onPress={handleHole11}>
          <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
      </TouchableOpacity>
      <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole11Distance}m</Text>
  </>
):(score?.hole12 == 0 && hole12 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 12</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'  
      returnKeyType={ 'done' } 
      value={hole12input}
      onChangeText={setHole12Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole12}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole12Distance}m</Text>
  </>
):(score?.hole13 == 0 && hole13 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 13</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }   
      value={hole13input}
      onChangeText={setHole13Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole13}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole13Distance}m</Text>
  </>
):(score?.hole14 == 0 && hole14 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 14</Text>
    <TextInput
      selectionColor={'#064635'}   
      keyboardType='number-pad'
      returnKeyType={ 'done' }
      value={hole14input}
      onChangeText={setHole14Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole14}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole14Distance}m</Text>
  </>
):(score?.hole15 == 0 && hole15 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 15</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'
      returnKeyType={ 'done' }   
      value={hole15input}
      onChangeText={setHole15Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole15}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole15Distance}m</Text>
  </>
):(score?.hole16 == 0 && hole16 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 16</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'  
      returnKeyType={ 'done' }
      value={hole16input}
      onChangeText={setHole16Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole16}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole16Distance}m</Text>
  </>
):(score?.hole17 == 0 && hole17 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 17</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad' 
      returnKeyType={ 'done' }  
      value={hole17input}
      onChangeText={setHole17Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole17}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole17Distance}m</Text>
  </>
):(score?.hole18 == 0 && hole18 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36,marginTop:30, marginLeft:10}}>Hole 18</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad' 
      returnKeyType={ 'done' }  
      value={hole18input}
      onChangeText={setHole18Input}
      style={styles.input}
    />
    <TouchableOpacity style={styles.inputbtn} onPress={handleHole18}>
        <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:70, fontWeight:'300'}}>{course[0]?.Hole18Distance}m</Text>
  </>
):(
  <>
    <TouchableOpacity style={styles.inputbtnsubmit} onPress={handleSubmit}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Submit Score</Text>
    </TouchableOpacity>
  </>
))))))))))))))))))}
    </View>
  </>
:
  <View style={{ width, height:130, flexDirection:'row'}}>
{complete == false ?(
  <>
    <Image source={greenflag} resizeMode={'contain'} style={{marginTop:10, marginLeft:20 }}/>
  </>
):(
  <>
  </>
)}
{score?.hole1 == 0 && hole1 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 1</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole1input}
      onChangeText={setHole1Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole1}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole1Distance}m</Text>
  </>
):(score?.hole2 == 0 && hole2 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 2</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole2input}
      onChangeText={setHole2Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole2}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole2Distance}m</Text>
  </>
):(score?.hole3 == 0 && hole3 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 3</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole3input}
      onChangeText={setHole3Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole3}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole3Distance}m</Text>
  </>
):(score?.hole4 == 0 && hole4 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 4</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole4input}
      onChangeText={setHole4Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole4}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole4Distance}m</Text>
  </>
):(score?.hole5 == 0 && hole5 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 5</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole5input}
      onChangeText={setHole5Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole5}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole5Distance}m</Text>
  </>
):(score?.hole6 == 0 && hole6 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 6</Text>
    <TextInput
      selectionColor={'#064635'}   
      keyboardType='number-pad'
      value={hole6input}
      onChangeText={setHole6Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole6}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole6Distance}m</Text>
  </>
):(score?.hole7 == 0 && hole7 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 7</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad' 
      value={hole7input}
      onChangeText={setHole7Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole7}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole7Distance}m</Text>
  </>
):(score?.hole8 == 0 && hole8 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 8</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole8input}
      onChangeText={setHole8Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole8}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole8Distance}m</Text>
  </>
):(score?.hole9 == 0 && hole9 == 0 ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 9</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'   
      value={hole9input}
      onChangeText={setHole9Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole9}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole9Distance}m</Text>
  </>
):(score?.hole10 == 0 && hole10 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 10</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'   
      value={hole10input}
      onChangeText={setHole10Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole10}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole10Distance}m</Text>
  </>
):(score?.hole11 == 0 && hole11 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 11</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole11input}
      onChangeText={setHole11Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole11}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole11Distance}m</Text>
  </>
):(score?.hole12 == 0 && hole12 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 12</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole12input}
      onChangeText={setHole12Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole12}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole12Distance}m</Text>
  </>
):(score?.hole13 == 0 && hole13 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 13</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole13input}
      onChangeText={setHole13Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole13}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole13Distance}m</Text>
  </>
):(score?.hole14 == 0 && hole14 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 14</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole14input}
      onChangeText={setHole14Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole14}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole14Distance}m</Text>
  </>
):(score?.hole15 == 0 && hole15 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 15</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole15input}
      onChangeText={setHole15Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole15}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole15Distance}m</Text>
  </>
):(score?.hole16 == 0 && hole16 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 16</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole16input}
      onChangeText={setHole16Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole16}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole16Distance}m</Text>
  </>
):(score?.hole17 == 0 && hole17 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 17</Text>
    <TextInput
      selectionColor={'#064635'} 
      keyboardType='number-pad'  
      value={hole17input}
      onChangeText={setHole17Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole17}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole17Distance}m</Text>
  </>
):(score?.hole18 == 0 && hole18 == 0 && complete == false ?(
  <>
    <Text style={{fontWeight:'bold', fontSize:36, marginLeft:10}}>Hole 18</Text>
    <TextInput
      selectionColor={'#064635'}
      keyboardType='number-pad'   
      value={hole18input}
      onChangeText={setHole18Input}
      style={styles.inputA}
    />
    <TouchableOpacity style={styles.inputbtnA} onPress={handleHole18}>
      <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Input Score</Text>
    </TouchableOpacity>
    <Text style={{fontSize:12, position:'absolute', left:55, top:40, fontWeight:'300'}}>{course[0]?.Hole18Distance}m</Text>
  </>
):(
  <>
  <TouchableOpacity style={styles.inputbtnsubmitA} onPress={handleSubmit}>
    <Text style={{color:'#fff', textAlign:'center',marginTop:15, fontFamily:'Allan', fontSize:16}}>Submit Score</Text>
  </TouchableOpacity>
  </>
))))))))))))))))))}
  </View>
}
  <View style={{width, height:550}}>
    <View style={{width:'100%', height:2, backgroundColor:'#d3d3d3', marginTop:25}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>Hole:</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>Stroke:</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>Par:</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>Distance:</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>Score:</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>1</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole1Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole1Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole1Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole1}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>2</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole2Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole2Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole2Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole2}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>3</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole3Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole3Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole3Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole3}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>4</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole4Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole4Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole4Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole4}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>5</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole5Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole5Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole5Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole5}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>6</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole6Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole6Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole6Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole6}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>7</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole7Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole7Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole7Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole7}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>8</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole8Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole8Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole8Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole8}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>9</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole9Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole9Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole9Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole9}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>10</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole10Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole10Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole10Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole10}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>11</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole11Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole11Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole11Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole11}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>12</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole12Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole12Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole12Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole12}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>13</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole13Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole13Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole13Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole13}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>14</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole14Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole14Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole14Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole14}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>15</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole15Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole15Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole15Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole15}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>16</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole16Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole16Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole16Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole16}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>17</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole17Stroke}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole17Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole17Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole17}</Text>
      </View>
    </View>
    <View style={{width:'90%', height:2, backgroundColor:'#d3d3d3', marginTop:2, marginLeft:20}}></View>
    <View style={{flexDirection:'row', justifyContent:'space-around', width:'90%'}}>
      <View  style={{  marginTop:2, marginLeft:10}}>
      <Text>18</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole18Stroke}</Text> 
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole18Par}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{course[0]?.Hole18Distance}</Text>
      </View>
      <View  style={{  marginTop:2}}>
      <Text>{hole18}</Text>
      </View>
    </View>
    <View style={{width:'100%', height:2, backgroundColor:'#d3d3d3', marginTop:4}}></View>
    <View style={{width:2, height:'100%', backgroundColor:'#d3d3d3', position:'absolute', left:'5%'}}></View>
    <View style={{width:2, height:'100%', backgroundColor:'#d3d3d3', position:'absolute', left:'18%'}}></View>
    <View style={{width:2, height:'100%', backgroundColor:'#d3d3d3', position:'absolute', left:'35%'}}></View>
    <View style={{width:2, height:'100%', backgroundColor:'#d3d3d3', position:'absolute', left:'50%'}}></View>
    <View style={{width:2, height:'100%', backgroundColor:'#d3d3d3', position:'absolute', left:'72%'}}></View>
    <View style={{width:2, height:'100%', backgroundColor:'#d3d3d3', position:'absolute', right:'5%'}}></View>
  </View>
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
    borderRadius: 10,
    padding: 20,
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
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#ED4337"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center"
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: height * 0.079,
    textAlign: "left",
    marginLeft: width * 0.10
  },
  venuetitle: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "left",
    marginLeft: width * 0.10
  },
  bottomSheetContainer:{
    width,
    height, 
    backgroundColor:'white',
    position:'absolute', 
    zIndex:20,
    elevation:20,
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
  },
  blurblock:{
    width:170,
    height:120,
    borderRadius:15,
    overflow:'hidden',
    position:'absolute',
    top:height*0.05,
    right:width*0.44,
    elevation:100 
  },
  shadow:{
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex:10, 
  },
  input:{
    width:50,
    height:50,
    borderColor:'#68BF7B',
    borderRadius:5,
    borderWidth:3,
    position:'absolute',
    right:115,
    marginTop:25,
    paddingLeft:2
  },
  inputA:{
    width:50,
    height:50,
    borderColor:'#68BF7B',
    borderRadius:5,
    borderWidth:3,
    position:'absolute',
    right:115,
    marginTop:-5, 
    paddingLeft:2
  },
  inputbtn:{
    width:100,
    height:50,
    backgroundColor:'#064635',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    position:'absolute',
    right:20,
    marginTop:25
  },
  inputbtnA:{
    width:100,
    height:50,
    backgroundColor:'#064635',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    position:'absolute',
    right:20,
    marginTop:-5
  },
  inputbtnsubmit:{
    width:'90%',
    height:50,
    backgroundColor:'#064635',
    borderRadius:5,
    position:'absolute',
    right:20,
    marginTop:25 
  },
  inputbtnsubmitA:{
    width:'90%',
    height:50,
    backgroundColor:'#064635',
    borderRadius:5,
    right:20,
    position:'absolute',
    marginTop:-5
  }
});
