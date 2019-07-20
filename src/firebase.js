// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
/*
const config = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: 'startupgnv-39bca.firebaseapp.com',
  databaseURL: 'https://startupgnv-39bca.firebaseio.com',
  projectId: 'startupgnv-39bca',
  storageBucket: 'startupgnv-39bca.appspot.com',
  messagingSenderId: '585426519184'
};

firebase.initializeApp(config);

// initialize firebase
const s = document.createElement('script');
s.type = 'text/javascript';
s.src = '/__/firebase/init.js';
document.head.appendChild(s);
*/

const firebase = window.firebase;

export const db = firebase.firestore();
db.enablePersistence(); // enables offline data
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;
