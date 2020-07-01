<template>
    <div>
        <div>
            <h2>Settings</h2>
            
            <button v-on:click="resetProgress">
                <i class="fa fa-trash fa-2x"></i><br>
                <small>Reset all progress</small>
            </button>
            <button v-on:click="saveData">
                <i class="fa fa-save fa-2x"></i><br>
                <small>Save</small>
            </button>
            <button v-on:click="loadData">
                <i class="fa fa-download fa-2x"></i><br>
                <small>Load</small>
            </button>
            <button v-on:click="saveDataCloud">
                <i class="fa fa-cloud-upload-alt fa-2x"></i><br>
                <small>Save to cloud</small>
            </button>
            <button v-on:click="loadDataCloud">
                <i class="fa fa-cloud-download-alt fa-2x"></i><br>
                <small>Load from cloud</small>
            </button>
            <button v-on:click="toggleMusic">
                <i class="fa fa-music fa-2x"></i><br>
                <small>Toggle music</small>
            </button>
            <button v-on:click="showChangeAccountDetails = !showChangeAccountDetails">
                <i class="fa fa-file-signature fa-2x"></i><br>
                <small>Change name/email</small>
            </button>
            <div v-if="showChangeAccountDetails">
                <input type="text" :value="name" @input="$emit('savename', $event.target.value)" placeholder="Vito Corleone">
                <input type="text" :value="email" @input="$emit('saveemail', $event.target.value)" placeholder="johndoe@example.com">
            </div>

        </div>
    </div>
</template>

<script>
import firebase from '../components/firebaseclient';
var usersRef = firebase.database().ref("users");


export default {
    name: 'GameSettings',
    props: {
        xp: Number,
        name: String,
        rank: String,
        prestige: Number,
        email: String,
    },
    data: function() {
        return {
            gamedata: "",
            showChangeAccountDetails: false,
        }
    },
    firebase: {
        users: usersRef
    },
    methods: {
        random: function(min,max) {
            return parseInt(Math.floor(Math.random()*(max-min+1)+min));
        },
        resetProgress: function() {
            // let confirmReset = confirm('Are you sure? All data will be lost!');
            let confirmReset = prompt('Please confirm you wish to delete all data by typing in "reset" in the text box:');
            if(confirmReset == "reset") {
                this.$emit('resetprogress', 1);
            }
        },
        saveData: function() {
            let data = {};
            data.name = localStorage.getItem('name') || "Unknown";
            data.xp = localStorage.getItem('xp') || 0;
            data.money = localStorage.getItem('money') || 100;
            data.health = localStorage.getItem('health') || 100;
            data.weapon = localStorage.getItem('weapon') || "None";
            data.car = localStorage.getItem('car') || "None";
            data.inventory = localStorage.getItem('inventory') || [];
            data.bullets = localStorage.getItem('bullets') || 0;
            data.prestige = localStorage.getItem('prestige') || 0;
            data.hotdogstands = localStorage.getItem('hotdogstands') || 0;
            data.gasstations = localStorage.getItem('gasstations') || 0;
            data.distilleries = localStorage.getItem('distilleries') || 0;
            data.casinos = localStorage.getItem('casinos') || 0;
            data.hotels = localStorage.getItem('hotels') || 0;
            data = btoa(JSON.stringify(data));
            this.gamedata = data;
            navigator.clipboard.writeText(data);
            this.$emit('clicked', 'The following string is your saved data:<br><br><pre style="overflow:auto;">'+data+'</pre><br>Copied to clipboard <i class="fa fa-check"></i><br><br>');
        },
        saveDataCloud() {
            let data = {};
            data.name = localStorage.getItem('name') || "Unknown";
            data.xp = localStorage.getItem('xp') || 0;
            data.money = localStorage.getItem('money') || 100;
            data.health = localStorage.getItem('health') || 100;
            data.weapon = localStorage.getItem('weapon') || "None";
            data.car = localStorage.getItem('car') || "None";
            data.inventory = localStorage.getItem('inventory') || [];
            data.bullets = localStorage.getItem('bullets') || 0;
            data.prestige = localStorage.getItem('prestige') || 0;
            data.hotdogstands = localStorage.getItem('hotdogstands') || 0;
            data.gasstations = localStorage.getItem('gasstations') || 0;
            data.distilleries = localStorage.getItem('distilleries') || 0;
            data.casinos = localStorage.getItem('casinos') || 0;
            data.hotels = localStorage.getItem('hotels') || 0;
            data = btoa(JSON.stringify(data));
            this.gamedata = data;
            if(this.email.length > 0) {
                usersRef.push({
                    "email": this.email,
                    "name": this.name,
                    "rank": this.rank,
                    "prestige": this.prestige,
                    "data": this.gamedata,
                    "ts": Math.floor(Date.now() / 1000),
                });
                this.$emit('clicked', 'Your gamedata has been saved to the cloud <i class="fa fa-check"></i><br>Registered to email address: <b>'+this.email+'</b>');
            }
            else {
                this.$emit('clicked', '<span class="text-danger">Couldn\'t save to the cloud.<br>Enter an email address first so we can link your cloud savedata to something.</span>');
            }
        },
        loadData: function() {
            let saveddata = prompt('Enter saved data to load:');
            if(saveddata) {
                this.$emit('loaddata', saveddata);
            }
        },
        loadDataCloud: function() {
            let currEmail = this.email;
            if(currEmail.length > 0) {
                let confirmLoad = confirm('Are you sure you want to load data from the cloud?\n\
    We will load the latest savegame registered to your email address: '+this.email+'\n\n\
    Please note that your current data will be overwritten!\n\n\
    To be sure, please make a copy of your savegame first by pressing the regular Save button.\n\
    If your cloud data is older than your current, then you can use that data to get back to where you are now.');
                if(confirmLoad) {    
                    let dataToLoad;
                    this.$emit('clicked', '<span class="text-warning">Searching for cloud saves for your email address ('+this.email+'), please wait...</span>');
                    usersRef.once('value').then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            let data = childSnapshot.val();
                            console.log(new Date(data.ts*1000));
                            if(data.email === currEmail) {
                                dataToLoad = data.data;
                            }
                        });
                    })
                    let i = 0;
                    let checksave = setInterval(() => {
                        if(dataToLoad) {
                            this.$emit('loaddata', dataToLoad);
                            clearInterval(checksave);
                        }
                        else {
                            console.log('nothing');
                        }
                        if(i > 50) {
                            clearInterval(checksave);
                            this.$emit('clicked', '<span class="text-danger">Sorry, couldn\'t find any data connected to '+this.email+'.</span>');
                        }
                        i++;
                    }, 100);
                }
            }
            else {
                this.$emit('clicked', '<span class="text-danger">Enter an email address first so we can find your cloud savedata.</span>');
            }
        },
        toggleMusic: function() {
            this.$emit('togglemusic');
        },
    }
}
</script>
