import firebase from 'firebase'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDyy9rYfM9Duhvm51YMIRW-t9788iGlsQU",
    authDomain: "e-shop-a6489.firebaseapp.com",
    databaseURL: "https://e-shop-a6489.firebaseio.com",
    projectId: "e-shop-a6489",
    storageBucket: "e-shop-a6489.appspot.com",
    messagingSenderId: "822626229783",
    appId: "1:822626229783:web:e2c111a396e9af3ad38652"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  export {fb,db}