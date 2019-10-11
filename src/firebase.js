// firebase is loaded in the index.html page
const firebase = window.firebase;

export const db = firebase.firestore();
db.enablePersistence({ experimentalTabSynchronization: true }); // enables offline data persistence and multi-tab support
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;
