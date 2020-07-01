// import * as firebase from "firebase";
var firebase = require("firebase/app");
// require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();