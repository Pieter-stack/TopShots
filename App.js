
//Import Components
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

//splashscreen timer
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);


//Import pages
import Startpage from './components/StartPage'
import Login from './components/Login'
import Register from './components/Register'

const Stack = createNativeStackNavigator();






//Content
export default function App() {


  
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

//content Render
  return (
isAppFirstLaunched !=null && (// if opened for first time render startpage else skip start page

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        {isAppFirstLaunched && (   
          <Stack.Screen  name="Startpage" component={Startpage} />
        )}

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
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


//glassmorphism
//TODO: https://docs.expo.dev/versions/latest/sdk/linear-gradient/
