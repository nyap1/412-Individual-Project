var characters = db.collection("characters");

var key = characters.doc().id;

characters.where(admin.firestore.FieldPath.documentId(), '>=', key).limit(1).get()
.then(snapshot => {
    if(snapshot.size > 0) {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    }
    else {
        var character = characters.where(admin.firestore.FieldPath.documentId(), '<', key).limit(1).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
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