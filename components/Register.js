//Import Components
import React, {useEffect, useState} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput,FlatList,Footer,Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import { createUserOnRegister } from '../Database';
import DropDownPicker from 'react-native-dropdown-picker';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'

//firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';

//Import Images
import logo from '../assets/images/logo.png';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//set image responsiveness
var imagewidth =  Math.round(width*0.8);
var imageHeight = Math.round(height*0.26);

//slide content
const slides =[
  {
    id: '1',
    image: require('../assets/images/RegisterOne.png'),
    title: "Let's get to know you",
  },
  {
    id: '2',
    image: require('../assets/images/RegisterTwo.png'),
    title: "Getting Personal",
  },
  {
    id: '3',
    image: require('../assets/images/RegisterThree.png'),
    title: "Finishing Touches",
  }

];

//Content
export default function Register({navigation}) {
  //get push notification token
  const [getToken, SetToken] = useState('null')

  useEffect(()=>{
    //register user for push notifications
    registerForPushNotification().then(token=>console.log(token)).catch(err=>console.log(err))
  },[])
//request user for push notifications
async function registerForPushNotification(){
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if(status !='granted'){
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }

  if(status != 'granted'){
    alert('Fail to get the push token');
    return;
  }

  if(Platform.OS === 'android'){
    Notifications.setNotificationChannelAsync("default",{
      name:"default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
  //get token
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  SetToken((await Notifications.getExpoPushTokenAsync()).data);
  return token;
}
  //pw visibility toggle
  const [secureEntry, setSecureEntry] = useState(true);
  //pw show
  const onIconPressShow = () =>{
  setSecureEntry(false)
  }
  //pw hide
  const onIconPressHide = () =>{
    setSecureEntry(true)
    }

//get current slide index point
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref= React.useRef(null);

//update slides upon index
  const updateCurrentSlideIndex = (e) =>{
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX/width);
    setCurrentSlideIndex(currentIndex);
  };

  //button function to go to next slide
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if(nextSlideIndex != slides.length){
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

//setStates
  const [Name, onNameChange] = useState('');
  const [surname, onSurnameChange] = useState('');
  const [age, onAgeChange] = useState('');
  const [handicap, onHandicapChange] = useState('');
  const [email, onEmailChange] = useState('');
  const [username, onUsernameChange] = useState('');
  const [password, onPasswordChange] = useState('');


  function random_item(items)
{
  
  return items[Math.floor(Math.random()*items.length)];
     
}

  var items = ["amber", "blue", "blueGrey", "brown", "cyan", "deepOrange", "deepPurple", "green", "grey", "indigo", "lightBlue", "lightGreen", "lime", "orange", "pink","purple", "red", "teal", "yellow"];
  var color = random_item(items);

// API for custom user pfp
var apipfp = "https://avatars.dicebear.com/api/initials/"+Name+"%20"+surname+".png?backgroundColors[]="+color+"";

  //useStates for data
  const [open, setOpen] = useState(false);
  const [gender, onGenderChange] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);


  //onPress Register a user
  const handleRegisterPress = () =>{
    //create user function  (auth instance, email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
             //executes when creation
             const user = userCredentials.user;
            createUserOnRegister(user,Name, surname, handicap, username, age, gender,apipfp,getToken)
    })
    .catch((error) =>{
        //executes when failure
         Alert.alert('Failed to register please try again');
    
    });    
}

//slide render
const Slide = ({item}) => {
  return(
      <View style={{alignItems:'center'}}>
        <View style={{width}}>
          <Image source={item.image} style={{width:imagewidth*0.95,height: imageHeight*0.95, resizeMode:'contain', alignSelf:'center', marginTop:-10}}/>
        </View>
          <Text style={styles.heading}>{item.title}</Text>
     </View>
  );
  };

  //footer render
  const Footer = () => {
    return(
      <View style={{height:Platform.OS === 'ios' ? height*0.15 : height*0.17 , width, paddingHorizontal:20, position:'absolute', bottom:25}}>
        <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
         {slides.map((_,index)=>  (
          <View key={index} style={[styles.indicator,currentSlideIndex == index &&{
            backgroundColor:'white',
            borderColor: '#68BF7B',
            borderWidth:2,
            width: 16,
            opacity:1, 
          }
          ]}/>
         ))}
          </View>
          {
          currentSlideIndex == slides.length -1 ? (           
            <View>
              <TouchableOpacity disabled={!Name || !surname || !handicap || !username || !age || !gender || !email || !password} onPress={handleRegisterPress} style={!Name || !surname || !handicap || !username || !age || !gender || !email || !password? styles.disabled  : styles.nextbtn}>
                  <Text style={styles.nextbtnText}>Finish</Text>    
              </TouchableOpacity>
            </View>
          ):(
              <TouchableOpacity onPress={goNextSlide}>
                <View style={styles.nextbtn}>
                  <Text style={styles.nextbtnText}>Next</Text>    
                </View>
              </TouchableOpacity>
            )
          }
          <View style={{flexDirection:'row'}}>
            <Text style={styles.bodyreg}>Already have an account?</Text>  
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.bodylinkreg}>Login</Text>
              </TouchableOpacity>
          </View>  
      </View>
    );
  };

  //Content render
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <Image source={logo} style={styles.logoimg}></Image>
        <FlatList   data={slides} 
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
          pagingEnabled
          contentContainerStyle={{height:height * 0.32}}
          horizontal          
          showsHorizontalScrollIndicator={false} 
          renderItem={({item})=> <Slide item={item}/>}/>

  {
    currentSlideIndex == 0 ? (
      <>         
        <KeyboardAvoidingView style={{ position:'absolute',
          bottom:height*0.21,width:'100%',flexDirection:'row',justifyContent:'space-around', height:Platform.OS === 'ios' ? height*0.30 : height*0.38
          }} behavior={Platform.OS === 'ios' ? 'position' : "position"} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>

{Platform.OS === 'ios' ?(
    <>
      <BlurView
        style={{marginBottom:10}}
        tint="light"
        intensity={30}
        reducedTransparencyFallbackColor="white"
      >
        <Text style={styles.label}>Name</Text>
          <TextInput  
          selectionColor={'#064635'}
            value={Name}
            onChangeText={onNameChange}
            style={styles.input}
          />
          <Text style={styles.label}>Surname</Text>
            <TextInput  
            selectionColor={'#064635'}
              value={surname}
              onChangeText={onSurnameChange}
              style={styles.input}
            />
      </BlurView>
    </>
  ):(
    <>
      <View
        style={{marginBottom:10, backgroundColor:'white',opacity:0.95, height:height*0.35}}>
        <Text style={styles.label}>Name</Text>
          <TextInput 
          selectionColor={'#064635'} 
            value={Name}
            onChangeText={onNameChange}
            style={styles.input}
          />
          <Text style={styles.label}>Surname</Text>
            <TextInput  
            selectionColor={'#064635'}
              value={surname}
              onChangeText={onSurnameChange}
              style={styles.input}
            />   
      </View>
    </>
  )
}
      </KeyboardAvoidingView>
      </>    
    ):(currentSlideIndex == 1 ? (
      <>
        <KeyboardAvoidingView style={{ position:'absolute',
          bottom:height*0.21,width:'100%',flexDirection:'row',justifyContent:'space-around'
          }} behavior={Platform.OS === 'ios' ? 'padding' : "padding"}>

{Platform.OS === 'ios' ?(
    <>
      <BlurView
        style={{marginBottom:10}}
        tint="light"
        intensity={30}
        reducedTransparencyFallbackColor="white"
      >
        <Text style={styles.label}>Age</Text>
          <TextInput
          selectionColor={'#064635'}  
          keyboardType='number-pad'
            value={age}
            onChangeText={onAgeChange}
            style={styles.input}
          />
          <Text style={styles.label}>Gender</Text>
          <DropDownPicker style={styles.dropdown} dropDownDirection="TOP"
            containerStyle={{width:width/1.2, alignSelf:'center'}}
            placeholder=""
            open={open}
            value={gender}
            items={items1}
            setOpen={setOpen}
            setValue={onGenderChange}
            setItems={setItems1}
          />
            <Text style={styles.label}>Handicap</Text>
            <TextInput 
            selectionColor={'#064635'}
            keyboardType='number-pad'  
              value={handicap}
              onChangeText={onHandicapChange}
              style={styles.input}
            />
      </BlurView>
    </>
  ):(
    <>
           <View
        style={{marginBottom:10, backgroundColor:'white',opacity:0.95, height:height*0.35}}>
        <Text style={styles.label}>Age</Text>
          <TextInput 
          selectionColor={'#064635'}
          keyboardType='number-pad' 
            value={age}
            onChangeText={onAgeChange}
            style={styles.input}
          />
          <Text style={styles.label}>Gender</Text>
          <DropDownPicker style={styles.dropdown} dropDownDirection="TOP"
            containerStyle={{width:width/1.2, alignSelf:'center'}}
            placeholder=""
            open={open}
            value={gender}
            items={items1}
            setOpen={setOpen}
            setValue={onGenderChange}
            setItems={setItems1}
          />
            <Text style={styles.label}>Handicap</Text>
            <TextInput 
            selectionColor={'#064635'} 
            keyboardType='number-pad' 
              value={handicap}
              onChangeText={onHandicapChange}
              style={styles.input}
            />  
      </View>
    </>
  )
}
      </KeyboardAvoidingView>
      </>
    ):(
      <>
          <KeyboardAvoidingView style={{ position:'absolute',
          bottom:height*0.21,width:'100%',flexDirection:'row',justifyContent:'space-around'
          }} behavior={Platform.OS === 'ios' ? 'padding' : "padding"}>

{Platform.OS === 'ios' ?(
    <>
      <BlurView
        style={{marginBottom:10}}
        tint="light"
        intensity={30}
        reducedTransparencyFallbackColor="white"
      >
        <Text style={styles.label}>Username</Text>
            <TextInput
            selectionColor={'#064635'}  
              value={username}
              onChangeText={onUsernameChange}
              style={styles.input}
            /> 
        <Text style={styles.label}>Email</Text>
          <TextInput  
          selectionColor={'#064635'}
          keyboardType='email-address'
            value={email}
            onChangeText={onEmailChange}
            style={styles.input}
          />

            <Text style={styles.label}>Password</Text>
            <View>
            <TextInput 
            selectionColor={'#064635'} 
              value={password}
              autoCapitalize='none'
              onChangeText={onPasswordChange}
              style={styles.input}
              secureTextEntry={secureEntry}
            />
            {secureEntry == true? (
              <>
            <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.70, marginTop:height*0.026}} onPress={onIconPressShow} >
          <Icon name='eye' size={30}/>   
          </TouchableOpacity>
          </>
            ):(
              <>
          <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.70, marginTop:height*0.026}} onPress={onIconPressHide} >
          <Icon name='eye-off' size={30}/>   
          </TouchableOpacity>
          </>
          )}
          </View>
      </BlurView>
    </>
  ):(
    <>
      <View
        style={{marginBottom:10, backgroundColor:'white',opacity:0.95, height:height*0.35}}>
        <Text style={styles.label}>Username</Text>
            <TextInput  
          
              value={username}
              onChangeText={onUsernameChange}
              style={styles.input}
            />
        <Text style={styles.label}>Email</Text>
          <TextInput 
           keyboardType='email-address' 
            value={email}
            onChangeText={onEmailChange}
            style={styles.input}
          />

            <Text style={styles.label}>Password</Text>
            <View>
            <TextInput  
              value={password}
              autoCapitalize='none'
              secureTextEntry={secureEntry}
              onChangeText={onPasswordChange}
              style={styles.input}
            /> 
                      {secureEntry == true? (
              <>
            <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.70, marginTop:height*0.026}} onPress={onIconPressShow} >
          <Icon name='eye' size={30}/>   
          </TouchableOpacity>
          </>
            ):(
              <>
          <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.70, marginTop:height*0.026}} onPress={onIconPressHide} >
          <Icon name='eye-off' size={30}/>   
          </TouchableOpacity>
          </>
          )}
          </View> 
      </View>
    </>
  )
}
      </KeyboardAvoidingView>
      </>
    ))
  }
      <Footer />
    </SafeAreaView>
  ); 
}

  //Styling
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    logoimg:{
        alignSelf:'flex-start',
        marginTop:height*0.04
    },
    heading:{
        textAlign:'center',
        fontSize:32,
        fontFamily:'Allan'
      },
    input:{
      borderColor: "#68BF7B",
      borderWidth:3,
      marginTop:height/120,
      width: width/1.2,
      minHeight:height*0.070,
      alignSelf:'center',
      borderRadius:7,
      fontFamily:'Roboto',
      paddingLeft:10,
      fontSize:16
    },
    label:{
      textAlign:'left',
      marginTop:height*0.005,
      fontSize:16,
      fontFamily:'Roboto',
      width:width/1.2    
    },
    nextbtn:{
      backgroundColor: '#064635',
      width: width/1.2,
      height:60,
      alignSelf:'center',
      borderRadius:7 
    },
    nextbtnText:{
       textAlign:'center',
       paddingTop:13,
       color:'white',
       fontSize:26,
       fontFamily:'Allan'
    },
    indicator:{
      marginTop:-20,
      marginBottom:15,
      height:16,
      width:16,
      backgroundColor:'#68BF7B',
      marginHorizontal:3,
      borderRadius:8,
      opacity:0.6
    },
    bodyreg:{
        marginTop:height*0.012,
       marginLeft:width*0.2,
       fontFamily:'Roboto'   
    },
    bodylinkreg:{
      marginTop:height*0.012,
      color:'blue',
      marginLeft:2,
      textDecorationLine: 'underline',
      fontFamily:'Roboto'   
    },
     dropdown:{
      borderColor: "#68BF7B",
      borderWidth:3,
      marginTop:height/120,
      width: width/1.2,
      minHeight:height*0.070,
      alignSelf:'center',
      borderRadius:7,
      fontFamily:'Roboto',
      paddingLeft:10,
      fontSize:16 ,
      backgroundColor:'rgba(0, 0, 0, 0)'
    },
      disabled:{
        opacity:0.5,
        backgroundColor: '#064635',
        width: width/1.2,
        height:60,
        alignSelf:'center',
        borderRadius:7 
      }
  });
  

