import firebase from 'firebase';
import firebaseConfig from 'firebase-config.json';

const CLIENT_CONFIG = firebaseConfig.result.sdkConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(CLIENT_CONFIG);
  // firebaseClient
  //   .auth()
  //   .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  // window.firebase = firebaseClient;
}

export const db = firebase.firestore();
// // db.enablePersistence({ synchronizeTabs: true }); // enables offline data persistence and multi-tab support
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
// // Uncomment this to run/test functions locally
// // functions.useFunctionsEmulator("http://localhost:5001");
export default firebase;
