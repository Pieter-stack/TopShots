//Import Components
import React, { useState,useMemo } from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput,FlatList,Footer,Alert, KeyboardAvoidingView } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';

//firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';

//Import fonts
import * as Font from 'expo-font';

//Import Images
import logo from '../assets/images/logo.png';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//set image responsiveness
var imagewidth =  Math.round(width*0.8);
var imageHeight = Math.round(height*0.26);

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

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
  const [name, onNameChange] = useState('');
  const [surname, onSurnameChange] = useState('');
  const [age, onAgeChange] = useState('');
  const [gender, onGenderChange] = useState('');
  const [handicap, onHandicapChange] = useState('');
  const [email, onEmailChange] = useState('');
  const [username, onUsernameChange] = useState('');
  const [password, onPasswordChange] = useState('');



//onPress Register a user
const handleRegisterPress = () =>{

        //create user function  (auth instance, email, password)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
                 //executes when creation
                 const user = userCredentials.user;
                 Alert.alert("User" + user.uid);
                 navigation.replace('Login');
 
 
                 //TODO: add user to db
        })
        .catch((error) =>{
            //executes when failure
             Alert.alert(error.messsage);
        
        })


}

//slide render
const Slide = ({item}) => {
  return(
      <View style={{alignItems:'center'}}>
        <View style={{width}}>
          <Image source={item.image} style={{width: imagewidth,height: imageHeight, resizeMode:'contain', alignSelf:'center'}}/>
        </View>
          <Text style={styles.heading}>{item.title}</Text>
     </View>
  );
  };

  //footer render
  const Footer = () => {
    return(
      <View style={{height:Platform.OS === 'ios' ? height*0.15 : height*0.17 , width, paddingHorizontal:20, position:'absolute', marginTop:Platform.OS === 'ios' ? height*0.803 : height*0.84}}>
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
              <TouchableOpacity onPress={handleRegisterPress}>
                <View style={styles.nextbtn}>
                  <Text style={styles.nextbtnText}>Finish</Text>    
                </View>
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
          }} behavior={Platform.OS === 'ios' ? 'position' : "height"}>

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
            value={name}
            onChangeText={onNameChange}
            style={styles.input}
          />
          <Text style={styles.label}>Surname</Text>
            <TextInput  
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
            value={name}
            onChangeText={onNameChange}
            style={styles.input}
          />
          <Text style={styles.label}>Surname</Text>
            <TextInput  
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
          }} behavior={Platform.OS === 'ios' ? 'padding' : "height"}>

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
            value={age}
            onChangeText={onAgeChange}
            style={styles.input}
          />
          <Text style={styles.label}>Gender</Text>
            <TextInput  
              value={gender}
              onChangeText={onGenderChange}
              style={styles.input}
            />
            <Text style={styles.label}>Handicap</Text>
            <TextInput  
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
            value={age}
            onChangeText={onAgeChange}
            style={styles.input}
          />
          <Text style={styles.label}>Gender</Text>
            <TextInput  
              value={gender}
              onChangeText={onGenderChange}
              style={styles.input}
            />
            <Text style={styles.label}>Handicap</Text>
            <TextInput  
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
          }} behavior={Platform.OS === 'ios' ? 'padding' : "height"}>

{Platform.OS === 'ios' ?(
    <>
      <BlurView
        style={{marginBottom:10}}
        tint="light"
        intensity={30}
        reducedTransparencyFallbackColor="white"
      >
        <Text style={styles.label}>Email</Text>
          <TextInput  
            value={email}
            onChangeText={onEmailChange}
            style={styles.input}
          />
          <Text style={styles.label}>Username</Text>
            <TextInput  
              value={username}
              onChangeText={onUsernameChange}
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput  
              value={password}
              onChangeText={onPasswordChange}
              style={styles.input}
              secureTextEntry={true}
              errorStyle={{ color: 'red' }}
              errorMessage='Incorrect Username'
            />
      </BlurView>
    </>
  ):(
    <>
      <View
        style={{marginBottom:10, backgroundColor:'white',opacity:0.95, height:height*0.35}}>
        <Text style={styles.label}>Email</Text>
          <TextInput  
            value={email}
            onChangeText={onEmailChange}
            style={styles.input}
          />
          <Text style={styles.label}>Username</Text>
            <TextInput  
              value={username}
              onChangeText={onUsernameChange}
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput  
              value={password}
              onChangeText={onPasswordChange}
              style={styles.input}
            />  
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
      height:60,
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
    }
  });
  

