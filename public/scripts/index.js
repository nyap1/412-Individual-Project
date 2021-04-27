
var firebaseConfig = {
  apiKey: "AIzaSyCsjzeGbTVxJwMlO5qJkRiIO9xTB_sM3_k",
  authDomain: "apcp-generator.firebaseapp.com",
  databaseURL: "https://apcp-generator.firebaseio.com",
  projectId: "apcp-generator",
  storageBucket: "apcp-generator.appspot.com",
  messagingSenderId: "715065907857",
  appId: "1:715065907857:web:565c06a9eef5b2cd0ffd30",
  measurementId: "G-P5GKQLBGCT"
};

try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

//authentication and firestore database objects
const auth = firebase.auth();
const db = firebase.firestore();

db.settings({timestampsInSnapshots:true});