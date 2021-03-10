import firebase from 'firebase';

const CLIENT_CONFIG = {
  apiKey: 'AIzaSyAGzjWZ6MqXiYrLZkw7711MgwzjN31vZww',
  authDomain: 'startupgnv-39bca.firebaseapp.com',
  databaseURL: 'https://startupgnv-39bca.firebaseio.com',
  projectId: 'startupgnv-39bca',
  storageBucket: 'startupgnv-39bca.appspot.com',
  messagingSenderId: '585426519184',
  appId: '1:585426519184:web:d8c31ab5c2685705'
};

if (!firebase.apps.length) {
  firebase.initializeApp(CLIENT_CONFIG);
  // firebaseClient
  //   .auth()
  //   .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  // window.firebase = firebaseClient;
}

export default firebase;
