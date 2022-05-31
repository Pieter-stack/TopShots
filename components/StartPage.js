//Import Components
import react from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";

//Import fonts
import * as Font from 'expo-font';

//Import images
import landing from '../assets/images/landing.png';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

//Content
export default function StartPage({navigation}) {

  //Content Render
  return (
    <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
          <Text style={styles.heading}>Welcome to top Shots</Text>
          <Image source={landing} style={styles.landingimg}></Image>
          <Text style={styles.body}>the number one golf competition app</Text>
            <TouchableOpacity style={{position:'absolute', bottom:20}} onPress={() => navigation.replace('Login')}>
              <View style={styles.startbtn}>
            <Text style={styles.startbtnText}>Get Started</Text>
              </View>
            </TouchableOpacity>
    </View>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'

  },
  heading:{
    textAlign:'center',
    marginTop:height*0.06,
    fontSize:36,
    fontFamily:'Allan',
    marginLeft:width/4,
    marginRight:width/4,
    width:width/2
  },
  landingimg:{
    alignSelf: 'center',
    marginTop:height/50,
    resizeMode:'contain'

  },
  body:{
    textAlign:'center',
    marginTop: height/30,
    fontSize:18,
    marginLeft:width/50,
    marginRight:width/50,
    width:width/1.1,
    fontFamily:'Roboto'
  },
  startbtn:{
    backgroundColor: '#064635',
    marginTop:height/7,
    width: width/1.2,
    height:60,
    alignSelf:'center',
    borderRadius:7
  },
  startbtnText:{
    textAlign:'center',
    paddingTop:13,
    color:'white',
    fontSize:26,
    fontFamily:'Allan'
  }
});







