import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3uMHXMSaJLN8JMg-G2Mk7XAk_WhGZ_KU",
  authDomain: "onlpar.firebaseapp.com",
  projectId: "onlpar",
  storageBucket: "onlpar.appspot.com",
  messagingSenderId: "914322697858",
  appId: "1:914322697858:web:6b44944b5082d8bff20e9b",
  measurementId: "G-RH9K7VTEC1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth, firebase };