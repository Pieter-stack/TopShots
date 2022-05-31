//Import Components
import react, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TextInput,Button } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';


//dropdown and datepicker
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

//Import fonts
import * as Font from 'expo-font';

//firebase
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import  {Timestamp} from 'firebase/firestore';//import firestore functions
import { createCompetition, getUser } from '../Database';

//Import images

import arrow from '../assets/images/blackarrow.png';
import imgplacehldr from '../assets/images/imgplaceholder.png';
import badgeimg from '../assets/images/badge.png';


DropDownPicker.setListMode("SCROLLVIEW");



//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

    //get fonts
    Font.loadAsync({
      'Allan' :require('../assets/fonts/Allan-Bold.ttf'),
      'Roboto': require('../assets/fonts/Roboto-Regular.ttf')
    });

//Content
export default function Competitionreg({navigation}) {


  //create new competition
  const createCompReg= async() =>{

    const data={
      title: title,
      description:description,
      venue:venue,
      age:age,
      gender:gender,
      rank:rank,
      date:date,
      dateCreated : Timestamp.fromDate(new Date()),
      maxplayers:maxplayers,
      hole:hole,
      //badge img
      //card img
    }

await createCompetition(data)

      navigation.pop()
}



    const [title, onTitleChange] = useState('');
    const [description, onDescriptionChange] = useState('');
    const [venue, onVenueChange] = useState('');
    const [maxplayers, onmaxplayersChange] = useState('');


    const [badge, onBadgeChange] = useState('');
    const [image, onImageChange] = useState('');




    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

//https://github.com/react-native-datetimepicker/datetimepicker

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };







    const [open, setOpen] = useState(false);
    const [age, onAgeChange] = useState(null);
    const [items, setItems] = useState([
      {label: '65+', value: '65+'},
      {label: '40-65', value: '40-65'},
      {label: '20-40', value: '20-40'},
      {label: 'Any', value: 'Any'}
    ]);


    const [open1, setOpen1] = useState(false);
    const [gender, onGenderChange] = useState(null);
    const [items1, setItems1] = useState([
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'},
      {label: 'Any', value: 'Any'}
    ]);

    const [open2, setOpen2] = useState(false);
    const [rank, onRankChange] = useState(null);
    const [item2, setItems2] = useState([
      {label: 'Any', value: 'Any'},
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'},
      {label: '4', value: '4'},
      {label: '5', value: '5'},
      {label: '6', value: '6'},
      {label: '7', value: '7'},
      {label: '8', value: '8'},
      {label: '9', value: '9'},
      {label: '10', value: '10'}
    ]);


    const [open3, setOpen3] = useState(false);
    const [hole, onHoleChange] = useState(null);
    const [items3, setItems3] = useState([
      {label: '18', value: '18'},
      {label: '9', value: '9'}
    ]);


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


     

  //Content Render
  return (
    <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
      
      
        <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Image source={arrow} style={{marginTop:11, alignSelf:'center'}} />
        </TouchableOpacity>
        <Text style={styles.heading}>Tournament form</Text>

        <View  style={{width:width, height:height*0.75, paddingTop:30, paddingBottom:30}} >

    <ScrollView >

    <Text style={styles.label}>Card Backdrop</Text>
    <View style={styles.backdrop}>

    <Image source={imgplacehldr} style={{position:'absolute',width:80, height:80, marginTop:20}}/>
    </View>


        <Text style={styles.label}>Title</Text>
          <TextInput  
            value={title}
            onChangeText={onTitleChange}
            style={styles.input}
          />

        <Text style={styles.label}>Description</Text>
          <TextInput  
            value={description}
            onChangeText={onDescriptionChange}
            style={styles.input}
          />



        <Text style={styles.label}>Venue</Text>
          <TextInput  
            value={venue}
            onChangeText={onVenueChange}
            style={styles.input}
          />    

<Text style={styles.label}>Max Players</Text>
          <TextInput  
            value={maxplayers}
            onChangeText={onmaxplayersChange}
            style={styles.input}
          />   


<Text style={styles.label}>Age</Text>
        <DropDownPicker style={styles.dropdown} dropDownDirection="TOP" 
        containerStyle={{width:width/1.2, alignSelf:'center'}}

        placeholder=""
        open={open}
        value={age}
        items={items}
        setOpen={setOpen}
        setValue={onAgeChange}
        setItems={setItems}
    />


<Text style={styles.label}>Gender</Text>
<DropDownPicker style={styles.dropdown} dropDownDirection="TOP"
containerStyle={{width:width/1.2, alignSelf:'center'}}

placeholder=""
open={open1}
value={gender}
items={items1}
setOpen={setOpen1}
setValue={onGenderChange}
setItems={setItems1}
/>

<Text style={styles.label}>Holes</Text>
<DropDownPicker style={styles.dropdown} dropDownDirection="TOP"
containerStyle={{width:width/1.2, alignSelf:'center'}}

placeholder=""
open={open3}
value={hole}
items={items3}
setOpen={setOpen3}
setValue={onHoleChange}
setItems={setItems3}
/>




            <Text style={styles.label}>Rank</Text>




            <DropDownPicker style={styles.dropdown} dropDownDirection="TOP"
        containerStyle={{width:width/1.2, alignSelf:'center'}}

        placeholder=""
        open={open2}
        value={rank}
        items={item2}
        setOpen={setOpen2}
        setValue={onRankChange}
        setItems={setItems2}
    />


        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:20}}>

          <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.button}>
          <Text style={styles.btntext}>Date</Text>
              </View>
          </TouchableOpacity >

          <TouchableOpacity onPress={showTimepicker}>
          <View style={styles.button}>
          <Text style={styles.btntext}>Time</Text> 
              </View>
          </TouchableOpacity>


          </View>
          <Text style={styles.datetext}>{date.toLocaleString()}</Text>


          <Text style={styles.label}>Badge</Text>
    <View style={styles.badge}>
      <Image source={badgeimg}/>
      <Image source={imgplacehldr} style={{position:'absolute',width:80, height:80, marginTop:10}}/>

    </View>








