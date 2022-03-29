import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDOK9rXg5OKyKPkVWpUEkdgb-HM6R68b9Q',
  authDomain: 'linkedin-clone-34c3a.firebaseapp.com',
  projectId: 'linkedin-clone-34c3a',
  storageBucket: 'linkedin-clone-34c3a.appspot.com',
  messagingSenderId: '403517054199',
  appId: '1:403517054199:web:22711a325951e5e30c07f2',
  measurementId: 'G-RD57XW9906',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
