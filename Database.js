import { auth, db } from "./firebase";
import  {doc, setDoc, Timestamp, collection, getDoc, getDocs,addDoc, onSnapshot} from 'firebase/firestore';//import firestore functions
import { querystring } from '@firebase/util';

export const createUserOnRegister = (user,Name, surname, handicap, username, age, gender) => {

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
    rank:1,
    badges:"",
    type:'user'
    //profile img


}

//set a doc : setDoc(docRef, data we want to set, any additional option like merge)
return setDoc(userRef, userData);

}

//get all the userdocuments
export const getUser = async () => {
  
 
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  
  
    let user = docSnap.data()
    return user; 

}


//new competition
export const createCompetition = (competition) =>{


    
  return addDoc(collection(db,'competitions'),competition)
}

//get competitions

export const getAllComps = async () => {

  const comps = [];

//get snapshot of our users collection
  const querySnapshot = await getDocs(collection(db, 'competitions'));


//need to loop through snapshot
  querySnapshot.forEach((doc) => {
      let comp = {...doc.data(), uid: doc.id}
      comps.push(comp);
  })

return comps;

}