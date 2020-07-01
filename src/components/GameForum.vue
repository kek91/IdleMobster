<template>
    <div>

        <div style="float:left; width:20%;">

            <button v-on:click="closeForum">
                <i class="fa fa-door-open fa-3x"></i><br>
                <small>Exit forum</small>
            </button><br><br>
            
            <button v-on:click="toggleSubForum('General')" style="width:100%; height:100%; padding:20px;">General</button>
            <button v-on:click="toggleSubForum('OC')" style="width:100%; height:100%; padding:20px;">OC</button>
            <button v-on:click="toggleSubForum('Family')" style="width:100%; height:100%; padding:20px;">Family</button>
            <button v-on:click="toggleSubForum('Offtopic')" style="width:100%; height:100%; padding:20px;">Offtopic</button>

            <p>
                Please be civil to eachother in the forum or you may be banned.<br><br>
                Posting as<br>
                <b>{{ name }}</b><br><br>
                Open Settings if you'd like to change your name.
            </p>

        </div>

        <div style="float:right; width:80%;">

            <div v-if="showForumGeneral">
                <h2 style="text-align:center;">General</h2>
                <div v-for="{ts,user,email,cat,msg,index} in forumPosts" :key="index">
                    <div v-if="cat == 'General'" style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                        <b style="background:#555; padding:10px; display:block;" v-bind:title="'Posted at ' + new Date(ts*1000)">{{ user }} <small>({{ email | censorEmail }})</small>:</b><br>
                        <span style="padding:10px; display:block;" v-html="msg.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2')"></span>
                    </div>
                </div>
                <div style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                    <b style="background:#555; padding:10px; display:block;">New post in General:</b><br>
                    <span style="padding:10px; display:block;">
                        <textarea v-model="postMsg" id="textareaPostMessage" placeholder="Message..."></textarea><br><br>
                        <button v-on:click="postMessage('General')"><i class="fa fa-check"></i> <small>{{ postSubmit }}</small></button>
                    </span>
                </div>
            </div>
            <div v-if="showForumOC">
                <h2 style="text-align:center;">OC</h2>
                <div v-for="{ts,user,cat,msg,index} in forumPosts" :key="index">
                    <div v-if="cat == 'OC'" style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                        <b style="background:#555; padding:10px; display:block;" v-bind:title="'Posted at ' + new Date(ts*1000)">{{ user }} <small>({{ email | censorEmail }})</small>:</b><br>
                        <span style="padding:10px; display:block;" v-html="msg.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2')"></span>
                    </div>
                </div>
                <div style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                    <b style="background:#555; padding:10px; display:block;">New post in OC:</b><br>
                    <span style="padding:10px; display:block;">
                        <textarea v-model="postMsg" id="textareaPostMessage" placeholder="Message..."></textarea><br><br>
                        <button v-on:click="postMessage('OC')"><i class="fa fa-check"></i> <small>{{ postSubmit }}</small></button>
                    </span>
                </div>
            </div>
            <div v-if="showForumFamily">
                <h2 style="text-align:center;">Family</h2>
                <div v-for="{ts,user,cat,msg,index} in forumPosts" :key="index">
                    <div v-if="cat == 'Family'" style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                        <b style="background:#555; padding:10px; display:block;" v-bind:title="'Posted at ' + new Date(ts*1000)">{{ user }} <small>({{ email | censorEmail }})</small>:</b><br>
                        <span style="padding:10px; display:block;" v-html="msg.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2')"></span>
                    </div>
                </div>
                <div style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                    <b style="background:#555; padding:10px; display:block;">New post in Family:</b><br>
                    <span style="padding:10px; display:block;">
                        <textarea v-model="postMsg" id="textareaPostMessage" placeholder="Message..."></textarea><br><br>
                        <button v-on:click="postMessage('Family')"><i class="fa fa-check"></i> <small>{{ postSubmit }}</small></button>
                    </span>
                </div>
            </div>
            <div v-if="showForumOfftopic">
                <h2 style="text-align:center;">Offtopic</h2>
                <div v-for="{ts,user,cat,msg,index} in forumPosts" :key="index">
                    <div v-if="cat == 'Offtopic'" style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                        <b style="background:#555; padding:10px; display:block;" v-bind:title="'Posted at ' + new Date(ts*1000)">{{ user }} <small>({{ email | censorEmail }})</small>:</b><br>
                        <span style="padding:10px; display:block;" v-html="msg.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2')"></span>
                    </div>
                </div>
                <div style="margin:10px; padding:5px; background:#444; border:1px solid #000;">
                    <b style="background:#555; padding:10px; display:block;">New post in Offtopic:</b><br>
                    <span style="padding:10px; display:block;">
                        <textarea v-model="postMsg" id="textareaPostMessage" placeholder="Message..."></textarea><br><br>
                        <button v-on:click="postMessage('Offtopic')"><i class="fa fa-check"></i> <small>{{ postSubmit }}</small></button>
                    </span>
                </div>
            </div>




        </div>

    </div>
