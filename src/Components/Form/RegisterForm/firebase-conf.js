import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBjrgf31bj9DCaraGJ9xVHi1ua4k0Qpeo8",
  authDomain: "online-p-3ed3a.firebaseapp.com",
  projectId: "online-p-3ed3a",
  storageBucket: "online-p-3ed3a.appspot.com",
  messagingSenderId: "524593597895",
  appId: "1:524593597895:web:63fd9f1c61695f61f29de2"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app); 