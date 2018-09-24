import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../firebase.config";

firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const signInGoogleWithPopup = () => auth.signInWithPopup(googleAuthProvider);

const signInGoogleWithRedirect = () =>
  auth.signInWithRedirect(googleAuthProvider);

// firebase collections
const usersCollection = db.collection("users");

export default {
  db,
  auth,
  signInGoogleWithRedirect,
  signInGoogleWithPopup,
  currentUser,
  usersCollection
};
