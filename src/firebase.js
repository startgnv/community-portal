// firebase is loaded in the index.html page
const firebase = window.firebase;

export const db = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true }); // enables offline data persistence and multi-tab support
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
// Uncomment this to run/test functions locally
// functions.useFunctionsEmulator("http://localhost:5001");
export default firebase;
