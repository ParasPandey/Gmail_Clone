import firebase from "firebase";
const firebaseConfig = {
//   your firebase config
};

// to initialize the firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// to create a store
const db = firebaseApp.firestore();
// for authontication
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
