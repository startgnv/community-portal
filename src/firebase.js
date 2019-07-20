// firebase is loaded in the index.html page
const firebase = window.firebase;

export const db = firebase.firestore();
db.enablePersistence(); // enables offline data
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;
