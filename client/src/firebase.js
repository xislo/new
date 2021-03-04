import firebase from "firebase";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDCFE0TXMIGOwSJ02APhpzBN7AKuDl_CB0",
  authDomain: "xislo-platform.firebaseapp.com",
  databaseURL: "https://xislo-platform.firebaseio.com",
  projectId: "xislo-platform",
  storageBucket: "xislo-platform.appspot.com",
  messagingSenderId: "813907140268",
  appId: "1:813907140268:web:03c1bfa2edb1efca268909",
  measurementId: "G-PG0C7P1SHB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
