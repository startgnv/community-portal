// firebase is loaded in the index.html page
const firebase = typeof window !== 'undefined' ? window.firebase : null;

export const db = firebase ? firebase.firestore() : null;
// db.enablePersistence({ synchronizeTabs: true }); // enables offline data persistence and multi-tab support
export const auth = firebase ? firebase.auth() : null;
export const storage = firebase ? firebase.storage() : null;
export const functions = firebase ? firebase.functions() : null;
// Uncomment this to run/test functions locally
// functions.useFunctionsEmulator("http://localhost:5001");
export default firebase;