</template>

<script>
import firebase from '../components/firebaseclient';
var forumRef = firebase.database().ref("forum");


export default {
    name: 'GameForum',

    props: {
        name: String,
        email: String,
    },
    
    data: function() {
        return {
            postCat: "",
            postMsg: "",
            postSubmit: "Post",
            showForumGeneral: true,
            showForumFamily: false,
            showForumOC: false,
            showForumOfftopic: false,
            forumPosts: [],
        }
    },

    firebase: {
        forum: forumRef,
    },
    
    methods: {
        
        closeForum() {
            this.$emit('toggleforum', 'close');
        },

        toggleSubForum(cat) {
            this.showForumGeneral = false;
            this.showForumFamily = false;
            this.showForumOC = false;
            this.showForumOfftopic = false;
            if(cat == 'General') { this.showForumGeneral = true; }  
            if(cat == 'Family') { this.showForumFamily = true; }  
            if(cat == 'OC') { this.showForumOC = true; }  
            if(cat == 'Offtopic') { this.showForumOfftopic = true; }  
        },

        postMessage(cat) {
            if(cat != "" && this.postMsg.trim().length > 1) {
                forumRef.push({
                    "ts": Math.floor(Date.now() / 1000),
                    "user": this.name,
                    "email": this.email,
                    "cat": cat,
                    "msg": this.postMsg
                });
                this.postMsg = "";
                this.postSubmit = "Saved!";
                setTimeout(() => {
                    this.postSubmit = "Post";
                }, 3000);
            }
            else {
                this.postSubmit = "You need to write something first...";
                setTimeout(() => {
                    this.postSubmit = "Post";
                }, 3000);
            }
        },

        loadMessages() {
            let msgs = [];
            forumRef.once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    msgs.push({
                        "ts": childSnapshot.val().ts,
                        "user": childSnapshot.val().user,
                        "email": childSnapshot.val().email,
                        "cat": childSnapshot.val().cat,
                        "msg": childSnapshot.val().msg
                    });
                });
            });
            this.forumPosts = msgs;
        },

        checkForNewMessages() {
            let msgs = [];
            forumRef.on("child_added", function(snapshot) {
                var newPost = snapshot.val();
                msgs.push({
                    "ts": newPost.ts,
                    "user": newPost.user,
                    "email": newPost.email,
                    "cat": newPost.cat,
                    "msg": newPost.msg
                });
            });
            this.forumPosts = msgs;
        }
        
    },

    mounted() {

        // this.loadMessages();
        this.checkForNewMessages();
    
    },

    filters: {
        censorEmail(val) {
            try {
                let arr = val.split("@");
                let wrd = arr[0][0] + "*".repeat(arr[0].length-2) + arr[0].slice(-1);
                let wrd2 = arr[1][0] + "*".repeat(arr[1].length-2) + arr[1].slice(-1);
                return wrd + "@" + wrd2;   
            } catch (error) {
                return "No email registered";
            }
        }
    },


}

/*
var censorWord = function (str) {
   return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
}

var censorEmail = function (email){
     var arr = email.split("@");
     return censorWord(arr[0]) + "@" + censorWord(arr[1]);
}
*/



</script>


<style scoped>
textarea {
    background:#444;
    border:1px solid #111;
    color:#eee;
    padding:4px;
    font-size:1em;
    width:100%;
    height:200px;
    font-family:Arial, Helvetica, sans-serif;
}
fieldset {
    border:1px solid #000;
}
</style>