
//Import Components
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';


//splashscreen timer
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);


//Import pages
import Startpage from './components/StartPage';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Profilepage from './components/Profile';
import Competitionreg from './components/Competitionreg';
import Competitionenter from './components/CompetitionEnter';
import Leaderboard from './components/Leaderboard';
import Golfcourse from './components/Golfcourse';



//firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Stack = createNativeStackNavigator();





//Content
export default function App() {





  

  const [ loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {

    //Listening to if our current User is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        //user is logged in

        setLoggedIn(true);
      }else{
        //user is logged out
        setLoggedIn(false);
      }
    })
    return unsubscribe;

  }, []);

console.log(loggedIn)


  
    //set state 
  const [isAppFirstLaunched, setisAppFirstLaunched] = React.useState(null);
  //useEffect to check if app opened for first time
  React.useEffect( () => {
    async function fetchData() {
      
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log(appData);
    //if app is opened for first time set state to true
    if( appData == null){
     
      setisAppFirstLaunched(true);
      //set item to false
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }else{
      setisAppFirstLaunched(false);
    }
  }
  fetchData()
  }, []); 

  const [IsReady, setIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };
  
  // if (!IsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadFonts}
  //       onFinish={() => setIsReady(true)}
  //       onError={() => {}}
  //     />
  //   );
  // }

//content Render
  return (
isAppFirstLaunched !=null && (// if opened for first time render startpage else skip start page

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
{loggedIn ? (
        <>
        
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Profile" component={Profilepage} />
        <Stack.Screen name="CompReg" component={Competitionreg}/>
        <Stack.Screen name="CompEnter" component={Competitionenter}/>
        <Stack.Screen name="Leaderboard" component={Leaderboard}/>
        <Stack.Screen name="Golfcourse" component={Golfcourse}/>
        </>
      ):(
        <>
        {isAppFirstLaunched && (
         <Stack.Screen  name="Startpage" component={Startpage} />
        )}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
     
        </>
        )}

      </Stack.Navigator>
      
    </NavigationContainer>
    )
  );

}
//Styling
const styles = StyleSheet.create({

});











//run project anywhere
//expo-cli start --tunnel

//API
//https://avatars.dicebear.com/styles/initials

//glassmorphism
//TODO: https://docs.expo.dev/versions/latest/sdk/linear-gradient/

//bottom drawer
//https://www.youtube.com/watch?v=KvRqsRwpwhY
//https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior

//active classes
//https://stackoverflow.com/questions/41224418/react-native-add-active-class-when-push-the-button

//reset pw
//https://firebase.google.com/docs/auth/web/manage-users
