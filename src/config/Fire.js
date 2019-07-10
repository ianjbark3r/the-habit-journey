import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCwp_XFhkXsm_1ImTYtIgTRWIOKoEep0kg",
  authDomain: "the-habit-journey.firebaseapp.com",
  databaseURL: "https://the-habit-journey.firebaseio.com",
  projectId: "the-habit-journey",
  storageBucket: "the-habit-journey.appspot.com",
  messagingSenderId: "535588335152",
  appId: "1:535588335152:web:98c0faae7f9875c1"
};

const fire = firebase.initializeApp(firebaseConfig)

export default fire;