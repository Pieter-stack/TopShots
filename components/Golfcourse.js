//Import Components
import react, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TextInput,Button,Modal,Pressable, Alert } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';




//Import fonts
import * as Font from 'expo-font';

//firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


//Import images

import ham from '../assets/images/hambr.png';




//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

//Content
export default function Golfcourse({route, navigation}) {

    const currentcomp = route.params;
 
    const [modalVisible, setModalVisible] = useState(false);

  //Content Render
  return (
    <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>

        {/* <Text style={styles.heading}>{currentcomp.title}</Text> */}
        <TouchableOpacity style={styles.back} onPress={() => setModalVisible(true)}>
        <Image source={ham} style={{marginTop:11, alignSelf:'center'}} />
        </TouchableOpacity>


        
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.centeredView, {marginTop:Platform.OS === 'ios' ? height*0.06 : height*0.03 }]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    






       
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
    marginLeft:width*0.8,
    marginTop:height*0.075
},
  heading:{
      fontSize:20,
      fontWeight:'bold',
      marginTop:50

  },




  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }




  
});
