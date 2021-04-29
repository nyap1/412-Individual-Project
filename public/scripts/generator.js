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

    var character_key = characters.doc().id; //generates a random id to compare to the databse

    characters.where(firebase.firestore.FieldPath.documentId(), '>=', character_key).limit(1).get()
                .then(snapshot => {
                    if(snapshot.size > 0) {
                        snapshot.forEach(doc => {
                            let character = `${doc.get("character")}`;
                            characterDisplay.innerHTML = character;
                        });
                    }
                    else {
                        var character = characters.where(firebase.firestore.FieldPath.documentId(), '<', character_key).limit(1).get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                let character = `${doc.get("character")}`;
                                characterDisplay.innerHTML = character;
                            });
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                    }
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
}

//action generator
function generateAction(){
    //pull random action from the database

    var action_key = actions.doc().id; //generates a random id to compare to the databse

    actions.where(firebase.firestore.FieldPath.documentId(), '>=', action_key).limit(1).get()
                .then(snapshot => {
                    if(snapshot.size > 0) {
                        snapshot.forEach(doc => {
                            let action = `${doc.get("action")}`;
                            actionDisplay.innerHTML = action;
                        });
                    }
                    else {
                        var action = actions.where(firebase.firestore.FieldPath.documentId(), '<', action_key).limit(1).get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                let action = `${doc.get("action")}`;
                                actionDisplay.innerHTML = action;
                            });
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                    }
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
}

//location generator

function generateLocation(){
    //pull random location from the database

    var location_key = locations.doc().id; //generates a random id to compare to the databse

    locations.where(firebase.firestore.FieldPath.documentId(), '>=', location_key).limit(1).get()
                .then(snapshot => {
                    if(snapshot.size > 0) {
                        snapshot.forEach(doc => {
                            let location = `${doc.get("location")}`;
                            locationDisplay.innerHTML = location;
                        });
                    }
                    else {
                        locations.where(firebase.firestore.FieldPath.documentId(), '<', location_key).limit(1).get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                let location = `${doc.get("location")}`;
                                locationDisplay.innerHTML = location;
                            });
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                    }
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
}