//listener for authentication status change
auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user logged in: ', user);
        setupUI(user);
    }else{
        setupUI();
        console.log('user logged out');
    }
});

//Sign Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting the user's info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signing up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {

        //closing the sign up modal
        const modal = document.querySelector('#signup-modal');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//Logging out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut();
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
    }) 
})
