
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

//conditional navigation bar links
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user){
    //toggle UI elements (logged in)
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    //not logged in
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//processing prompt submissions
const subForm = document.querySelector('#prompt-form');
subForm.addEventListener('submit', (e) =>{
  e.preventDefault(); //stops the page from refreshing when the button is pressed.
  const modal = document.querySelector('#prompt-modal'); //for when it's time to close the modal
  //detecting which radio button is selected
  if (document.getElementById('character').checked){ //if character button is selected
    db.collection('characters').add({
      character: document.getElementById("promptIdea").value
    });
    //resetting the form
    document.getElementById("promptIdea").value = '';
    document.getElementById('form-display').innerHTML = "";
    
    //closing the modal
    M.Modal.getInstance(modal).close();

  } else if (document.getElementById('action').checked){ //if action is selected
    db.collection('actions').add({
      action: document.getElementById("promptIdea").value
    });
    //resetting the form
    document.getElementById("promptIdea").value = '';
    document.getElementById('form-display').innerHTML = "";
    //closing the modal
    M.Modal.getInstance(modal).close();

  } else if (document.getElementById('location').checked){ //if location is selected
    db.collection('locations').add({
      location: document.getElementById("promptIdea").value
    });
    //resetting the form
    document.getElementById("promptIdea").value = '';
    document.getElementById('form-display').innerHTML = "";
    //closing the modal
    M.Modal.getInstance(modal).close();
    
  } else { //for when no radio button is selected.
    document.getElementById('form-display').innerHTML = "please select a prompt type.";
  }

  //resetting the radio buttons
  var ele = document.getElementsByName("promptType");
  for(var i=0;i<ele.length;i++)
     ele[i].checked = false;
});

//actual generator usage
const characterRollBtn = document.querySelector('#character-reroll-btn');
const actionRollBtn = document.querySelector('#action-reroll-btn');
const locationRollBtn = document.querySelector('#location-reroll-btn');
const promptGeneratorBtn = document.querySelector('#prompt-generate-btn')

//whole prompt roller
promptGeneratorBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateCharacter();
  generateAction();
  generateLocation();
});

//character reroll
characterRollBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateCharacter();
});

//action reroll
actionRollBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateAction();
});

//location reroll
locationRollBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateLocation();
});

