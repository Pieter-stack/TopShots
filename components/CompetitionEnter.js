// Import Components
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// Firebase
import { auth, db } from '../firebase';

// Import images
import arrow from '../assets/images/backarrow.png';
import flag from '../assets/images/flag.png';
import { checkIfalreadyentered, enterCompetition, updatecompetitionUsersCount } from '../Database';
import { arrayUnion, collection, onSnapshot, query, where } from 'firebase/firestore';

// Convert seconds to date
const convertToDate = (seconds) => new Date(seconds * 1000).toLocaleString();

// Set variable name for today's date
const today = new Date().getTime();

// Get width and height of device for responsiveness
const { width, height } = Dimensions.get('window');

// Content
export default function Competitionenter({ route, navigation }) {
  // Set variables for route parameters and constant variables for DB calls
  const currentcomp = route.params;
  const id = currentcomp.id;
  const uid = auth.currentUser.uid;
  const venuelocation = currentcomp.venue;
  const titlecompetition = currentcomp.title;

  // Set state variables
  const [comps, setComps] = useState([]);
  const [active, setActive] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation reference for Lottie
  const animationRef = useRef(null);

  // Function to enter a competition
  const enterComp = async () => {
    await enterCompetition(id, venuelocation, titlecompetition);
    setActive("true");
    updatecompetitionUsersCount(id, { currentplayers: comps.currentplayers + 1, usersentered: arrayUnion(auth.currentUser.uid) });
  };

  // Get competition details and check if user has already joined
  useFocusEffect(
    React.useCallback(() => {
      const competitionCollectionRef = query(collection(db, "competitions"), where('id', "==", id));

      const unsubscribe = onSnapshot(competitionCollectionRef, (snapshot) => {
        snapshot.forEach((doc) => {
          let comp = { ...doc.data(), id: doc.id };
          setComps(comp);
        });
      });

      getjoined();
      return () => unsubscribe();
    }, [id])
  );

  // Function to check if user already joined competition
  const getjoined = async () => {
    const data = await checkIfalreadyentered(id);
    setActive(data === "true" ? "true" : "false");
  };

  // Handle animation completion
  const handleAnimationFinish = () => {
    setAnimationComplete(true);
  };

  useEffect(() => {
    if (animationComplete) {
      navigation.navigate("Leaderboard", comps);
    }
  }, [animationComplete, comps, navigation]);

  // Handle Lottie animation
  const handleLikeAnimation = () => {
    animationRef.current?.play();
    animationRef.current?.setSpeed(0.5);
  };

  // Render content
  return (
    <View style={styles.container}>
      {active === 'false' && animationComplete ==='true' ? (
        <>
          <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
          <Image source={{ uri: comps.image }} style={{ width, height, alignSelf: 'center', position: 'absolute', zIndex: -1 }} />
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', width, height, alignSelf: 'center', position: 'absolute', zIndex: 2 }}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Homepage")}>
              <Image source={arrow} style={{ marginTop: 11, alignSelf: 'center' }} />
            </TouchableOpacity>
            <Text style={styles.titles}>{comps.title}</Text>
            <Text style={styles.descrip}>{comps.description}</Text>
            <BlurView
              style={{ width: '100%', height: '50%', position: 'absolute', zIndex: 3, borderRadius: 15, overflow: 'hidden', bottom: 0 }}
              tint="light"
              intensity={50}
              reducedTransparencyFallbackColor="white"
            >
              <View style={{ flexDirection: 'row', flexShrink: 1, marginTop: 30 }}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.labeltext}>{convertToDate(comps.date.seconds)}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexShrink: 1, marginTop: 15 }}>
                <Text style={styles.label}>Venue:</Text>
                <Text style={styles.labeltext}>{comps.venue}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexShrink: 1, marginTop: 15 }}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.labeltext}>{comps.gender}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexShrink: 1, marginTop: 15 }}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.labeltext}>{comps.age}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexShrink: 1, marginTop: 15 }}>
                <Image source={flag} style={{ marginLeft: width * 0.08, marginTop: -3 }} />
                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Roboto', marginLeft: width * 0.01 }}>{comps.hole}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexShrink: 1, marginTop: -20 }}>
                <Text style={styles.max1}>{parseInt(comps.currentplayers)}</Text>
                <Text style={styles.max2}>/</Text>
                <Text style={styles.max3}>{parseInt(comps.maxplayers)}</Text>
              </View>
              {today > (comps.date.seconds * 1000) + 60480000 ? (
                <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                  <TouchableOpacity disabled={true}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Tournament Closed</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                today > comps.date.seconds * 1000 || comps.currentplayers === comps.maxplayers ? (
                  <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                    <TouchableOpacity disabled={true}>
                      <View style={styles.btn}>
                        <Text style={styles.btnText}>Entries Closed</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => {
                      enterComp();
                      handleLikeAnimation();
                    }}>
                      <View style={styles.btn}>
                        <Text style={styles.btnText}>Enter Tournament</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </BlurView>
          </View>
        </>
      ) : (
        <View style={{ justifyContent: 'center', width, height }}>
          <LottieView
            ref={animationRef}
            style={{ width: width, height: height, alignSelf: 'center' }}
            source={require('../assets/lottie/loaderlottie.json')}
            autoPlay
            loop={false}
            onAnimationFinish={handleAnimationFinish}
          />
        </View>
      )}
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginLeft: 5,
    marginTop: height * 0.075,
  },
  titles: {
    fontFamily: 'Allan',
    color: '#fff',
    fontSize: 30,
    marginTop: height * 0.15,
    marginLeft: width * 0.15,
  },
  descrip: {
    color: '#fff',
    fontFamily: 'Roboto',
    marginLeft: width * 0.15,
  },
  btn: {
    backgroundColor: '#064635',
    width: width * 0.84,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: width * 0.15,
  },
  labeltext: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  max1: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: width * 0.15,
  },
  max2: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  max3: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});
