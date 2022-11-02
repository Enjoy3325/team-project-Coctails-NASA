import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged,
  signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import Notiflix from 'notiflix';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMRNnOmbURX8S518NpeufQIWRUsMfJcLs",
  authDomain: "cocktails-app-33ae0.firebaseapp.com",
  projectId: "cocktails-app-33ae0",
  storageBucket: "cocktails-app-33ae0.appspot.com",
  messagingSenderId: "548673926993",
  appId: "1:548673926993:web:d83632f9f14fd47ab98570",
  databaseURL: 'https://cocktails-app-33ae0-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()

let name = 'default Name'


let registerForm = document.querySelector('.auth-form.register')
let loginForm = document.querySelector('.auth-form.login')
let loginBtn = document.querySelector('.loginButton')
let logoutBtn = document.querySelector('.logoutButton')
let logoutBtnImg = document.querySelector('.logoutButton__img')
let favBtn = document.querySelector('.btn .btn--white')

registerForm.addEventListener('submit', e=> {
  e.preventDefault();
  name = e.target[0].value
  let email = e.target[1].value
  let password = e.target[2].value
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: name,
        email: email
      }).then()
      Notiflix.Notify.info(`User ${name} created`)
    })
    // .then(()=> {
    //   updateProfile(auth.currentUser, {
    //     displayName: 'name'
    //   }).then(() => {
    //     alert('Profile updated!')
    //     // Profile updated!
    //     // ...
    //   }).catch((error) => {
    //     // An error occurred
    //     // ...
    //   });
    // })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.failure(errorMessage)
    });
})

loginForm.addEventListener('submit', e=> {
  e.preventDefault();
  let email = e.target[0].value
  let password = e.target[1].value
  console.log(name, email, password)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Notiflix.Notify.info(`U, r in`)
    })
    // .then(()=> {
    //   updateProfile(auth.currentUser, {
    //     displayName: name
    //   }).then((name) => {
    //     alert('Profile updated!')
    //     // Profile updated!
    //     // ...
    //   }).catch((error) => {
    //     // An error occurred
    //     // ...
    //   });
    // })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notiflix.Notify.failure(errorMessage)
    });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.classList.add('is-hidden')
    logoutBtn.classList.remove('is-hidden')
    logoutBtn.insertAdjacentHTML('afterbegin', user.email)
  } else {
    logoutBtn.classList.add('is-hidden')
    loginBtn.classList.remove('is-hidden')
    logoutBtn.innerHTML = ''
  }
});


logoutBtn.addEventListener('click', ()=>{
  signOut(auth).then(
    ()=> {
      Notiflix.Notify.info(`U r out`)
    }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  }
  )
})

