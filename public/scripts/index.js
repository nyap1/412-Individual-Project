
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
const accountName = document.querySelector('#account');


const setupUI = (user) => {
  if (user){
    //acount info display
    const accountHtml = `<div>Logged in as ${user.email}</div>`;
    accountName.innerHTML = accountHtml;

    //toggle UI elements (logged in)
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    //not logged in
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//setting up the prompt history
const promptHistory= document.querySelector('#prompt-history-body');

const setupPromptHistory = (data) => {

  //clears the table when the function is called again when the database updates
  while(promptHistory.hasChildNodes()){
    promptHistory.removeChild(promptHistory.lastChild);
  }

  //populating the table
  data.forEach(doc =>{  

    //creating the table rows and content
    let tr = document.createElement('tr');
    let character = document.createElement('td');
    let action = document.createElement('td');
    let location = document.createElement('td');
    let deleter = document.createElement('td');

    //putting data in the elements
    tr.setAttribute('data-id', doc.id);
    character.textContent = doc.data().character;
    action.textContent = doc.data().action;
    location.textContent = doc.data().location;
    deleter.textContent = 'x';
    deleter.setAttribute('class', "waves-effect waves-light centered");

    //putting the table data in to the table row
    tr.appendChild(character);
    tr.appendChild(action);
    tr.appendChild(location);
    tr.appendChild(deleter);

    //putting the table row into the table
    promptHistory.appendChild(tr);

    //delete function
    deleter.addEventListener('click', (e)=> {
      M.toast({html: 'Prompt Deleted!'});
      let id = e.target.parentElement.getAttribute("data-id");
      db.collection('users/' + auth.currentUser.uid + '/prompts').doc(id).delete();
    });
  })
}

//setting up palette history
const paletteHistory= document.querySelector('#palette-history-body');

//clears the table when the function is called again when the database updates
const setupPaletteHistory = (data) => {
  while(paletteHistory.hasChildNodes()){
    paletteHistory.removeChild(paletteHistory.lastChild);
  }

  //populating the table
  data.forEach(doc =>{
    //creating the table rows
    let tr = document.createElement('tr');
    let colour1 = document.createElement('td');
    let colour2 = document.createElement('td');
    let colour3 = document.createElement('td');
    let deleter = document.createElement('td');

    //putting data in the elements
    tr.setAttribute('data-id', doc.id);
    colour1.innerHTML = `<img src=${doc.data().colour1}></img>`;
    colour2.innerHTML = `<img src=${doc.data().colour2}></img>`;
    colour3.innerHTML = `<img src=${doc.data().colour3}></img>`;
    deleter.textContent = 'x';
    deleter.setAttribute('class', "waves-effect waves-light");

    //adding the table data to the table row
    tr.appendChild(colour1);
    tr.appendChild(colour2);
    tr.appendChild(colour3);
    tr.appendChild(deleter);

    //adding the row to the table
    paletteHistory.appendChild(tr);

    //delete function
    deleter.addEventListener('click', (e)=> {
      M.toast({html: 'Palette Deleted!'}); 
      let id = e.target.parentElement.getAttribute("data-id");
      db.collection('users/' + auth.currentUser.uid + '/palettes').doc(id).delete();
    });
  });
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
    M.toast({html: 'Prompt Submitted! Thank you!'});

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

//colour palette generator usage
const colour1RollBtn = document.querySelector('#colour1-reroll-btn');
const colour2RollBtn = document.querySelector('#colour2-reroll-btn');
const colour3RollBtn = document.querySelector('#colour3-reroll-btn');
const paletteGeneratorBtn = document.querySelector('#palette-generate-btn')

//for the whole palette
paletteGeneratorBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateColour1();
  generateColour2();
  generateColour3();
});

//colour 1
colour1RollBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateColour1();
});

//colour 2
colour2RollBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateColour2();
});

//colour 3
colour3RollBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  generateColour3();
});

//save buttons and listeners
  const promptSaveBtn = document.querySelector('#prompt-save-btn');
  const paletteSaveBtn = document.querySelector('#palette-save-btn');

  promptSaveBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    //check if the displays are empty before saving
    if(document.getElementById('prompt-placeholder') == null){
      M.toast({html: 'Prompt Saved!'});
      savePrompt();
    }
    else{
      alert("Generate a prompt first!");
    }
  });

  paletteSaveBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    //check if the displays are empty before saving
    if(document.getElementById('colour1-display').src 
    || document.getElementById('colour2-display').src 
    ||document.getElementById('colour3-display').src){
      M.toast({html: 'Palette Saved!'});
      savePalette();
    }
    else{
      alert("Generate a palette first!");
    }
  });

//save functions
function savePrompt() {
  db.collection('users/' + auth.currentUser.uid + '/prompts')
  .add({
    character: document.getElementById('character-display').innerHTML,
    action: document.getElementById('action-display').innerHTML,
    location: document.getElementById('location-display').innerHTML
  });
}

function savePalette() {
  db.collection('users/' + auth.currentUser.uid + '/palettes')
  .add({
    colour1: document.getElementById('colour1-display').src,
    colour2: document.getElementById('colour2-display').src,
    colour3: document.getElementById('colour3-display').src
  });
}


