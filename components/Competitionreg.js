//Import Components
import react, {useState, useEffect} from 'react';
import { StatusBar,StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity,ScrollView,TextInput,Button, Platform } from 'react-native';
import { Dimensions } from "react-native";
import { BlurView } from 'expo-blur';

//dropdown and datepicker and imagepicker
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

//firebase
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import  {addDoc, collection, doc, setDoc, Timestamp} from 'firebase/firestore';//import firestore functions
import { getUser } from '../Database';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

//Import images
import arrow from '../assets/images/blackarrow.png';
import imgplacehldr from '../assets/images/imgplaceholder.png';
import badgeimg from '../assets/images/badge.png';

//set how dropdown picker should look like
DropDownPicker.setListMode("SCROLLVIEW");

//Get width and height of device for responsiveness
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

//Content
export default function Competitionreg({navigation}) {

  //useState variables for images
  const [badge, setBadge] = useState(null);
  const [image, setImage] = useState(null);
  const [imageplace, setImageplace] = useState(null);

  //add competition function
  const addCompetition = async() =>{

     await handleImageUpload();
  }

  const fetchBlob = async (uri) => {
    console.log(`Fetching blob for URI: ${uri}`);
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch from URI: ${uri}`);
      }
      const blob = await response.blob();
      console.log('Blob fetched successfully');
      return blob;
    } catch (error) {
      console.error('Error fetching blob:', error.message);
      throw error;
    }
  };
  
  const handleImageUpload = async () => {
    if (!image || !badge) {
      console.log('Image or badge is not selected.');
      return;
    }
  
    console.log('Starting image upload process...');
  
    try {
      const imagebanner = ref(storage, `images/${title}banner.jpg`);
      const imagebadge = ref(storage, `images/${title}badge.jpg`);
  
      const blob = await fetchBlob(image);
      const blob2 = await fetchBlob(badge);
  
      console.log('Blobs converted successfully');
  
      try {
        const snapshotBanner = await uploadBytes(imagebanner, blob);
        const urlBanner = await getDownloadURL(snapshotBanner.ref);
        console.log('Banner image URL:', urlBanner);
  
        try {
          const snapshotBadge = await uploadBytes(imagebadge, blob2);
          const urlBadge = await getDownloadURL(snapshotBadge.ref);
          console.log('Badge image URL:', urlBadge);
  
          console.log('Preparing to write to Firestore...');
          const newDocRef = doc(collection(db, "competitions"));
          await setDoc(newDocRef, {
            title: title,
            description: description,
            venue: venue,
            age: age,
            gender: gender,
            rank: rank,
            date: date,
            dateCreated: Timestamp.fromDate(new Date()),
            maxplayers: parseInt(maxplayers),
            hole: hole,
            badge: urlBadge,
            image: urlBanner,
            currentplayers: 0,
            id: newDocRef.id,
            closed: "open",
            usersentered: [],
          });
  
          console.log('Firestore write complete');
  
          try {
            console.log('Navigating back...');
            navigation.pop();
            console.log('Navigation complete');
          } catch (error) {
            console.error('Error during navigation:', error.message);
          }
        } catch (error) {
          console.error('Error uploading badge image:', error.message);
        }
      } catch (error) {
        console.error('Error uploading banner image:', error.message);
      }
    } catch (error) {
      console.error('Error in image upload process:', error.message);
    }
  };
  
  
  
 
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      console.log('ImagePicker result:', result);
  
      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } else {
        console.log('Image selection cancelled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  const pickImage2 = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('ImagePicker result:', result);
  
      if (!result.canceled && result.assets.length > 0) {
        setBadge(result.assets[0].uri);
      } else {
        console.log('Badge selection cancelled');
      }
    } catch (error) {
      console.error('Error picking badge image:', error);
    }
  };
  

    //other use states 
    const [title, onTitleChange] = useState('');
    const [description, onDescriptionChange] = useState('');
    const [maxplayers, onmaxplayersChange] = useState('');


    //set date 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today = new Date().getTime();

  //set dates and modes 
    const [date, setDate] = useState(new Date(today));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //onchange function for date and time picker
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    //change mode of picker
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    //function to open phones date picker
    const showDatepicker = () => {
      showMode('date');
    };

    //function to open phones time picker
    const showTimepicker = () => {
      showMode('time');
    };

    //dropdown variables
    const [open, setOpen] = useState(false);
    const [age, onAgeChange] = useState(null);
    const [items, setItems] = useState([
      {label: '65+', value: '65+'},
      {label: '40-65', value: '40-65'},
      {label: '20-40', value: '20-40'},
      {label: 'Any', value: 'Any'}
    ]);

    //dropdown variables
    const [open1, setOpen1] = useState(false);
    const [gender, onGenderChange] = useState(null);
    const [items1, setItems1] = useState([
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'},
      {label: 'Any', value: 'Any'}
    ]);

    //dropdown variables
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

    //dropdown variables
    const [open3, setOpen3] = useState(false);
    const [hole, onHoleChange] = useState(null);
    const [items3, setItems3] = useState([
      {label: '18', value: '18'},
      {label: '9', value: '9'}
    ]);

    //dropdown variables
    const [open4, setOpen4] = useState(false);
    const [venue, onVenueChange] = useState(null);
    const [items4, setItems4] = useState([
      {label: 'Arabella Golf Estate', value: 'Arabella Golf Estate'},
      {label: 'Blair Atholl Golf Estate', value: 'Blair Atholl Golf Estate'},
      {label: 'Bonanza Golf Course', value: 'Bonanza Golf Course'},
      {label: 'Bryanston Country Club', value: 'Bryanston Country Club'},
      {label: 'De Zalze Golf Estate', value: 'De Zalze Golf Estate'},
      {label: 'Dainfern Golf Estate', value: 'Dainfern Golf Estate'},
      {label: 'Eagle Canyon Golf Estate', value: 'Eagle Canyon Golf Estate'},
      {label: 'Ebotse Golf Estate', value: 'Ebotse Golf Estate'},
      {label: 'Goose Valley Golf Estate', value: 'Goose Valley Golf Estate'},
      {label: 'Kingswood Golf Estate', value: 'Kingswood Golf Estate'},
      {label: 'Knysna Golf Club', value: 'Knysna Golf Club'},
      {label: 'Leopard Creek Golf Estate', value: 'Leopard Creek Golf Estate'},
      {label: 'Mossel Bay Golf Club', value: 'Mossel Bay Golf Club'},
      {label: 'Olivewood Golf Estate', value: 'Olivewood Golf Estate'},
      {label: 'Paarl Golf Club', value: 'Paarl Golf Club'}
    ]);

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
        <TouchableOpacity onPress={pickImage}>
          <Image source={{uri: image}} style={styles.imgback}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        selectionColor={'#064635'}   
        value={title}
        onChangeText={onTitleChange}
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput 
        selectionColor={'#064635'} 
        value={description}
        onChangeText={onDescriptionChange}
        style={styles.input}
      />
      <Text style={styles.label}>Venue</Text>
      <DropDownPicker style={styles.dropdown} dropDownDirection="TOP"
        containerStyle={{width:width/1.2, alignSelf:'center'}}
        placeholder=""
        open={open4}
        value={venue}
        items={items4}
        setOpen={setOpen4}
        setValue={onVenueChange}
        setItems={setItems4}
      />
      <Text style={styles.label}>Max Players</Text>
      <TextInput 
        selectionColor={'#064635'} 
        keyboardType='number-pad'  
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
        <TouchableOpacity style={{justifyContent: 'center'}} onPress={showDatepicker}>
          <View style={styles.button}>
            <Text style={styles.btntext}>Date</Text>
          </View>
        </TouchableOpacity >
        <TouchableOpacity  style={{justifyContent: 'center'}} onPress={showTimepicker}>
          <View style={styles.button}>
            <Text style={styles.btntext}>Time</Text> 
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.datetext}>{date.toLocaleString()}</Text>
      <Text style={styles.label}>Badge</Text>
      <View style={styles.badge}>
        <Image source={badgeimg}/>
{imageplace == null ? (
  <>
    <Image source={imgplacehldr} style={{position:'absolute',width:80, height:80, marginTop:10}}/>
  </>
):(
  <>
  </>
)}
    <TouchableOpacity onPress={pickImage2}>
      <Image source={{uri: badge}} style={styles.imgbadge}/>
    </TouchableOpacity>
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
    <TouchableOpacity  onPress={addCompetition} style={!title || !description || !venue || !maxplayers || !age || !gender || !hole || !rank || !date || badge=='/' || image =='/' ? styles.disabled  : styles.hostbtn}>
      <Text style={styles.hosttext}>Host Tournament</Text>
    </TouchableOpacity>
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
    backgroundColor:'rgba(0, 0, 0, 0)'
  }, 
   datePickerStyle: {
    width: 200,
    marginTop: 20
  },
  button:{
    flex:1,
    backgroundColor: "#68BF7B",
    marginTop:height/120,
    width: width*0.38,
    height:60,
    borderRadius:7,
    fontFamily:'Roboto',
    paddingLeft:10,
    fontSize:16
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
  imgback:{
    width:width*0.83,
     height:120,
      borderRadius:10,
      alignSelf:'center'
  },
  imgbadge:{
    height:60,
    width:60,
    alignItems:'center',
    borderRadius:10,
    alignSelf:'center',
    
     marginTop:-85
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
