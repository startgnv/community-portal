import firebase from 'firebase';
import firebaseConfig from 'firebase-config.json';
import 'firebase/storage';

const CLIENT_CONFIG = firebaseConfig.result.sdkConfig;

if (!firebase.apps.length) {
  let config = {
    projectId: 'startupgnv-39bca',
    appId: '1:585426519184:web:d8c31ab5c2685705',
    databaseURL: 'https://startupgnv-39bca.firebaseio.com',
    storageBucket: 'startupgnv-39bca.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAGzjWZ6MqXiYrLZkw7711MgwzjN31vZww',
    authDomain: 'startupgnv-39bca.firebaseapp.com',
    messagingSenderId: '585426519184'
  };
  if (
    typeof window === 'undefined' ||
    window.location.origin !== 'https://startgnv.com'
  )
    config = {
      apiKey: 'AIzaSyByhtSSBSLIO7D6I3vICW2mPQ29iN91QG8',
      authDomain: 'startgnv-dev.firebaseapp.com',
      databaseURL: 'https://startgnv-dev.firebaseio.com',
      projectId: 'startgnv-dev',
      storageBucket: 'startgnv-dev.appspot.com',
      messagingSenderId: '511952319398',
      appId: '1:511952319398:web:e80ca3ee0508caf31cd567'
    };
  firebase.initializeApp(config);
}

export const db = firebase.firestore();
// // db.enablePersistence({ synchronizeTabs: true }); // enables offline data persistence and multi-tab support
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
// // Uncomment this to run/test functions locally
// // functions.useFunctionsEmulator("http://localhost:5001");
export default firebase;
