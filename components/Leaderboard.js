//Import Components
import react, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TextInput,Button } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';




//Import fonts
import * as Font from 'expo-font';

//firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


//Import images

import arrow from '../assets/images/blackarrow.png';




//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

//Content
export default function Leaderboard({route, navigation}) {

    const currentcomp = route.params;
 
     

  //Content Render
  return (
    <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Image source={arrow} style={{marginTop:11, alignSelf:'center'}} />
        </TouchableOpacity>
        <Text style={styles.heading}>{currentcomp.title}</Text>
        <Text style={styles.venuetitle}>{currentcomp.venue}</Text>
        <Text style={styles.leaderboardheading}>Leaderboard</Text>
        <View style={{backgroundColor:'red', width, height:height*0.37}}>
            <View style={{width:125, height:125, borderColor:'#FFD940', borderWidth:3, borderRadius:100, alignSelf:'center', marginTop:20}}>
            <View style={{width:110, height:110, backgroundColor:'blue', borderRadius:100, alignSelf:'center', marginVertical:4}}>
            <View style={{width:40, height:40, backgroundColor:'#FFD940', borderRadius:100, alignSelf:'flex-end', marginVertical:4, marginRight:-10}}>

            </View>
            </View>
            </View>
            <View style={{width:100, height:100, borderColor:'#FFD940', borderWidth:3, borderRadius:100, alignSelf:'flex-start', marginTop:-40, marginLeft:20}}>
            <View style={{width:85, height:85, backgroundColor:'blue', borderRadius:100, alignSelf:'center', marginVertical:4}}>
            <View style={{width:25, height:25, backgroundColor:'#FFD940', borderRadius:100, alignSelf:'flex-end', marginVertical:4, marginRight:-10}}>

            </View>
            </View>
            </View>
            <View style={{width:100, height:100, borderColor:'#FFD940', borderWidth:3, borderRadius:100, alignSelf:'flex-end', marginTop:-100, marginRight:20}}>
            <View style={{width:85, height:85, backgroundColor:'blue', borderRadius:100, alignSelf:'center', marginVertical:4}}>
            <View style={{width:25, height:25, backgroundColor:'#FFD940', borderRadius:100, alignSelf:'flex-end', marginVertical:4, marginRight:-10}}>

            </View>
            </View>
            </View>

        </View>
        <View style={{backgroundColor:'blue', width, height:height*0.37}}>

        </View>
       
    </View>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back:{
    position:'absolute',
    width:50,
    height:50,
    marginLeft:5,
    marginTop:height*0.075
},
  heading:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:height*0.079,
    textAlign:'left',
    marginLeft:width*0.25,


  },
  venuetitle:{
    fontSize:12,
    marginTop:5,
    textAlign:'left',
    marginLeft:width*0.25,

  },
  leaderboardheading:{
    textAlign:'center',
    fontFamily:'Allan',
    color:'#68BF7B',
    fontSize:30,
    marginTop:30


  }
  
});
