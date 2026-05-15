import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  update,
  onValue
} from
"https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCURdF9psthB9rPQCmBei0cl3yH2jhkVSk",
  authDomain: "tombola-online-f6bf2.firebaseapp.com",
  databaseURL: "https://tombola-online-f6bf2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tombola-online-f6bf2",
  storageBucket: "tombola-online-f6bf2.appspot.com",
  messagingSenderId: "203187411978",
  appId: "1:203187411978:web:d4be2b38e060afa1f013f3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, update, onValue };
