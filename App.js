//Import Components
import React, {useEffect, useState} from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';

//splashscreen timer
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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
import { Platform } from 'react-native';

//Stack navigation
const Stack = createNativeStackNavigator();

//Content
export default function App() {

  //check and set if user is logged in or signed out
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
  
  //set state 
  const [isAppFirstLaunched, setisAppFirstLaunched] = React.useState(null);

  //useEffect to check if app opened for first time
  React.useEffect( () => {
    async function fetchData() {
      
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
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

//set fonts on all pages through hooks
  const [IsReady, SetIsReady] = useState(false);

//Load fonts
  const LoadFonts = async () => {
    await useFonts();
  };

  //check if fonts are ready 
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

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

//bottom drawer video working
//https://www.youtube.com/watch?v=KvRqsRwpwhY
