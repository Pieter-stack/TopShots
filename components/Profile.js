//Import Components
import React, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,AsyncStorage } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native'
//Import fonts
import * as Font from 'expo-font';

//firebase
import { signOut } from 'firebase/auth';
import { auth, storage } from '../firebase';
import { getUser, updateProfile } from '../Database';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


//Import images
import test from '../assets/images/test.png';
import arrow from '../assets/images/backarrow.png';
import logout from '../assets/images/logout.png';
import flag from '../assets/images/flag.png';
import badge from '../assets/images/badge.png';
import camera from '../assets/images/camera.png';
import cloud from '../assets/images/cloud.png';
import { onSnapshot } from 'firebase/firestore';



//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

//Content
export default function Profile({navigation}) {

    useFocusEffect(

        
        React.useCallback(() => {

            
            const collectionRef = getUser();
            const unsubscribe = onSnapshot(collectionRef, (snapshot) =>{
               
                 snapshot.forEach((doc) =>{
                //     
    
                let user ={
                    ...doc.data(),
                    id: doc.id
                }

             
                setUsers(user);
                if(user.imguploaded == '1'){
                    setImageselected('2'); 
                    
                 }else{
                    setImageselected(null);    
                 }
                 console.log(imageselected)

            })
    
               
           
            })



            
            return () =>
            {
                //do something when screen is unfocused
                //usefull cleanup function
                unsubscribe();


            }
            
           
        },[])

        
    )


    const [image, setImage] = useState(null);
    const [imageselected, setImageselected] = useState(null);

    const handleImageUpload = async() =>{
    const imageRef = ref(storage, 'images/'+auth.currentUser.uid  + ".jpg" )

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
      await uploadBytes(imageRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            
            updateProfile(auth.currentUser.uid, {profile:url, imguploaded:'1'})
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
    // We're done with the blob, close and release it
    blob.close();
    setImageselected('2');
    }


   











    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      setImageselected(null);
      console.log(imageselected);

      if (!result.cancelled) {
        setImageselected('1');
        console.log(imageselected);
          setImage(result.uri);

        
      }

    };



    const onSignOutPress = () =>{
        signOut(auth).then(() =>{
          //Success
        })
        .catch((error) =>{
            Alert.alert(error.message);
        })
      }


      const [users, setUsers]= useState([]);

      useEffect(() => {


        
        }, [])
        




  //Content Render
  return (
    <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <View>
        <Image source={test} style={styles.backdrop}/>
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
            ) : (imageselected == '2' ? (
                <>
                    <Image source={{uri:users.profile}} style={styles.pfp}/>
                </>
            ) : (
                    <>
                      
                    </>
                )
            )
        }


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
            <Image source={badge} style={{ alignSelf:'center' ,width:'90%', height:'60%', marginTop:5}}/>
            <Text style={{color:'white', fontSize:8, textAlign:'center',position:'absolute', bottom:3}}>Rank {users.rank}</Text>
        </BlurView>
        <BlurView
            style={{width:width*0.12,height:height*0.08, zIndex:2, borderRadius:width*0.015, overflow:'hidden', marginRight:10, alignItems:'center'}}
            tint="light"
            intensity={70}
            reducedTransparencyFallbackColor="white"
        >
            <Text style={{color:'white', fontSize:32, textAlign:'center', marginTop:'15%'}}>{users.handicap}</Text>
            <Text style={{color:'white', fontSize:8, textAlign:'center',position:'absolute', bottom:3}}>Handicap</Text>
        </BlurView>
        </View>
        </View>
        <Text style={{ fontSize:32, fontWeight:'bold', alignSelf:'center', marginTop:10}} >{users.name} {users.surname}</Text>







        <View style={{width:width*0.95, height:5, backgroundColor:'#68BF7B', alignSelf:'center', borderRadius:100, marginTop:10}}></View>
        <View>
        <Text style={{ fontSize:22, fontFamily:'Roboto', marginTop:10,marginLeft:10}}>Badges</Text>
        <View style={{width:width*0.95, height:100, marginTop:10, marginLeft:width*0.025}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:'100%', height:'100%'}}>
        <Image source={badge} style={styles.badge}/>
        <Image source={badge}  style={styles.badge}/>
        <Image source={badge}  style={styles.badge}/>
        <Image source={badge}  style={styles.badge}/>
        <Image source={badge}  style={styles.badge}/>
        </ScrollView>
        </View>
        </View>
        <View>
        <Text style={{ fontSize:22, fontFamily:'Roboto', marginTop:10,marginLeft:10}}>Tournaments</Text>
        <View style={{width:width*0.95, height:height*0.35, marginTop:10, marginLeft:width*0.025}}>  
        <ScrollView style={{width:'100%', height:'100%'}}>
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
    backgroundColor: '#fff',
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
});
