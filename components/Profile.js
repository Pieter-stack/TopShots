//Import Components
import React, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native'

//firebase
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { getUser, updateProfile } from '../Database';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

//Import images
import pfpbackdrop from '../assets/images/profilebackdrop.png';
import rank1img from '../assets/images/rank1img.png'
import rank2img from '../assets/images/rank2img.png'
import rank3img from '../assets/images/rank3img.png'
import rank4img from '../assets/images/rank4img.png'
import rank5img from '../assets/images/rank5img.png'
import rank6img from '../assets/images/rank6img.png'
import rank7img from '../assets/images/rank7img.png'
import rank8img from '../assets/images/rank8img.png'
import rank9img from '../assets/images/rank9img.png'
import rank10img from '../assets/images/rank10img.png'
import arrow from '../assets/images/backarrow.png';
import logout from '../assets/images/logout.png';
import flag from '../assets/images/flag.png';
import badge from '../assets/images/badge.png';
import badgelong from '../assets/images/badgelong.png';
import cardimg from '../assets/images/cardimg.png';
import camera from '../assets/images/camera.png';
import cloud from '../assets/images/cloud.png';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//Content
export default function Profile({navigation}) {
  //convert seconds to date
  const convertToDate = (seconds) => {   
    return new Date(seconds*1000).toLocaleString();
  
}
    const [comps, setcomps] = useState([]); // all the users info is stored

    useFocusEffect(
    React.useCallback(() => {
        //realtime db queries
        const collectionRef = getUser();
        const competitionCollectionRef = query(collection(db, "competitions"), where("usersentered", "array-contains", auth.currentUser.uid));
        //snapshot listener
        const unsubscribe = onSnapshot(collectionRef, (snapshot) =>{
            //loop through users
             snapshot.forEach((doc) =>{  
                let user ={
                    ...doc.data(),
                    id: doc.id
                }
            //set users
            setUsers(user);
            if(user.imguploaded == '1'){
                setImageselected('2');  
             }else{
                setImageselected(null);    
             }
        });
        });
        //onsnapshot listener
        const unsubscribe2 = onSnapshot(competitionCollectionRef, (snapshot) =>{
            let compsData = []
            //loop through competitions
             snapshot.forEach((doc) =>{
                let comp ={
                    ...doc.data(),
                    id: doc.id
                }
            compsData.push(comp)
        });
        //set competitions  
        setcomps(compsData);
        })
        
        return () =>
        {
            unsubscribe();
            unsubscribe2();
        }          
    },[])    
)
    //get and set image variables
    const [image, setImage] = useState(null);
    const [imageselected, setImageselected] = useState(null);

    //update pfp
    const handleImageUpload = async() =>{
    //set storage type
    const imageRef = ref(storage, 'images/'+auth.currentUser.uid  + ".jpg" )
    //convert image to jpg
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      //wait for usable url link
      await uploadBytes(imageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            //update users pfp
            updateProfile(auth.currentUser.uid, {profile:url, imguploaded:'1'})
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
    // We're done with the blob, close and release it
    blob.close();
    setImageselected('2');
    }

    //get image picker
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      //set image
      setImageselected(null);
      console.log(imageselected);
      //see if user canceled image picker
      if (!result.cancelled) {
        setImageselected('1');
        console.log(imageselected);
          setImage(result.uri); 
      }
    };

    //signout the user
    const onSignOutPress = () =>{
        signOut(auth).then(() =>{
          //Success
        })
        .catch((error) =>{
            Alert.alert(error.message);
        });
      };

      const [users, setUsers]= useState([]);

  //Content Render
  return (
    <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <View>
        <Image source={pfpbackdrop} style={styles.backdrop}/>
        <TouchableOpacity style={styles.back} onPress={() =>  navigation.pop()}>
        <Image source={arrow} style={{marginTop:11, alignSelf:'center'}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={onSignOutPress}>
        <Image source={logout} style={{marginTop:11, alignSelf:'center'}} />
        </TouchableOpacity>
{
imageselected == null ? (
    <>
      <Image source={{uri:users.profile}} style={styles.pfp}/>
    </>
):(imageselected == '2' ? (
    <>
        <Image source={{uri:users.profile}} style={styles.pfp}/>
    </>
):(
    <>
    
    </>
))}
{imageselected == null ? (
    <>
        <TouchableOpacity onPress={() => pickImage()}>
            <View style={{width:width*0.10, height:width*0.10,alignSelf:'center',marginTop:-width*0.10,borderRadius:width*0.10, marginLeft:90, backgroundColor:'#68BF7B'}}>
                <Image source={camera} style={{width:width*0.05, height:width*0.05,alignSelf:'center',marginTop:width*0.027 }}/> 
            </View>
        </TouchableOpacity>
    </>
):(
    <>
    </>
)}
{imageselected == 1 ? (
    <>
        <Image source={{uri:image}} style={{width:width*0.35,height:width*0.35,alignSelf:'center',marginTop:-width*0.30,borderRadius:width*0.30}}/>
        <TouchableOpacity onPress={() => handleImageUpload()}>
            <View style={{width:width*0.10, height:width*0.10,alignSelf:'center',marginTop:-width*0.10,borderRadius:width*0.10, marginLeft:90, backgroundColor:'#68BF7B'}}>
                <Image source={cloud} style={{width:width*0.05, height:width*0.05,alignSelf:'center',marginTop:width*0.027 }}/> 
            </View>
        </TouchableOpacity>
        </>
):(
    <>
    </>
)}
        <View style={{flexDirection:'row',position:'absolute', bottom:height*0.03, alignSelf:'flex-end'}}>
        <BlurView
            style={{width:width*0.12,height:height*0.08, zIndex:2, borderRadius:width*0.015, overflow:'hidden', marginRight:10, alignItems:'center'}}
            tint="light"
            intensity={70}
            reducedTransparencyFallbackColor="white"
        >

{users.rank ==1 ? (
    <>
        <Image source={rank1img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==2 ? (
    <>
        <Image source={rank2img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==3 ? (
    <>
        <Image source={rank3img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==4 ? (
    <>
        <Image source={rank4img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==5 ? (
    <>
        <Image source={rank5img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==6 ? (
    <>
        <Image source={rank6img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==7 ? (
    <>
        <Image source={rank7img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==8 ? (
    <>
        <Image source={rank8img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank ==9 ? (
    <>
        <Image source={rank9img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'50%', height:'60%', marginTop:5}}/>
    </>
):(users.rank >=10 ? (
    <>
        <Image source={rank10img} resizeMode={"contain"} style={{ alignSelf:'center' ,width:'80%', height:'60%', marginTop:5}}/>
    </>
):(
  <>
  </>  
))))))))))}
            <Text style={{color:'white', fontSize:8, textAlign:'center',position:'absolute', bottom:3,  textShadowColor: 'rgba(0, 0, 0, 0.50)',textShadowOffset: {width: -1, height: 1},textShadowRadius: 5}}>Rank {users.rank}</Text>
        </BlurView>
        <BlurView
            style={{width:width*0.12,height:height*0.08, zIndex:2, borderRadius:width*0.015, overflow:'hidden', marginRight:10, alignItems:'center'}}
            tint="light"
            intensity={70}
            reducedTransparencyFallbackColor="white"
        >
        <Text style={{color:'white', fontSize:32, textAlign:'center', marginTop:'15%',  textShadowColor: 'rgba(0, 0, 0, 0.50)',textShadowOffset: {width: -1, height: 1},textShadowRadius: 5}}>{users.handicap}</Text>
        <Text style={{color:'white', fontSize:8, textAlign:'center',position:'absolute', bottom:3,  textShadowColor: 'rgba(0, 0, 0, 0.50)',textShadowOffset: {width: -1, height: 1},textShadowRadius: 5}}>Handicap</Text>
        </BlurView>
    </View>
</View>
<Text style={{ fontSize:32, fontWeight:'bold', alignSelf:'center', marginTop:10}} >{users.name} {users.surname}</Text>
<View style={{width:width*0.95, height:5, backgroundColor:'#68BF7B', alignSelf:'center', borderRadius:100, marginTop:10}}></View>
    <View>
        <Text style={{ fontSize:22, fontFamily:'Roboto', marginTop:10,marginLeft:10}}>Badges</Text>
        <View style={{width:width*0.95, height:100, marginTop:10, marginLeft:width*0.025}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:'100%', height:'100%'}}>  
{users.badges == null ? (
    <>
    </>
):(users.badges.length == 0 ? (
    <>
        <View style={{marginTop:5, marginLeft:5, justifyContent:'center'}}>
            <Image source={badgelong} resizeMode={"contain"}  style={{width:width*0.92}}/>
            <Text style={{ position:'absolute', alignSelf:'center', textAlign:'center', fontFamily:'Allan', fontSize:26, width:'100%'}}>No badges to display</Text>
        </View>
    </>
):(
    <>
{users.badges.map((user, index) => (
    <View key={index}>
        <View style={{justifyContent:'center'}}>
            <Image source={badge} style={styles.badge}/>
            <Image source={{uri:user}} style={{width:50, height:50, position:'absolute', alignSelf:'center'}}/>
        </View>     
    </View>
))}
    </>
))}
        </ScrollView>
    </View>
</View>
<View>
    <Text style={{ fontSize:22, fontFamily:'Roboto', marginTop:10,marginLeft:10}}>Tournaments</Text>
    <View style={{width:width*0.95, height:height*0.35, marginTop:10, marginLeft:width*0.025}}>  
        <ScrollView style={{width:'100%', height:'100%'}}>
{comps == null ? (
    <>
    </>
):(comps.length == 0 ? (
    <>
        <View style={{marginTop:5, marginLeft:5, justifyContent:'center', borderRadius:15}}>
            <Image source={cardimg}resizeMode={"contain"}  style={{width:width*0.90, borderRadius:15, marginLeft:width*0.010}}/>
            <Text style={{ position:'absolute', alignSelf:'center', textAlign:'center', fontFamily:'Allan', fontSize:26, color:'white', width:'100%'}}>No Tournaments joined</Text>
        </View>
    </>
):(
    <>
{comps.map((comp, index) => (
    <View style={styles.columnAlign} key={index}>
        <Image  resizeMode={"cover"} source={{uri: comp.image}} style={styles.divImg}/>
        <View style={styles.opacitydiv}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.divheadinglong}>{comp.title}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.curentuser}>{comp.currentplayers}</Text>
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
))}
    </>
))}
            </ScrollView> 
        </View>  
    </View>
</View>
);
}

//Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
        backdrop:{
        width,
        height:height*0.30
    },
    back:{
        position:'absolute',
        width:50,
        height:50,
        marginLeft:5,
        marginTop:60
    },
    logout:{
        position:'absolute',
        width:50,
        height:50,
        paddingRight:20,
        marginTop:60,
        alignSelf:'flex-end'
    },
    pfp:{
        width:width*0.35,
        height:width*0.35,
        alignSelf:'center',
        marginTop:-width*0.30,
        borderRadius:width*0.30
    },
    badge:{
        height:100,
        width:100
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
        marginTop: 20
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
    }
});
