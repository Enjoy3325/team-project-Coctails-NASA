import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMRNnOmbURX8S518NpeufQIWRUsMfJcLs",
  authDomain: "cocktails-app-33ae0.firebaseapp.com",
  projectId: "cocktails-app-33ae0",
  storageBucket: "cocktails-app-33ae0.appspot.com",
  messagingSenderId: "548673926993",
  appId: "1:548673926993:web:d83632f9f14fd47ab98570"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()


let registerForm = document.querySelector('.auth-form.register')
let loginForm = document.querySelector('.auth-form.login')
// let loginSubmit = document.querySelector('.auth-form__button')

registerForm.addEventListener('submit', e=> {
  e.preventDefault();
  let name = e.target[0].value
  let email = e.target[1].value
  let password = e.target[2].value
  console.log(name, email, password)
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`User ${name} created`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
      // ..
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
      alert(`U, ${name} r in`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})

