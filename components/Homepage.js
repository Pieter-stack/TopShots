//Import Components
import react, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TouchableHighlight,AsyncStorage } from 'react-native';
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
import { getAllComps } from '../Database';

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


    //set comps
    const [comps, setComps]= useState([]);

    //active class
    const [active, setActive] = useState('');

    
    const [isPress, setIsPress] = useState(false);
    const [isPress2, setIsPress2] = useState(false);



    const touchProps = {
        
        underlayColor: 'white',
        style: isPress ? {opacity:1} : {opacity:0.5},
        onHideUnderlay: () => setIsPress(true),
        onShowUnderlay: () => setIsPress2(false),
       
        
       
        
       
        
      };

      const touchProps2 = {
        
        underlayColor: 'white',
        style: isPress2 ? {opacity:1} : {opacity:0.5},
        onHideUnderlay: () => setIsPress2(true),
        onShowUnderlay: () => setIsPress(false),  
       
      };




useEffect(() => {
    fetchAllComps();
    }, [])
    
    const fetchAllComps = async () => {
      const data = await getAllComps();
      setComps(data);
      
      
    }
    
    //convert seconds to date
    const convertToDate = (seconds) => {
        
        return new Date(seconds*1000).toLocaleString();
        
    }

    


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


<TouchableHighlight {...touchProps} onPress={() => setActive('1')}>
                <Image source={rectangle} style={styles.icon1}></Image>
</TouchableHighlight>


                <Image source={line} style={styles.icon2}></Image>


<TouchableHighlight {...touchProps2} onPress={() => setActive('2')}>
                <Image source={square} style={styles.icon1}></Image>
</TouchableHighlight>


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
                <View style={{width:width, height:height*0.45, marginTop:10}}>
                    <ScrollView  contentContainerStyle={styles.scroll}>




{active == '1'? (

<>

                    {comps.map((comp, index) => (
     <TouchableOpacity key={index} onPress={()=> navigation.navigate("CompEnter" , comp)} >

<View style={styles.rowAlign}>
                            <Image  resizeMode={"cover"} source={test} style={styles.divImg}/>
                        <View style={styles.opacitydiv}>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.divheading}>{comp.title}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.curentuser}>44</Text>
                                    <Text style={styles.dash}>/</Text>
                                    <Text style={styles.maxuser}>{comp.maxplayers}</Text>
                                </View>
                            </View>
                            <BlurView
                                    style={{width:'100%',height:'50%', position:'absolute', zIndex:2, borderRadius:15, overflow:'hidden', bottom:0}}
                                    tint="light"
                                    intensity={50}
                                    reducedTransparencyFallbackColor="white"
                            >
                                <View style={{flexDirection:'row', flexShrink:1}}>
                                    <Text style={styles.datecon}>{convertToDate(comp.date.seconds)}</Text>
                                    
                                    
                   
                                </View>
                                
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                <Image source={flag} style={styles.flagicon}></Image>
                                    <Text style={styles.amountholes}>{comp.hole}</Text>
                                    <Text style={styles.dashcon2}>|</Text>
                                    <Text style={styles.golfcoursecon}>{comp.venue}</Text>
                                </View>
                            </BlurView>
                        </View>  
                </View>


</TouchableOpacity>
))}
</>

):(

<>

{comps.map((comp, index) => (
     <TouchableOpacity key={index}  onPress={()=> navigation.navigate("CompEnter" , comp)} >

                        <View style={styles.columnAlign}>
                            <Image  resizeMode={"cover"} source={test} style={styles.divImg}/>
                            <View style={styles.opacitydiv}>
                                <View style={{flexDirection:'row'}}>
                                        <Text style={styles.divheadinglong}>{comp.title}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.curentuser}>44</Text>
                                        <Text style={styles.dash}>/</Text>
                                        <Text style={styles.maxuser}>{comp.maxplayers}</Text>
                                    </View>
                                </View>
                                <BlurView
                                    style={{width:'100%',height:'50%', position:'absolute', zIndex:2, borderRadius:15, overflow:'hidden', bottom:0}}
                                    tint="light"
                                    intensity={50}
                                    reducedTransparencyFallbackColor="white"
                            >
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.dateconcolumn}>{convertToDate(comp.date.seconds)}</Text>
                                </View>
                                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                                <Image source={flag} style={styles.flagicon}></Image>
                                    <Text style={styles.amountholes}>{comp.hole}</Text>
                                    <Text style={styles.dashcon2}>|</Text>
                                    <Text style={styles.golfcoursecon}>{comp.venue}</Text>
                                </View>
                            </BlurView>
                            </View>
                            </View>
                     
                            </TouchableOpacity>
))}
</>
)}
                </ScrollView> 
            </View>
            <TouchableOpacity onPress={() => navigation.push('CompReg')} style={{position:'absolute', bottom:20, marginLeft:width*0.49, zIndex:10}}>
            <View style={styles.addbtn}>
                <Text style={{color:'#fff', fontSize:width*0.12, fontWeight:'bold', textAlign:'center', marginTop:Platform.OS === 'ios' ? -2 : -4 }}>+</Text>
            </View>
            </TouchableOpacity>

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
    height:18,
    
},
icon2:{
    marginTop:42,
    marginRight:15   
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
   marginTop:2,
   marginLeft:10,
   color:'#F3EDA8',
   letterSpacing: 0.4,
   lineHeight:17
},
dateconcolumn:{
    marginTop:10,
    marginLeft:10,
    color:'#F3EDA8',
    letterSpacing: 0.4 
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
width:width*0.15,
height:width*0.15,
backgroundColor:'#68BF7B',
borderRadius:15,
alignSelf:'center',
position:'absolute',
bottom:20
}


});
