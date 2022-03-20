import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-P6TIFTB3Dfnu-70UJdmlUDf3vaAKVdU",
    authDomain: "nft-twitter-blocker.firebaseapp.com",
    projectId: "nft-twitter-blocker",
    storageBucket: "nft-twitter-blocker.appspot.com",
    messagingSenderId: "947470924753",
    appId: "1:947470924753:web:654cf49032d297a08d3ef0",
    measurementId: "G-PQN6JY4FE4"
  };

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app)
