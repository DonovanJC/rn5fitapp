import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBE68oZC9HlIIPicS8YrNdWGmQJYTO0oCA",
    authDomain: "myfitapp-627af.firebaseapp.com",
    projectId: "myfitapp-627af",
    storageBucket: "myfitapp-627af.appspot.com",
    messagingSenderId: "278269057846",
    appId: "1:278269057846:web:3e4a1c4a1f4c2c4f82b197",
    measurementId: "G-WWXJNVZH9Q"
};

let Firebase;

if(firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig)
}

export default Firebase;



