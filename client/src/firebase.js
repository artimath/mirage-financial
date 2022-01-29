// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfigStaging = {
  apiKey: "AIzaSyAPEQpVwhkONAhl1rJObPm-9q6iv5UCyZE",
  authDomain: "if-tower-staging.firebaseapp.com",
  projectId: "if-tower-staging",
  storageBucket: "if-tower-staging.appspot.com",
  messagingSenderId: "1076818598599",
  appId: "1:1076818598599:web:344fdf3a4f2fdeee673ce2",
};

// Initialize Firebase
export const fireBaseApp = initializeApp(firebaseConfigStaging);

export const firestore = getFirestore();
// export const auth = app.auth();
// export const storage = app.storage();

// export const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   console.log("initiating google signon");
//   auth.signInWithPopup(provider);
// };
// export const handleSignout = () => {
//   auth.signOut();
// };

// window.firebase = firebase;

// export const createUserProfileDocument = async (user, additionalData) => {
//   if (!user) return;

//   // Get a reference to a place in the DB where a user profile might be.
//   const userRef = firestore.doc(`users/${user.uid}`);
//   console.log("User Ref", { userRef });

//   // Go and fetch the document from that location
//   const snapshot = await userRef.get();
//   console.log("Snaptshot", { snapshot });

//   if (!snapshot.exists) {
//     console.log("Snapshot does not exist!");
//     const { displayName, email, photoURL } = user;
//     const createdAt = new Date();
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         createdAt,
//         ...additionalData,
//       });
//       console.log("User Created!", { userRef });
//     } catch (error) {
//       console.error("Error creating user \n\n", error.message);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// export const getUserDocument = async (uid) => {
//   if (!uid) return null;
//   try {
//     return firestore.collection("users").doc(uid);
//   } catch (error) {
//     console.error("Error fetching user", error.message);
//   }
// };

export default fireBaseApp;
