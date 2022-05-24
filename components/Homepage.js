//Import Components
import react from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';

//Import fonts
import * as Font from 'expo-font';



//Import images
import logo from '../assets/images/logo.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';
import rectangle from '../assets/images/rectangle.png';
import test from '../assets/images/test.png';
import testpfp from '../assets/images/testpfp.png';
import flag from '../assets/images/flag.png';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

//Content
export default function Homepage({navigation}) {

  //Content Render
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Image source={logo} style={styles.logoimg}></Image>
            <TouchableOpacity onPress={() => navigation.push('Profile')}>
            <Image resizeMode={"contain"} source={testpfp} style={styles.pfp} ></Image>
            </TouchableOpacity>
        </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.heading}>Tournaments</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Image source={rectangle} style={styles.icon1}></Image>
                <Image source={line} style={styles.icon2}></Image>
                <Image source={square} style={styles.icon3}></Image>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={styles.btnfilter}>
                        <Text style={styles.filtertext}>New Tournaments</Text>
                    </View>
                    <View style={styles.btnfilter}>
                    <Text style={styles.filtertext}>My Tournaments</Text>
                    </View>
                    <View style={styles.btnfilter}>
                    <Text style={styles.filtertext}>Past Tournaments</Text>
                    </View>
                </ScrollView>     
            </View>
                <View style={{width:width, height:height*0.48, marginTop:10}}>
                    <ScrollView  contentContainerStyle={styles.scroll}>
                        <View style={styles.rowAlign}>
                            <Image  resizeMode={"cover"} source={test} style={styles.divImg}/>
                        <View style={styles.opacitydiv}>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.divheading}>PGA Mens Tournament</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.curentuser}>44</Text>
                                    <Text style={styles.dash}>/</Text>
                                    <Text style={styles.maxuser}>50</Text>
                                </View>
                            </View>
                            <BlurView
                                    style={{width:'100%',height:'50%', position:'absolute', zIndex:2, borderRadius:15, overflow:'hidden', bottom:0}}
                                    tint="light"
                                    intensity={50}
                                    reducedTransparencyFallbackColor="white"
                            >
                                <View style={{flexDirection:'row', flexShrink:1}}>
                                    <Text style={styles.datecon}>12 February 2022</Text>
                                    <Text style={styles.dashcon}>|</Text>
                                    <Text style={styles.opencon}>closed</Text>
                                </View>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                <Image source={flag} style={styles.flagicon}></Image>
                                    <Text style={styles.amountholes}>18</Text>
                                    <Text style={styles.dashcon2}>|</Text>
                                    <Text style={styles.golfcoursecon}>Sun City Golf Course</Text>
                                </View>
                            </BlurView>
                        </View>  
                </View>
                    <View style={styles.rowAlign}></View>
                        <View style={styles.columnAlign}>
                            <Image  resizeMode={"cover"} source={test} style={styles.divImg}/>
                            <View style={styles.opacitydiv}>
                                <View style={{flexDirection:'row'}}>
                                        <Text style={styles.divheadinglong}>PGA Mens Tournament</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.curentuser}>44</Text>
                                        <Text style={styles.dash}>/</Text>
                                        <Text style={styles.maxuser}>50</Text>
                                    </View>
                                </View>
                                <BlurView
                                    style={{width:'100%',height:'50%', position:'absolute', zIndex:2, borderRadius:15, overflow:'hidden', bottom:0}}
                                    tint="light"
                                    intensity={50}
                                    reducedTransparencyFallbackColor="white"
                            >
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.datecon}>12 March 2022</Text>
                                    <Text style={styles.dashcon}>|</Text>
                                    <Text style={styles.opencon}>Open</Text>
                                </View>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                <Image source={flag} style={styles.flagicon}></Image>
                                    <Text style={styles.amountholes}>18</Text>
                                    <Text style={styles.dashcon2}>|</Text>
                                    <Text style={styles.golfcoursecon}>Sun City Golf Course</Text>
                                </View>
                            </BlurView>
                            </View>
                            </View>
                        <View style={styles.columnAlign}></View>
                </ScrollView> 
            </View>
            <View style={styles.addbtn}>
                <Text style={{color:'#fff',alignSelf:'center', fontSize:60, fontWeight:'bold', marginTop:Platform.OS === 'ios' ? 0 : -4}}>+</Text>
            </View>
            

    </SafeAreaView>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    logoimg:{
    marginTop:height*0.06
},
pfp:{
    borderWidth: 3,
    backgroundColor:'#FFD940',
    borderColor: "#FFD940",
    width:70,
    height:70,
    borderRadius:35,
    alignContent:'center',
    marginTop:height*0.06,
    marginRight: 25
},
heading:{
    padding:32,
    marginTop:5,
    fontFamily:'Allan',
    fontSize:32
},
icon1:{
    marginTop:45,
    marginRight:15,
    width:18,
    height:18
},
icon2:{
    marginTop:42,
    marginRight:15   
},
icon3:{
    marginTop:45,
    marginRight:25,
    width:22,
    height:18   
},
btnfilter:{
    width:width*0.40,
    height:40,
    backgroundColor:'#68BF7B',
    borderRadius:10,
    marginLeft:10,
    marginRight:10,
},
filtertext:{
alignSelf:'center',
color:'#fff',
fontFamily:'Roboto',
fontWeight:'bold',
fontSize:14,
marginTop:10
},
scroll:{
    width:width,
    marginTop:height*0.025,
    height:'auto',
    paddingLeft:width*0.030,
    paddingRight:width*0.030,
    justifyContent:'space-between',
    alignItems:'flex-start',
    alignContent:'auto',
    flexDirection:'row',
    flexWrap:'wrap'
},
rowAlign:{
    flexDirection:'row', 
    justifyContent:'space-between',
    alignSelf:'auto',
    backgroundColor:'#064635', 
    width:width*0.45, 
    height:150,
    marginTop:10,
    marginBottom:10,
    borderRadius:15   
},
columnAlign:{
    flexDirection:'column', 
    justifyContent:'space-between',
    alignSelf:'auto',
    backgroundColor:'#064635', 
    width:width*0.94, 
    height:150,
    marginTop:10,
    marginBottom:10,
    borderRadius:15  
},
divImg:{
    width:'100%',
    height:'100%',
    borderRadius:15
},
opacitydiv:{
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    width:'100%',
    height:'100%',
    borderRadius:15,
    zIndex:1,
    position:'absolute'
},
divheading:{
    color:'#fff',
    marginLeft:15,
    marginTop:15,
    fontSize:16,
    width:'60%',
    fontFamily:'Roboto',
    fontWeight:'bold',
},
divheadinglong:{
    color:'#fff',
    marginLeft:15,
    marginTop:15,
    fontSize:26,
    width:'80%'
},
curentuser:{
    color:'#FFD940',
    fontSize:16,
    marginTop: 20,
},
dash:{
    color:'#FFD940',
    fontSize:16,
    marginTop: 25
},
maxuser:{
    color:'#FFD940',
    fontSize:16,
    marginTop: 30
},
datecon:{
   marginTop:10,
   marginLeft:10,
   color:'#F3EDA8' 
},
dashcon:{
    marginTop:10,
    marginLeft:2 ,
    color:'#F3EDA8' 
},
opencon:{
    marginTop:10,
    marginLeft:2,
    color:'#F3EDA8' 
},
flagicon:{
marginTop:6
},
amountholes:{
    marginTop:10,
    marginLeft:-6 ,
    color:'#F3EDA8',
    height:20  
},
dashcon2:{
    marginTop:9,
    marginLeft:3 ,
    color:'#F3EDA8',
    height:20    
},
golfcoursecon:{
    marginTop:9,
    marginLeft:3 ,
    color:'#F3EDA8',
    width:'70%'
},
addbtn:{
width:80,
height:80,
backgroundColor:'#68BF7B',
borderRadius:100,
alignSelf:'center',
position:'absolute',
bottom:45
}


});
