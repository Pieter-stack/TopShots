//Import Components
import React, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TouchableHighlight,AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'

//Import images
import logo from '../assets/images/logo.png';
import square from '../assets/images/square.png';
import line from '../assets/images/line.png';
import rectangle from '../assets/images/rectangle.png';
import test from '../assets/images/test.png';
import testpfp from '../assets/images/testpfp.png';
import flag from '../assets/images/flag.png';
import { getAllCompsRealtime, getUser } from '../Database';
import { auth, db } from '../firebase';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//Content
export default function Homepage({navigation}) {


    //set comps
    const [comps, setComps]= useState([]);
    const [Mycomps, setMyComps]= useState([]);
    const [Pastcomps, setPastComps]= useState([]);

    //active class
    const [active, setActive] = useState('');

    //check which btn is pressed
    const [isPress, setIsPress] = useState(false);
    const [isPress2, setIsPress2] = useState(false);

    //local storage for btn1
    const savestate = async () => {
        try {
          await AsyncStorage.setItem('grid','true');
        } catch (error) {
          // Error saving data
        }
      };

      //local storage for btn 2
      const savestate2 = async () => {
        try {
          await AsyncStorage.setItem('grid','false');
        } catch (error) {
          // Error saving data
        }
      };

      //get local storage
      const getstate = async () => {
        try {
          const value = await AsyncStorage.getItem('grid');
          if (value == 'true') {
            // We have data!!
            setIsPress(true);
            setIsPress2(false);
            setActive('1');
          }else if (value == 'false'){
            setIsPress(false);
            setIsPress2(true); 
           setActive('2') ;
          }  
        } catch (error) {
          // Error retrieving data
        }
      };


      useEffect(() =>{
        //get active state
        getstate();
    },[])

    //set styling of btn1
    const touchProps = {
        underlayColor: 'white',
        style: isPress ? {opacity:1} : {opacity:0.5},
        onHideUnderlay: () => setIsPress(true),
        onShowUnderlay: () => setIsPress2(false),
        
    };
    //set styling of btn2
    const touchProps2 = {
        underlayColor: 'white',
        style: isPress2 ? {opacity:1} : {opacity:0.5},
        onHideUnderlay: () => setIsPress2(true),
        onShowUnderlay: () => setIsPress(false),  
    };
    useFocusEffect(
        React.useCallback(() => {
            //calls from db
            const collectionRef = getAllCompsRealtime();
            const collectionRef2 = getUser();
            const collectionRef3 = query(collection(db, "competitions"), where("usersentered", "array-contains", auth.currentUser.uid));
            const collectionRef4 = query(collection(db, "competitions"), where("closed", "==","closed"));
            //onsnapshot listener for realtime data
            const unsubscribe = onSnapshot(collectionRef, (snapshot) =>{
                let compsData = [];
                //loop through all competitions
                 snapshot.forEach((doc) =>{
                    let comp ={
                        ...doc.data(),
                        id: doc.id
                    }
                //push competitions 
                compsData.push(comp);
            });
                //set competitions
                setComps(compsData);
            });

            //onsnapshot listener for realtime data
            const unsubscribe2 = onSnapshot(collectionRef2, (snapshot) =>{
                //loop through all users
                snapshot.forEach((doc) =>{
                    let user ={
                        ...doc.data(),
                        id: doc.id
                    }
                //set user
                setUsers(user);
            });
            });
            //onsnapshot listener for realtime data
            const unsubscribe3 = onSnapshot(collectionRef3, (snapshot) =>{
                let compsData = []
                //loop through competitions and get comps user entered
                 snapshot.forEach((doc) =>{
                    let comp ={
                        ...doc.data(),
                        id: doc.id
                    }
                //push competitions to array
                compsData.push(comp)
            });
                //set users competitions
                setMyComps(compsData);
            });
            //onsnapshot listener for realtime data
            const unsubscribe4 = onSnapshot(collectionRef4, (snapshot) =>{
                let compsData = []
                //loop through competitions and get closed comps
                snapshot.forEach((doc) =>{
                    let comp ={
                        ...doc.data(),
                        id: doc.id
                    }
                //push competitions
                compsData.push(comp)
            })
                //set past competitions
                setPastComps(compsData);
            })


            return () =>
            {
                unsubscribe();
                unsubscribe2();
                unsubscribe3();
                unsubscribe4();
            }
           
        },[])   
    );


    //get current user data
    const [users, setUsers]= useState([]);
    //set btn states
    const [submitNew, setSubmitNew]= useState(true);
    const [submitMy, setSubmitMy]= useState(false);
    const [submitPast, setSubmitPast]= useState(false);
    //function for new competitions
    const onPressNew = () => {
      setSubmitNew(true);  
      setSubmitMy(false);
      setSubmitPast(false);    
    };
    //function for users competitions
    const onPressMy = () => {
      setSubmitNew(false);  
      setSubmitMy(true);
      setSubmitPast(false);       
    };
    //function for old competitions
    const onPressPast = () => {
      setSubmitNew(false);  
      setSubmitMy(false);
      setSubmitPast(true);     
    };


    //for loop and if statements to display correct competitions that matches users, gender age and rank
    const UsersCompetitions =[];
    for (let i = 0; i < comps.length; i++) {
        if(comps[i].gender == users.gender || comps[i].gender == 'Any'){
            if(comps[i].rank < users.rank || comps[i].rank == 'Any'){
                if(comps[i].age == '20-40'){
                    if(users.age >= 20 && users.age <= 40){
                        if(comps[i].closed == 'open'){
                            UsersCompetitions.push(comps[i]);
                        };
                    };
                }else if(comps[i].age == '40-65'){
                    if(users.age >= 40 && users.age <= 65){
                        if(comps[i].closed == 'open'){
                            UsersCompetitions.push(comps[i]);
                        }; 
                    };
                }else if(comps[i].age == '65+'){
                    if(users.age > 65){
                        if(comps[i].closed == 'open'){
                            UsersCompetitions.push(comps[i]);
                        };
                    };
                }else if(comps[i].age == 'Any'){
                    if(comps[i].closed == 'open'){
                        UsersCompetitions.push(comps[i]) ;
                    };
               };
            };
        };
    };

    //convert seconds to date
    const convertToDate = (seconds) => {
        return new Date(seconds*1000).toLocaleString(); 
    };

  //Content Render
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Image source={logo} style={styles.logoimg}></Image>
        <TouchableOpacity onPress={() => navigation.push('Profile')}>
            <Image resizeMode={"contain"} source={{uri:users.profile}} style={styles.pfp} ></Image>
        </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.heading}>Tournaments</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <TouchableHighlight {...touchProps} onPress={() => { savestate(); setActive('1');}}>
            <Image source={rectangle} style={styles.icon1}></Image>
        </TouchableHighlight>
        <Image source={line} style={styles.icon2}></Image>
        <TouchableHighlight {...touchProps2} onPress={() =>{ savestate2(); setActive('2');}}>
            <Image source={square} style={styles.icon1}></Image>
        </TouchableHighlight>
    </View>
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={onPressNew}>
                <View style={submitNew ? styles.btnfilteractive  : styles.btnfilter}>
                <Text style={submitNew ? styles.filtertextactive  : styles.filtertext}>New Tournaments</Text>
    </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={onPressMy}>
            <View style={submitMy ? styles.btnfilteractive  : styles.btnfilter}>
                <Text style={submitMy ? styles.filtertextactive  : styles.filtertext}>My Tournaments</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressPast}>
            <View style={submitPast ? styles.btnfilteractive  : styles.btnfilter}>
                <Text style={submitPast ? styles.filtertextactive  : styles.filtertext}>Past Tournaments</Text>
            </View>
            </TouchableOpacity>
                        
        </ScrollView>     
    </View>
    <View style={{width:width, height:height*0.45, marginTop:10}}>
        <ScrollView  contentContainerStyle={styles.scroll}>
{submitNew == true ? (
    <>
{active == '1' ? (
    <>
{UsersCompetitions.map((comp, index) => (
    <TouchableOpacity key={index} onPress={()=> navigation.navigate("CompEnter" , comp)} >
        <View style={styles.rowAlign}>
            <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
            <View style={styles.opacitydiv}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.divheading}>{comp.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.curentuser}>{parseInt(comp.currentplayers)}</Text>
                        <Text style={styles.dash}>/</Text>
                        <Text style={styles.maxuser}>{parseInt(comp.maxplayers)}</Text>
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
{UsersCompetitions.map((comp, index) => (
    <TouchableOpacity key={index}  onPress={()=> navigation.navigate("CompEnter" , comp)} >
        <View style={styles.columnAlign}>
            <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
            <View style={styles.opacitydiv}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.divheadinglong}>{comp.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.curentuser}>{parseInt(comp.currentplayers)}</Text>
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
    </>  
):(submitMy == true ? (
    <>
{active == '1' ? (
    <>
{Mycomps.map((comp, index) => (
    <TouchableOpacity key={index} onPress={()=> navigation.navigate("CompEnter" , comp)} >
        <View style={styles.rowAlign}>
            <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
                <View style={styles.opacitydiv}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.divheading}>{comp.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.curentuser}>{parseInt(comp.currentplayers)}</Text>
                            <Text style={styles.dash}>/</Text>
                            <Text style={styles.maxuser}>{parseInt(comp.maxplayers)}</Text>
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
{Mycomps.map((comp, index) => (
     <TouchableOpacity key={index}  onPress={()=> navigation.navigate("CompEnter" , comp)} >
        <View style={styles.columnAlign}>
            <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
            <View style={styles.opacitydiv}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.divheadinglong}>{comp.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.curentuser}>{parseInt(comp.currentplayers)}</Text>
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
    </>
):(submitPast == true ? (  
    <>
{active == '1' ? (
    <>
{Pastcomps.map((comp, index) => (
     <TouchableOpacity key={index} onPress={()=> navigation.navigate("CompEnter" , comp)} >
        <View style={styles.rowAlign}>
            <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
            <View style={styles.opacitydiv}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.divheading}>{comp.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.curentuser}>{parseInt(comp.currentplayers)}</Text>
                        <Text style={styles.dash}>/</Text>
                        <Text style={styles.maxuser}>{parseInt(comp.maxplayers)}</Text>
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
{Pastcomps.map((comp, index) => (
    <TouchableOpacity key={index}  onPress={()=> navigation.navigate("CompEnter" , comp)} >
        <View style={styles.columnAlign}>
            <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
            <View style={styles.opacitydiv}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.divheadinglong}>{comp.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.curentuser}>{parseInt(comp.currentplayers)}</Text>
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
    </>
):(
    <>
    </>
)))}
    </ScrollView> 
</View>
{users.type == 'admin' ?(
    <>
        <TouchableOpacity onPress={() => navigation.push('CompReg')} style={{position:'absolute', bottom:20, marginLeft:width*0.49, zIndex:10}}>
            <View style={styles.addbtn}>
                <Text style={{color:'#fff', fontSize:width*0.12, fontWeight:'bold', textAlign:'center', marginTop:Platform.OS === 'ios' ? -2 : -4 }}>+</Text>
            </View>
        </TouchableOpacity>
    </>
):(
    <>
    </>
)}
    </SafeAreaView>
);
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
btnfilter:{
    width:width*0.40,
    height:40,
    backgroundColor:'#68BF7B',
    borderRadius:10,
    marginLeft:10,
    marginRight:10
},
filtertext:{
    alignSelf:'center',
    color:'#fff',
    fontFamily:'Roboto',
    fontWeight:'bold',
    fontSize:14,
    marginTop:11
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
    fontWeight:'bold'
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
},
btnfilteractive:{
    width:width*0.40,
    height:40,
    borderColor:'#064635',
    borderWidth:3,
    borderRadius:10,
    marginLeft:10,
    marginRight:10
},
filtertextactive:{
    alignSelf:'center',
    color:'#064635',
    fontFamily:'Roboto',
    fontWeight:'bold',
    fontSize:14,
    marginTop:8
}
});









