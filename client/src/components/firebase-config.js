import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "nft-twitter-blocker",
    storageBucket: "nft-twitter-blocker.appspot.com",
    messagingSenderId: "947470924753",
    appId: "",
    measurementId: "G-PQN6JY4FE4"
  };

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app)
