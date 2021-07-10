import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBLaG1HP2PGLVUvmZc037SCX9okS0JjOyE",
  authDomain: "clone-5bbc1.firebaseapp.com",
  databaseURL: "https://clone-5bbc1.firebaseio.com",
  projectId: "clone-5bbc1",
  storageBucket: "clone-5bbc1.appspot.com",
  messagingSenderId: "1033278289754",
  appId: "1:1033278289754:web:b7a26502b37d5ee3d8a563",
  measurementId: "G-YXXPKS0YKE",
};

// to initialize the firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// to create a store
const db = firebaseApp.firestore();
// for authontication
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