</ScrollView>

{show && (
        <DateTimePicker display={Platform.OS === 'ios' ? 'spinner' : 'default' }  minimumDate={new Date(yyyy, mm-1, dd)}
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

</View>

<View style={{position:'absolute' , bottom:40, alignSelf:'center'}}>
            <TouchableOpacity onPress={createCompReg}>
              <View style={styles.hostbtn}>
              <Text style={styles.hosttext}>Host Tournament</Text>
          </View>
          </TouchableOpacity>
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
    marginTop:60, 
    zIndex:50,
    elevation:50
    
},
heading:{
    fontSize:30,
    fontFamily:'Allan',
    marginTop:66,
    textAlign:'center'
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
    marginTop:height*0.01,
    fontSize:16,
    fontFamily:'Roboto',
    width:width/1.2,
    marginLeft:width*0.08   
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
    backgroundColor:'rgba(0, 0, 0, 0)',

  },  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  button:{
    flex:1,
    backgroundColor: "#68BF7B",
    marginTop:height/120,
    width: width*0.38,
    minHeight:height*0.070,
    borderRadius:7,
    fontFamily:'Roboto',
    paddingLeft:10,
    fontSize:16
  },
  btntext:{
    textAlign:'center',
    marginTop:10
  },
  btntext:{
    textAlign:'center',
    paddingTop:15,
    color:'white',
    fontSize:26,
    marginLeft:-5,
    fontFamily:'Allan' 
  },
  datetext:{
    textAlign:'center',
    paddingTop:15,
    color:'black',
    fontSize:26,
    marginLeft:-5,
    fontFamily:'Allan' 
  },
  backdrop:{
    width:'83%',
    height:120,
    backgroundColor:'#68BF7B',
    borderRadius:10,
    alignSelf:'center',
    alignItems:'center'
  },
  badge:{
    width:'100%',
    height:100,
    alignItems:'center',
    borderRadius:10,
    alignSelf:'center'
  },
  hostbtn:{
    backgroundColor: '#064635',
    width: width*0.84,
    height:60,
    alignSelf:'center',
    borderRadius:7 
  },
  hosttext:{
    textAlign:'center',
    paddingTop:13,
    color:'white',
    fontSize:26,
    fontFamily:'Allan' 
  },
});
