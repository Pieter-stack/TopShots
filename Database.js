import { auth, db } from "./firebase";
import  {doc, setDoc, Timestamp, collection, getDoc, getDocs,addDoc, onSnapshot, query, where} from 'firebase/firestore';//import firestore functions
import { querystring } from '@firebase/util';

export const createUserOnRegister = (user,Name, surname, handicap, username, age, gender,pfp) => {

  //document reference : doc(firestore init, collection name , optional -- id of the document name/id)
  const userRef = doc(db, 'users', user.uid);


  //create data
const userData = {
    email: user.email,
    name:Name,
    surname:surname,
    handicap:handicap,
    username: username,
    age:age,
    gender:gender,   
    dateCreated : Timestamp.fromDate(new Date()),
    uid:user.uid,
    rank:'1',
    badges:"",
    type:'user',
    profile:pfp,
    imguploaded:'0'
    //profile img


}

//set a doc : setDoc(docRef, data we want to set, any additional option like merge)
return setDoc(userRef, userData);

}

//get all the userdocuments
// export const getUser = async () => {
  
 
//   const docRef = doc(db, "users", auth.currentUser.uid);
//   const docSnap = await getDoc(docRef);
  
  
//     let user = docSnap.data()
//     return user; 

// }

//returns our collection reference that we want to listen for real updates
 export const getUser = () =>{
  return query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
  
}


//new competition
export const createCompetition = (competition) =>{

  return addDoc(collection(db,'competitions'),competition)
}


//returns our collection reference that we want to listen for real updates
export const getAllCompsRealtime = () =>{
  return collection(db, 'competitions');
}

//get competitions

// export const getAllComps = async () => {

//   const comps = [];

// //get snapshot of our users collection
//   const querySnapshot = await getDocs(collection(db, 'competitions'));


// //need to loop through snapshot
//   querySnapshot.forEach((doc) => {
//       let comp = {...doc.data(), uid: doc.id}
//       comps.push(comp);
//   })

// return comps;

// }


//set our profiles data
export const updateProfile = (uid, data) =>{
  const userRef = doc(db, 'users', uid);
  return setDoc(userRef, data, {merge:true});//option to merge and not overrite

}

//enter a competition and get scorecard
export const enterCompetition =async (id) =>{


  const collectionRef = collection(db, "competitions/"+id+"/scorecard")

  
  //create data
  const entercomp = {
      uid: auth.currentUser.uid,
      hole1:'0',
      hole2:'0',
      hole3:'0',
      hole4:'0',
      hole5:'0',
      hole6:'0',
      hole7:'0',
      hole8:'0',
      hole9:'0',
      hole10:'0',
      hole11:'0',
      hole12:'0',
      hole13:'0',
      hole14:'0',
      hole15:'0',
      hole16:'0',
      hole17:'0',
      hole18:'0',

}

return addDoc(collectionRef, entercomp);
  
}


//see if user already entered that competition
export const checkIfalreadyentered = async (id) => {
  
  let join = []
  let joins = ''
  var BreakException = {};
  const collectionRef = collection(db, "competitions/"+id+"/scorecard")
  const collectionSnapshot = await getDocs(collectionRef)

  collectionSnapshot.forEach((doc) =>{
    join.push(doc.data())
  })
  

  try {
    join.forEach((joined)=>{
    console.log(joined.uid)
    if(joined.uid == auth.currentUser.uid){
      joins = "true"
      console.log("joins "+ joins);
    }else{
     
     joins = "false"
     console.log("joins"+ joins);
    }



    if(joined.uid == auth.currentUser.uid)throw BreakException;


  });
  } catch (e) {
    if (e !== BreakException) throw e;
  }


    

    
 
// })  
return joins;
}



