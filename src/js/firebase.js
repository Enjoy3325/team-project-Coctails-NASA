import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import Notiflix from 'notiflix';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCMRNnOmbURX8S518NpeufQIWRUsMfJcLs',
  authDomain: 'cocktails-app-33ae0.firebaseapp.com',
  projectId: 'cocktails-app-33ae0',
  storageBucket: 'cocktails-app-33ae0.appspot.com',
  messagingSenderId: '548673926993',
  appId: '1:548673926993:web:d83632f9f14fd47ab98570',
  databaseURL:
    'https://cocktails-app-33ae0-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let registerForm = document.querySelector('.auth-form.register');
let loginForm = document.querySelector('.auth-form.login');
let loginBtn = document.querySelector('.loginButton');
let logoutBtn = document.querySelector('.logoutButton');
let loginBtnMob = document.querySelector('.mob-menu-loginButton');
let logoutBtnMob = document.querySelector('.mob-menu-logoutButton');

function createUserData(name, email, userId) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
    favoriteCocktails: [{ favoriteCocktailsArr: 'qwerty' }],
    favoriteIngredients: [{ favoriteCocktailsArr: 'qwerty' }],
  })
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => Notiflix.Notify.info(`User ${name} created`))
        .catch(error => {
          const errorMessage = error.message;
          Notiflix.Notify.failure(errorMessage);
        });
    })
    .then(() => getUserCocktails());
}

function getUserCocktails() {
  const dbRef = ref(getDatabase());
  const userId = localStorage.getItem('userId');
  get(child(dbRef, 'users/' + userId)).then(snapshot => {
    if (snapshot.exists()) {
      console.log('snapshot', snapshot, snapshot.val());

      const favoriteCocktails =
        snapshot
          .val()
          .favoriteCocktails?.filter(
            el => el.favoriteCocktailsArr !== 'qwerty'
          ) || [];

      localStorage.setItem(
        'favoriteCocktails',
        JSON.stringify(favoriteCocktails)
      );
      localStorage.setItem(
        'favoriteIngredients',
        JSON.stringify(favoriteCocktails)
      );
    } else {
      alert('No data found');
    }
  });
}

// getUserCocktails()

export function updateUserCocktails() {
  const userId = localStorage.getItem('userId');
  update(ref(database, 'users/' + userId), {
    favoriteCocktails: JSON.parse(
      localStorage.getItem('favoriteCocktails') || '[]'
    ),
  }).then(() => {
    Notiflix.Notify.info(`User data updated`);
  });
}

export function updateUserIngredients() {
  const userId = localStorage.getItem('userId');
  update(ref(database, 'users/' + userId), {
    favoriteIngredients: JSON.parse(
      localStorage.getItem('favoriteIngredients') || '[]'
    ),
  }).then(() => {
    Notiflix.Notify.info(`User data updated`);
  });
}

// updateUserCocktails()

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  let name = e.target[0].value;
  let email = e.target[1].value;
  let password = e.target[2].value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const userId = userCredential.user.uid;
      createUserData(name, email, userId);
      localStorage.setItem('user', name);
    })
    .then(() =>
      document.querySelector('[data-auth-modal]').classList.add('is-hidden')
    )
    .catch(error => {
      const errorMessage = error.message;
      Notiflix.Notify.failure(errorMessage);
    });
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  let email = e.target[0].value;
  let password = e.target[1].value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user.displayName;
      Notiflix.Notify.info(`Welcome, ${user}! U r in`);
    })
    .then(() =>
      document.querySelector('[data-auth-modal]').classList.add('is-hidden')
    )
    .catch(error => {
      const errorMessage = error.message;
      Notiflix.Notify.failure(errorMessage);
    });
});

onAuthStateChanged(auth, user => {
  if (user) {
    let userName = user.displayName || 'LOGIN';
    loginBtn.classList.add('is-hidden');
    loginBtnMob.classList.add('is-hidden');
    logoutBtn.classList.remove('is-hidden');
    logoutBtnMob.classList.remove('is-hidden');
    logoutBtn.insertAdjacentHTML('afterbegin', userName);
    logoutBtnMob.insertAdjacentHTML('afterbegin', user.displayName);
    document.querySelector('body').classList.remove('no-scroll');
    localStorage.setItem('isAuth', 'true');
    document
      .querySelectorAll('.btn--white')
      .forEach(item => item.classList.remove('is-hidden'));
    document.querySelector('#favorites').classList.remove('is-hidden');
    document.querySelector('#favorites-mob').classList.remove('is-hidden');
  } else {
    // updateUserCocktails();
    logoutBtn.classList.add('is-hidden');
    logoutBtnMob.classList.add('is-hidden');
    loginBtn.classList.remove('is-hidden');
    loginBtnMob.classList.remove('is-hidden');
    logoutBtn.innerHTML = '';
    logoutBtnMob.innerHTML = '';
    localStorage.setItem('isAuth', 'false');
    localStorage.setItem('userId', '');
    document
      .querySelectorAll('.btn--white')
      .forEach(item => item.classList.add('is-hidden'));
    document.querySelector('#favorites').classList.add('is-hidden');
    document.querySelector('#favorites-mob').classList.add('is-hidden');
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      Notiflix.Notify.info(`U r out`);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

logoutBtnMob.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      Notiflix.Notify.info(`U r out`);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
