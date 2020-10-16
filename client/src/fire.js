// import firebase from 'firebase'
import firebase from 'firebase/app';
// import 'firebase/database'; // If using Firebase database
// import 'firebase/storage';  // If using Firebase storage
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions


 var firebaseConfig = {
    apiKey: "AIzaSyD_0EvG6-Ut_OW4AVksu6RBgJ67F9R9hTA",
    authDomain: "bidbot-2020.firebaseapp.com",
    databaseURL: "https://bidbot-2020.firebaseio.com",
    projectId: "bidbot-2020",
    storageBucket: "bidbot-2020.appspot.com",
    messagingSenderId: "587861691031",
    appId: "1:587861691031:web:0aa31eaae3596d981177d2",
    measurementId: "G-FXYZ6M9EPF"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
 

  export default fire;