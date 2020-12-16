import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA4SV661zmnJSwpG701MWUCAqWcI_6Jj8k",
  authDomain: "catch-of-the-day-raghav-c7696.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-raghav-c7696.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//Named Export
export { firebaseApp };

//default export
export default base;
