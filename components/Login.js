//Import Components
import React, { useState } from 'react';
import {Platform, StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, Alert , KeyboardAvoidingView } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';

//firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';

//Import Images
import logo from '../assets/images/logo.png';
import loginimg from '../assets/images/login.png';

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//set image responsiveness
 var imagewidth =  Math.round(width*0.8);
 var imageHeight = Math.round(height*0.3);

//Content
export default function Login({navigation}) {

  //set States
  const [email, onEmailChange]=useState("");
  const [password, onPasswordChange]=useState("");

  //onPress Login
  const handleLoginPress = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) =>{
        const user = userCredentials.user;
        navigation.replace('Homepage');
    })
    .catch((error) =>{
        Alert.alert('Wrong username or password.');
    })

  
  };
  //pw visibility toggle
  const [secureEntry, setSecureEntry] = useState(true);

  //pw visible
  const onIconPressShow = () =>{
  setSecureEntry(false);
  }
  //pw hidden
  const onIconPressHide = () =>{
    setSecureEntry(true);
  }


 //Content Render
    return (
      <SafeAreaView style={styles.container} >
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
          <Image source={logo} style={styles.logoimg}></Image>
          <Image source={loginimg} style={styles.loginimg}></Image>
          <Text style={styles.heading}>Welcome Back</Text>
        <KeyboardAvoidingView style={{ position:'absolute',bottom:height*0.21,width:'100%',flexDirection:'row',justifyContent:'space-around'}} behavior={Platform.OS === 'ios' ? 'position' : "padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
{Platform.OS === 'ios' ?(
  <>
    <BlurView
      style={{marginBottom:-15}}
      tint="light"
      intensity={30}
      reducedTransparencyFallbackColor="white"
    >
      <Text style={styles.label}>Email</Text>
      <TextInput  
        value={email}
        onChangeText={onEmailChange}
        style={styles.input}
        selectionColor={'#064635'}  
      />
      <Text style={styles.label}>Password</Text>
      <View>
        <TextInput  
          value={password}
          autoCapitalize='none'
          onChangeText={onPasswordChange}
          style={styles.input}
          secureTextEntry={secureEntry}
          selectionColor={'#064635'}  
        />
{secureEntry == true? (
  <>
    <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.95, marginTop:height*0.026}} onPress={onIconPressShow} >
      <Icon name='eye' size={30}/>   
    </TouchableOpacity>
  </>
):(
  <>
    <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.95, marginTop:height*0.026}} onPress={onIconPressHide} >
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
      style={{marginBottom:10, backgroundColor:'white',opacity:0.95, height:height*0.26}}
      blurType="light"
      blurAmount={30}
    >
      <Text style={styles.label}>Email</Text>
        <TextInput  
          value={email}
          onChangeText={onEmailChange}
          style={styles.input}
          selectionColor={'#064635'}  
      />
      <Text style={styles.label}>Password</Text>
      <View>
        <TextInput  
          value={password}
          autoCapitalize='none'
          onChangeText={onPasswordChange}
          style={styles.input}

          secureTextEntry={secureEntry}
          selectionColor={'#064635'}  
        />
{secureEntry == true? (
  <>
    <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.95, marginTop:height*0.025}} onPress={onIconPressShow} >
      <Icon name='eye' size={30}/>   
    </TouchableOpacity>
  </>
):(
  <>
    <TouchableOpacity  style={{position:'absolute', marginLeft:width*0.95, marginTop:height*0.025}} onPress={onIconPressHide} >
      <Icon name='eye-off' size={30}/>   
    </TouchableOpacity>
  </>
)}
  </View>
</View>
  </>
)}
  </KeyboardAvoidingView>
      <View style={{position:'absolute' , bottom:20}}>
        <TouchableOpacity disabled={!email || !password} onPress={handleLoginPress} style={!email || !password ? styles.disabled  : styles.loginbtn}> 
          <Text style={styles.loginbtnText}>Login</Text>
        </TouchableOpacity>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
            <Text style={styles.body}>Don't have an account?</Text>  
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.bodylink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView> 
);
}
  
  //Styling
  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    logoimg:{
        alignSelf:'flex-start',
        marginTop:height*0.05
    },
    loginimg:{
        alignSelf: 'center',
        marginTop:height*0.02,
       width: imagewidth,
       height: imageHeight   
    },
    heading:{
        textAlign:'center',
        marginTop:height*0.005,
        fontSize:36,
        fontFamily:'Allan',
        marginLeft:width*0.25,
        marginRight:width*0.25,
        width:width*1
      },
      input:{
        borderColor: "#68BF7B",
        borderWidth:3,
        marginTop:height*0.005,
        width: width*0.83,
        minHeight:height*0.075,
        alignSelf:'center',
        borderRadius:7,
        fontFamily:'Roboto',
        paddingLeft:10,
        fontSize:16
      },
      label:{
        textAlign:'left',
        marginTop:height/50,
        fontSize:16,
        marginLeft:width*0.25,
        marginRight:width*0.25,
        width:width*0.83, 
        fontFamily:'Roboto'  
      },
      loginbtn:{
        backgroundColor: '#064635',
        width: width*0.84,
        height:60,
        alignSelf:'center',
        borderRadius:7 
      },
      loginbtnText:{
        textAlign:'center',
        paddingTop:13,
        color:'white',
        fontSize:26,
        fontFamily:'Allan' 
      },
      body:{
        marginTop:height*0.012,
        fontFamily:'Roboto'
      },
      bodylink:{
        marginTop:height*0.012,
        color:'blue',
        marginLeft:2,
        textDecorationLine: 'underline',
        fontFamily:'Roboto'  
      },
      disabled:{
        opacity:0.5,
        backgroundColor: '#064635',
        width: width*0.84,
        height:60,
        alignSelf:'center',
        borderRadius:7 
      }
  });
  