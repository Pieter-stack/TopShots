//Import Components
import React, {useState, useEffect,useRef} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TextInput,Button,Animated } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native'
import LottieView from 'lottie-react-native';

//firebase
import { auth, db } from '../firebase';

//Import images
import arrow from '../assets/images/backarrow.png';
import flag from '../assets/images/flag.png';
import { checkIfalreadyentered, enterCompetition, updatecompetitionUsersCount } from '../Database';
import { arrayUnion, collection, Firestore, onSnapshot, query, where } from 'firebase/firestore';

//convert seconds to date
const convertToDate = (seconds) => {
  return new Date(seconds*1000).toLocaleString();   
}

//set variable name for todays date
var today = new Date().getTime();

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//Content
export default function Competitionenter({route, navigation}) {

  //set variables for route.paramaters and constant variables to call for db calls
  const currentcomp = route.params;
  const id = currentcomp.id;
  const uid = auth.currentUser.uid;
  const venuelocation = currentcomp.venue;
  const titlecompetition = currentcomp.title;

//function to enter a competition
const enterComp = async() =>{
   await enterCompetition(id, venuelocation,titlecompetition,);
   setActive("true");
   updatecompetitionUsersCount(id, {currentplayers:comps.currentplayers+1, usersentered:arrayUnion(auth.currentUser.uid)})
}

//Set competition variable to use in the page
const [comps, setComps]= useState([]);


useFocusEffect(
  React.useCallback(() => {

    //Realtime db call for spesific competition
    const competitionCollectionRef =  query(collection(db, "competitions"), where('id', "==",id));

    //OnSnapshot listener to get data from db
    const unsubscribe = onSnapshot(competitionCollectionRef, (snapshot) =>{

      //loop through data and set data in a useState
      snapshot.forEach((doc) =>{ 
        let comp ={
          ...doc.data(),
          id: doc.id
        };

          //set useState
          setComps(comp);
      });
  });

    //call function to let user join competition
    getjoined();
    //call function to display lottie animation when user joins competition or already joined competition
    handleLikeAnimation(); 

    return () =>
    {
      unsubscribe();
    }
  },[])
);

//variable to see if competition is on or has concluded
const [active, setActive] = useState('');

    //function to see if user already joined competition
    const getjoined = async() =>{
      const data = await checkIfalreadyentered(id);
        if(data == "true"){
          setActive("true");

        }else{
          setActive("false");
        };
    };

    //lottie animation progress
    const progress = useRef(new Animated.Value(0)).current;
     
    //lottie animation function
    const handleLikeAnimation = () => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    };

    //lottie animation function when user already joined a competition
    const handleLikeAnimation2 = () => {
      if(active == 'true'){
      setTimeout(() => {
        navigation.navigate("Leaderboard", comps);
      }, 3000);
    };
    };
    
  //Content Render
  return (
    <View style={styles.container}>
      {active == 'false'?(
        <>
          <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
          <Image source={{uri: comps.image}} style={{width, height, alignSelf:'center', position:'absolute', zIndex:-1}}/>
          <View style={{backgroundColor:'rgba(0, 0, 0, 0.3)', width, height, alignSelf:'center', position:'absolute', zIndex:2}}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Homepage")}>
            <Image source={arrow} style={{marginTop:11, alignSelf:'center'}} />
          </TouchableOpacity>
          <Text style={styles.titles}>{comps.title}</Text>
          <Text style={styles.descrip}>{comps.description}</Text>
          <BlurView
            style={{width:'100%',height:'50%', position:'absolute', zIndex:3, borderRadius:15, overflow:'hidden', bottom:0}}
            tint="light"
            intensity={50}
            reducedTransparencyFallbackColor="white"
          >
          <View style={{flexDirection:'row', flexShrink:1, marginTop:30}}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.labeltext}>{convertToDate(comps.date.seconds)}</Text>
          </View>
          <View style={{flexDirection:'row', flexShrink:1, marginTop:15}}>
            <Text style={styles.label}>Venue:</Text>
            <Text style={styles.labeltext}>{comps.venue}</Text>
          </View>
          <View style={{flexDirection:'row', flexShrink:1, marginTop:15}}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.labeltext}>{comps.gender}</Text>
          </View>
          <View style={{flexDirection:'row', flexShrink:1, marginTop:15}}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.labeltext}>{comps.age}</Text>
          </View>
          <View style={{flexDirection:'row', flexShrink:1, marginTop:15}}>
            <Image source={flag} style={{marginLeft:width*0.08,marginTop:-3}}></Image>
            <Text style={{color:'#fff',fontSize:16,fontFamily:'Roboto',marginLeft:width*0.01}}>{comps.hole}</Text>
          </View>
          <View style={{flexDirection:'row', flexShrink:1, marginTop:-20}}>
              <Text style={styles.max1}>{parseInt(comps.currentplayers)}</Text>
              <Text style={styles.max2}>/</Text>
              <Text style={styles.max3}>{parseInt(comps.maxplayers)}</Text>
          </View>
{today > (comps.date.seconds*1000)+60480000 ? (
  <>
    <View style={{position:'absolute' , bottom:40, alignSelf:'center'}}>
      <TouchableOpacity disabled={true}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Tournament Closed</Text>
        </View>
      </TouchableOpacity>
    </View>
  </>
):(
today > comps.date.seconds*1000  || comps.currentplayers == comps.maxplayers  ? (
  <>
    <View style={{position:'absolute' , bottom:40, alignSelf:'center'}}>
      <TouchableOpacity disabled={true}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Entries Closed</Text>
        </View>
      </TouchableOpacity>
    </View>
  </>
):(
  <>
    <View style={{position:'absolute' , bottom:40, alignSelf:'center'}}>
      <TouchableOpacity onPress={()=> enterComp() && handleLikeAnimation() }>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Enter Tournament</Text>
        </View>
      </TouchableOpacity>
    </View>
  </>
))}        
        </BlurView>
      </View>
  </>
):(
  <>
    <View style={{justifyContent:'center', width, height}} onAnimationFinish={() => navigation.navigate("Leaderboard", comps)}>
      <LottieView  style={{width:50, height:100, alignSelf:'center'}} progress={progress} source={require('../assets/lottie/loaderlottie.json')} autoPlay loop={false}  onAnimationFinish={handleLikeAnimation2()}></LottieView> 
    </View>                                                                                                                                                              
  </>
)}
  </View>
);
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  back:{
    position:'absolute',
    width:50,
    height:50,
    marginLeft:5,
    marginTop:height*0.075
  },
  titles:{
    fontFamily:'Allan',
    color:'#fff',
    fontSize:30,
    marginTop:height*0.15,
    marginLeft:width*0.15
  },
  descrip:{
    color:'#fff',
    fontFamily:'Roboto',
    marginLeft:width*0.15
  },
  btn:{
    backgroundColor: '#064635',
    width: width*0.84,
    height:60,
    alignSelf:'center',
    borderRadius:7 
  },
  btnText:{
    textAlign:'center',
    paddingTop:13,
    color:'white',
    fontSize:26,
    fontFamily:'Allan' 
  },
  label:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    marginLeft:width*0.10,
    width:70
  },
  labeltext:{
    color:'#fff',
    fontSize:16,
    fontFamily:'Roboto',
    marginLeft:width*0.05
  },
  max1:{
    color:'#fff',
    fontSize:20,
    marginLeft:width*0.70
  },
  max2:{
    color:'#fff',
    fontSize:20,
    marginLeft:width*0.01,
    marginTop:3
  },
  max3:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    marginLeft:width*0.01,
    marginTop:6
  }
});
