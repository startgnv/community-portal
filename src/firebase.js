import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: 'startupgnv-39bca.firebaseapp.com',
  databaseURL: 'https://startupgnv-39bca.firebaseio.com',
  projectId: 'startupgnv-39bca',
  storageBucket: 'startupgnv-39bca.appspot.com',
  messagingSenderId: '585426519184'
};

firebase.initializeApp(config);
export const db = firebase.firestore();
export default firebase;
