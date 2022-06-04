//Import Components
import react, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TextInput,Button } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';




//Import fonts
import * as Font from 'expo-font';

//firebase
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
        <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Homepage")}>
        <Image source={arrow} style={{marginTop:11, alignSelf:'center'}} />
        </TouchableOpacity>
        <Text style={styles.heading}>{currentcomp.title}</Text>
        <Text style={styles.venuetitle}>{currentcomp.venue}</Text>
        <Text style={styles.leaderboardheading}>Leaderboard</Text>
        <View style={{width, height:height*0.4}}>
            <View style={{width:width*0.3, height:width*0.3, borderColor:'#FFD940', borderWidth:3, borderRadius:100, alignSelf:'center', marginTop:height*0.02}}>
              <View style={{width:width*0.268, height:width*0.268, borderRadius:100, alignSelf:'center', marginVertical:height*0.0035}}>
              <Image  resizeMode={"cover"}  source={{uri: currentcomp.image}}  style={{width:width*0.268, height:width*0.268, borderRadius:100, alignSelf:'center'}}/>
                <View style={{width:width*0.08, height:width*0.08, backgroundColor:'#FFD940', borderRadius:100, alignSelf:'flex-end', marginVertical:4, marginRight:-10,justifyContent: 'center', marginTop:-width*0.268}}>
                  <Text style={{fontSize:16, textAlign:'center' }}>1<Text style={{fontSize:12}}>st</Text></Text>
                </View>
              </View>
            </View>
            <View style={{width:width*0.25, height:width*0.25, borderColor:'#FFD940', borderWidth:3, borderRadius:100, alignSelf:'flex-start', marginTop:-height*0.02, marginLeft:20}}>
              <View style={{width:width*0.216, height:width*0.216, borderRadius:100, alignSelf:'center', marginVertical:height*0.0035}}>
              <Image  resizeMode={"cover"}  source={{uri: currentcomp.image}}  style={{width:width*0.216, height:width*0.216, borderRadius:100, alignSelf:'center'}}/>
                <View style={{width:width*0.07, height:width*0.07, backgroundColor:'#FFD940', borderRadius:100, alignSelf:'flex-end', marginVertical:4, marginRight:-10,justifyContent: 'center', marginTop:-width*0.216}}>
                  <Text style={{fontSize:12, textAlign:'center' }}>2<Text style={{fontSize:8}}>nd</Text></Text>
                </View>
              </View>
            </View>
            <View style={{width:width*0.25, height:width*0.25, borderColor:'#FFD940', borderWidth:3, borderRadius:100, alignSelf:'flex-end', marginTop:-width*0.25, marginRight:20}}>
              <View style={{width:width*0.216, height:width*0.216, borderRadius:100, alignSelf:'center', marginVertical:height*0.0035}}>
              <Image  resizeMode={"cover"}  source={{uri: currentcomp.image}}  style={{width:width*0.216, height:width*0.216, borderRadius:100, alignSelf:'center'}}/>
                <View style={{width:width*0.07, height:width*0.07, backgroundColor:'#FFD940', borderRadius:100, alignSelf:'flex-end', marginVertical:4, marginRight:-10,justifyContent: 'center', marginTop:-width*0.216}}>
                  <Text style={{fontSize:12, textAlign:'center' }}>3<Text style={{fontSize:8}}>rd</Text></Text>
                </View>
              </View>
            </View>
            <View style={{ alignSelf:'center', alignItems:'center', width:140 , position:'absolute', marginTop:width*0.36 }}>
            <Text style={{fontSize:12, textAlign:'center', alignSelf:'center'}}>Tiger woods</Text>
            <View style={{width:width*0.15, height:height*0.03, borderRadius:100,borderColor:'#68BF7B', borderWidth:2, marginTop:10, justifyContent:'center' }}>
            <Text style={{fontSize:12, textAlign:'center'}}>100</Text>
            </View>
            </View>
            <View style={{ alignSelf:'flex-start', alignItems:'center', width:140, position:'absolute', marginTop:width*0.56  }}>
            <Text style={{fontSize:12, textAlign:'center'}}>Collin Morikaea</Text>
            <View style={{width:width*0.15, height:height*0.03, borderRadius:100,borderColor:'#68BF7B', borderWidth:2, marginTop:10, justifyContent:'center'  }}>
            <Text style={{fontSize:12, textAlign:'center'}}>100</Text>
            </View>
            </View>
            <View style={{ alignSelf:'flex-end', alignItems:'center', width:140 , position:'absolute', marginTop:width*0.56  }}>
            <Text style={{fontSize:12, textAlign:'center'}}>Rickie Fowler</Text>
            <View style={{width:width*0.15, height:height*0.03, borderRadius:100,borderColor:'#68BF7B', borderWidth:2, marginTop:10, justifyContent:'center'  }}>
            <Text style={{fontSize:12, textAlign:'center'}}>100</Text>
            </View>
            </View>
        </View>
        <View style={{ width, height:height*0.37}}>
          <ScrollView contentContainerStyle={{alignItems:'center', paddingTop:5, paddingBottom:5}}>


          <View style={{width:width*0.82, height:75, backgroundColor:'#fff',borderRadius:9, marginBottom:10,shadowColor: '#5B5B5B',shadowOffset: {width: 0, height: 2},shadowOpacity: 0.4,elevation: 5, justifyContent:'center', marginLeft:width*0.08, flexDirection:'row'}}>
          <View style={{width:width*0.18, height:55, backgroundColor:'#FFD940', borderRadius:8, justifyContent:'center', alignSelf:'center', position:'absolute', left:-width*0.08}}>
          <Text style={{fontSize:16, textAlign:'center', fontWeight:'bold'}}>4</Text>
          </View>
          <Image  resizeMode={"cover"} source={{uri: currentcomp.badge}}    style={{width:55, height:55, borderRadius:100, backgroundColor:'red', alignSelf:'center', position:'absolute', left:width*0.12}}/>
          <Text style={{fontSize:12, alignSelf:'center', width:width*0.3, position:'absolute', left:width*0.28, textAlign:'left'}}>Collin Morikaea</Text>

          <TouchableOpacity style={{width:width*0.2, height:height*0.03, borderRadius:100,borderColor:'#68BF7B', borderWidth:2, justifyContent:'center', alignSelf:'center', position:'absolute', right:10}} onPress={() => navigation.navigate("Golfcourse")}>
            <Text style={{fontSize:12, textAlign:'center'}}>Start</Text>
            </TouchableOpacity>

          </View>



 


          </ScrollView>

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
    marginTop:20


  }
  
});
