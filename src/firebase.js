import firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyBDXlOXdZc0YBlk381vSEz532xKtlFdpK4",
    authDomain: "flashcards-1ef94.firebaseapp.com",
    databaseURL: "https://flashcards-1ef94-default-rtdb.firebaseio.com",
    projectId: "flashcards-1ef94",
    storageBucket: "flashcards-1ef94.appspot.com",
    messagingSenderId: "517575217487",
    appId: "1:517575217487:web:d1c438865b09624ec4b53a"
  };

firebase.initializeApp(config);

export default firebase.database();