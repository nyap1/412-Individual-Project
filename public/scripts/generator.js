//databases references
var characters = db.collection("characters");
var actions = db.collection("actions");
var locations = db.collection("locations");



//html references
const characterDisplay = document.querySelector('#character-display');
const actionDisplay = document.querySelector('#action-display');
const locationDisplay = document.querySelector('#location-display');

//character generator
function generateCharacter(){
    //getting random character from the database

    characters.get().then((collection) => {  
        Math.seedrandom();                          
        var i = 0;
        var rand = Math.floor(Math.random() * collection.size);
        collection.forEach(function(doc) {
            if (i == rand) {
                // picked random item, snapshot.val().                          
                let character = doc.data().character;
                characterDisplay.innerHTML = character;
            }
            i++;
        });
    });    
}

//action generator
function generateAction(){
    //pull random action from the database

    actions.get().then((collection) => {  
        Math.seedrandom();                          
        var i = 0;
        var rand = Math.floor(Math.random() * collection.size);
        collection.forEach(function(doc) {
            if (i == rand) {
                // picked random item, snapshot.val().                          
                    let action = doc.data().action;
                    actionDisplay.innerHTML = action;
            }
            i++;
        });
    });  
}

//location generator

function generateLocation(){
    //pull random location from the database 

    locations.get().then((collection) => {  
        Math.seedrandom();                          
        var i = 0;
        var rand = Math.floor(Math.random() * collection.size);
        collection.forEach(function(doc) {
            if (i == rand) {
                // picked random item, snapshot.val().                          
                    let location = doc.data().location;
                    locationDisplay.innerHTML = location;
            }
            i++;
        });
    });  
}

//COLOUR PALETTE GENERATORS
    //random hex maker
    function getRandomHex() {
        var letters = '0123456789ABCDEF'.split('');
        var colour = '#';
        for (var i = 0; i < 6; i++){
            colour += letters[Math.floor(Math.random() * 16)];
        }
        return colour;
    }
    //grabbing the colour display elements
    const colour1Card = document.querySelector('.colour1-content');
    const colour2Card = document.querySelector('.colour2-content');
    const colour3Card = document.querySelector('.colour3-content');

    //generator for colour 1
    function generateColour1() {        
        var colour = getRandomHex();
        if(colour1Card.hasChildNodes()){
            //any run after the first
            const colour1Img = document.querySelector('#colour1-display');
            const colour1Hex = document.querySelector('#colour1-hex');
            colour1Img.src = 'https://www.thecolorapi.com/id?format=svg&hex=' + colour.substring(1);
            colour1Hex.innerHTML = '#' + colour.substring(1); 
        }
        else{
            //first run of the generator
            //hex
            var colour1Hex = document.createElement('p');
            colour1Hex.setAttribute('id', "colour1-hex") 
            colour1Hex.innerHTML = '#' + colour.substring(1); 
            //image 
            var colour1 = document.createElement('img');
            colour1.setAttribute('id', "colour1-display")
            colour1.src = 'https://www.thecolorapi.com/id?format=svg&hex=' + colour.substring(1);
            //adding to parent node
            colour1Card.appendChild(colour1);
            colour1Card.appendChild(colour1Hex);
        }
    }

    //generator for colour 2
    function generateColour2() {
        var colour = getRandomHex();
        if(colour2Card.hasChildNodes()){
            //any run after the first
            const colour2Img = document.querySelector('#colour2-display');
            const colour2Hex = document.querySelector('#colour2-hex');
            colour2Img.src = 'https://www.thecolorapi.com/id?format=svg&hex=' + colour.substring(1);
            colour2Hex.innerHTML = '#' + colour.substring(1); 
        }
        else{
            //first run of the generator
            //hex
            var colour2Hex = document.createElement('p');
            colour2Hex.setAttribute('id', "colour2-hex") 
            colour2Hex.innerHTML = '#' + colour.substring(1); 
            //image 
            var colour2 = document.createElement('img');
            colour2.setAttribute('id', "colour2-display")
            colour2.src = 'https://www.thecolorapi.com/id?format=svg&hex=' + colour.substring(1);
            //adding to parent node
            colour2Card.appendChild(colour2);
            colour2Card.appendChild(colour2Hex);
        }
    }

    //generator for colour 3
    function generateColour3() {
        var colour = getRandomHex();
        if(colour3Card.hasChildNodes()){
            //any run after the first
            const colour3Img = document.querySelector('#colour3-display');
            const colour3Hex = document.querySelector('#colour3-hex');
            colour3Img.src = 'https://www.thecolorapi.com/id?format=svg&hex=' + colour.substring(1);
            colour3Hex.innerHTML = '#' + colour.substring(1); 
        }
        else{
            //first run of the generator
            //hex
            var colour3Hex = document.createElement('p');
            colour3Hex.setAttribute('id', "colour3-hex") 
            colour3Hex.innerHTML = '#' + colour.substring(1); 
            //image 
            var colour3 = document.createElement('img');
            colour3.setAttribute('id', "colour3-display")
            colour3.src = 'https://www.thecolorapi.com/id?format=svg&hex=' + colour.substring(1);
            //adding to parent node
            colour3Card.appendChild(colour3);
            colour3Card.appendChild(colour3Hex);
        }
    }

