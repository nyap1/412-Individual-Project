//Sign Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting the user's info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signing up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)

        const modal = document.querySelector('signup-modal');
        M.modal.getInstance(modal).close();
        signupForm.reset();
    })
})