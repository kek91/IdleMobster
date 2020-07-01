<template>
    <div>
        <h1>Firebase test</h1>
        <button v-on:click="backupData">
            <i class="fa fa-save"></i><br>
            <small>Save to cloud</small>
        </button>
    </div>
</template>

<script>
var firebase = require("firebase/app");
// require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBO4OiZBOx-bucCMfw-P52d9Xk1UdHdxxU",
  authDomain: "idlemobster.firebaseapp.com",
  databaseURL: "https://idlemobster.firebaseio.com",
  projectId: "idlemobster",
  storageBucket: "idlemobster.appspot.com",
  messagingSenderId: "161902708796",
  appId: "1:161902708796:web:b364ce7a68e84c18771b39",
  measurementId: "G-D1E6Y61DBH"
};
firebase.initializeApp(firebaseConfig);
var usersRef = firebase.database().ref("users");
// var messages

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

// writeUserData(1, 'kim', 'norkek@gmail.com', 'test.jpg');
// writeUserData(2, 'kim2', 'norkek@gmail.com', 'test.jpg');
// writeUserData(3, 'kim3', 'norkek@gmail.com', 'test.jpg');

// this.dbwrite();


export default {
    name: 'GameHeader',

    props: {
        showHelp: Boolean,
        name: String,
    },
    
    data: function() {
        return {
            
        }
    },

    firebase: {
        users: usersRef,
        // messages: messagesRef,
    },
    
    methods: {
        test() {
            console.log('test');
        },
        dbwrite() {
            firebase.database().ref('users/kek').set({
                username: "kim",
                email: "norkek@gmail.com",
            });
        },
        backupData() {
            usersRef.push({
                "name": this.name
            });
        },
        addUser: function() {
            if (this.isValid) {
              usersRef.push(this.newUser);
              this.newUser.name = "";
              this.newUser.email = "";
            }
        },
        removeUser: function(user) {
            usersRef.child(user[".key"]).remove();
        }
    }
}




</script>

