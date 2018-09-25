import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../firebase.config";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

firebase.firestore().enablePersistence();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const signInGoogleWithPopup = () => auth.signInWithPopup(googleAuthProvider);

const signInGoogleWithRedirect = () =>
  auth.signInWithRedirect(googleAuthProvider);

// firebase collections
const usersCollection = db.collection("users");
const instancesCollection = db.collection("instances");

export default {
  db,
  auth,
  signInGoogleWithRedirect,
  signInGoogleWithPopup,
  currentUser,
  usersCollection,
  instancesCollection
};
