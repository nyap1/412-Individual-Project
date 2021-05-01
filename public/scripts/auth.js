
//listener for authentication status change
auth.onAuthStateChanged(user=>{
    if(user){
        //prompt history
        db.collection('users/' + auth.currentUser.uid + '/prompts').onSnapshot(snapshot=>{
            setupPromptHistory(snapshot.docs);
        });
        //palette history
        db.collection('users/' + auth.currentUser.uid + '/palettes').onSnapshot(snapshot=>{
            setupPaletteHistory(snapshot.docs);
        });
        
        setupUI(user);
    }else{
        setupUI();
        console.log('user logged out');
    }
});

//Sign Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();//prevents the page from refreshing

    //getting the user's info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signing up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            email: email
        });    
    }).then(()=>{
        //closing the sign up modal
        const modal = document.querySelector('#signup-modal');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
        M.toast({html: 'Account Created!'});
    }).catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

//Logging out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut();
    M.toast({html: 'Logged out!'});
});

//Logging in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //grabbing user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        console.log(cred.user);
        //closing the modal
        const modal = document.querySelector('#login-modal');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        M.toast({html: 'Logged In!'});
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    }); 
})
