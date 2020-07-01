<template>
    <div>
        
        <div>
            <h2>Actions</h2>
            <button v-on:click="work" title="Work: Ready" v-bind:class="{ green: true }">
                <i class="fa fa-briefcase fa-3x"></i><br>
                <small>Work</small>
            </button>
            <button v-if="xp > 14" v-on:click="rest" title="Rest: Ready" v-bind:class="{ green: true }">
                <i class="fa fa-bed fa-3x"></i><br>
                <small>Rest</small>
            </button>
            <button v-if="xp > 14" v-on:click="pettyCrime" v-bind:disabled="pettyCrimeTimer > 0" v-bind:title="pettyCrimeTimer > 0 ? 'Petty crime: Not ready' : 'Petty crime: Ready'" v-bind:class="{ green: pettyCrimeTimer < 1 }">
                <i class="fa fa-user-tie fa-3x"></i><br>
                <small v-html="pettyCrimeTimer > 240 ? (pettyCrimeTimer/4/60).toFixed(0)+'m' : pettyCrimeTimer > 0 ? (pettyCrimeTimer/4).toFixed(0)+'s' : 'Petty crime'"></small>
            </button>
            <button v-if="xp > 49" v-on:click="heavyCrime" v-bind:disabled="heavyCrimeTimer > 0" v-bind:title="heavyCrimeTimer > 0 ? 'Heavy crime: Not ready' : 'Heavy crime: Ready'" v-bind:class="{ green: heavyCrimeTimer < 1 }">
                <i class="fa fa-user-secret fa-3x"></i><br>
                <small v-html="heavyCrimeTimer > 240 ? (heavyCrimeTimer/4/60).toFixed(0)+'m' : heavyCrimeTimer > 0 ? (heavyCrimeTimer/4).toFixed(0)+'s' : 'Heavy crime'"></small>
            </button>
            <button v-if="xp > xpRankErrandboy" v-on:click="carTheft" v-bind:disabled="carTheftTimer > 0" v-bind:title="carTheftTimer > 0 ? 'Car theft: Not ready' : 'Car theft: Ready'" v-bind:class="{ green: carTheftTimer < 1 }">
                <i class="fa fa-car fa-3x"></i><br>
                <small v-html="carTheftTimer > 240 ? (carTheftTimer/4/60).toFixed(0)+'m' : carTheftTimer > 0 ? (carTheftTimer/4).toFixed(0)+'s' : 'Car theft'"></small>
            </button>
            <button v-if="xp > xpRankAssociate && weapon != 'None' && weapon != 'Knife'" v-on:click="targetPractice" v-bind:disabled="targetPracticeTimer > 0" v-bind:title="targetPracticeTimer > 0 ? 'Target practice: Not ready' : 'Target practice: Ready'" v-bind:class="{ green: targetPracticeTimer < 1 }">
                <i class="fa fa-bullseye fa-3x"></i><br>
                <small v-html="targetPracticeTimer > 240 ? (targetPracticeTimer/4/60).toFixed(0)+'m' : targetPracticeTimer > 0 ? (targetPracticeTimer/4).toFixed(0)+'s' : 'Target practice'"></small>
            </button>
            <button v-if="xp > xpRankSoldier" v-on:click="trainGym" v-bind:disabled="trainGymTimer > 0" v-bind:title="trainGymTimer > 0 ? 'Train gym: Not ready' : 'Train gym: Ready'" v-bind:class="{ green: trainGymTimer < 1 }">
                <i class="fa fa-dumbbell fa-3x"></i><br>
                <small v-html="trainGymTimer > 240 ? (trainGymTimer/4/60).toFixed(0)+'m' : trainGymTimer > 0 ? (trainGymTimer/4).toFixed(0)+'s' : 'Train gym'"></small>
            </button>
            <button v-if="xp > xpRankHitman && inventory.includes('Mask') && weapon != 'None' && weapon != 'Knife'" v-on:click="oc" v-bind:disabled="ocTimer > 0" v-bind:title="ocTimer > 0 ? 'OC: Not ready' : 'OC: Ready'" v-bind:class="{ green: ocTimer < 1 }">
                <i class="fa fa-university fa-3x"></i><br>
                <small v-html="ocTimer > 240 ? (ocTimer/4/60).toFixed(0)+'m' : ocTimer > 0 ? (ocTimer/4).toFixed(0)+'s' : 'OC'"></small>
            </button>
            <button v-if="xp > xpRankMademan && inventory.includes('License to kill') && weapon != 'None' && weapon != 'Knife'" v-on:click="kill" v-bind:disabled="killTimer > 0" v-bind:title="killTimer > 0 ? 'Kill: Not ready' : 'Kill: Ready'" v-bind:class="{ green: killTimer < 1 }">
                <i class="fa fa-skull fa-3x"></i><br>
                <small v-html="killTimer > 240 ? (killTimer/4/60).toFixed(0)+'m' : killTimer > 0 ? (killTimer/4).toFixed(0)+'s' : 'Kill'"></small>
            </button>
            <br>
            <button v-if="xp > xpRankSoldier" v-on:click="bribePolice" v-bind:disabled="bribePoliceTimer > 0 || money < (xp*0.5)" v-bind:title="bribePoliceTimer > 0 ? 'Bribe police: Not ready' : 'Bribe police: Ready'" v-bind:class="{ orange: bribePoliceTimer < 1 }">
                <i class="fa fa-handshake fa-3x"></i><br>
                <small v-html="bribePoliceTimer > 240 ? (bribePoliceTimer/4/60).toFixed(0)+'m' : bribePoliceTimer > 0 ? (bribePoliceTimer/4).toFixed(0)+'s' : 'Bribe police<br>Cost $'+(xp*0.5).toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+''"></small>
            </button>
            <button v-if="xp > xpRankConsigliere" v-on:click="resetAllTimers" v-bind:disabled="resetAllTimersTimer > 0 || money < 10000000" v-bind:title="resetAllTimersTimer > 0 ? 'Reset all timers: Not ready' : 'Reset all timers: Ready'" v-bind:class="{ orange: resetAllTimersTimer < 1 }">
                <i class="fa fa-clock fa-3x"></i><br>
                <small v-html="resetAllTimersTimer > 240 ? (resetAllTimersTimer/4/60).toFixed(0)+'m' : resetAllTimersTimer > 0 ? (resetAllTimersTimer/4).toFixed(0)+'s' : 'Reset timers<br>Cost $10 000 000'"></small>
            </button>
            <button v-if="xp > xpRankCapoditutticapi" v-on:click="prestige" title="Advance to next Prestige tier" class="orange">
                <i class="fa fa-star fa-3x"></i><br>
                <small>Prestige<br>Restarts game</small>
            </button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'GameActions',
    props: {
        xp: Number,
        money: Number,
        power: Number,
        weapon: String,
        inventory: Array,
        pettyCrimeTimer: Number,
        heavyCrimeTimer: Number,
        carTheftTimer: Number,
        trainGymTimer: Number,
        targetPracticeTimer: Number,
        ocTimer: Number,
        killTimer: Number,
        bribePoliceTimer: Number,
        resetAllTimersTimer: Number,
        xpRankLowlife: Number,
        xpRankErrandboy: Number,
        xpRankAssociate: Number,
        xpRankSoldier: Number,
        xpRankHitman: Number,
        xpRankMademan: Number,
        xpRankCapo: Number,
        xpRankUnderboss: Number,
        xpRankConsigliere: Number,
        xpRankBoss: Number,
        xpRankGodfather: Number,
        xpRankCapoditutticapi: Number,
    },
    methods: {
        random: function(min,max) {
            return parseInt(Math.floor(Math.random()*(max-min+1)+min));
        },

        pettyCrime: function() {
            let xpEarned = 10,
                moneyEarned = 0,
                healthLost = this.random(-2,0),
                heatIncreased = 2,
                newTimer = 20,
                dice = this.random(0,10);
            if(this.xp > this.xpRankMademan) { dice = this.random(3,5); }
            if(dice !== 1) {
                moneyEarned = this.random(1,10)*( Math.max(1, this.power*0.1) );
                this.$emit('clicked', '<span class="text-success">Petty crime succeeded! You earned $ '+moneyEarned.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.</span>');
            }
            else {
                xpEarned = 2;
                this.$emit('clicked', '<span class="text-warning">Petty crime failed!</span>');
            }
            this.$emit('updatexp', xpEarned);
            this.$emit('updatemoney', moneyEarned);
            this.$emit('updatehealth', healthLost);
            this.$emit('updateheat', heatIncreased);
            this.$emit('updatetimer', 'pettyCrimeTimer', newTimer);
        },
        heavyCrime: function() {
            let xpEarned = 25,
                moneyEarned = 0,
                healthLost = this.random(-5,0),
                heatIncreased = 4,
                newTimer = 50,
                dice = this.random(0,6);
            if(this.xp > this.xpRankUnderboss) { dice = this.random(1,4); }
            if(dice === 1 || dice === 2 || dice === 3 || dice === 4) {
                moneyEarned = this.random(20,80)*( Math.max(1, this.power*0.1) );
                this.$emit('clicked', '<span class="text-success">Heavy crime succeeded! You earned $ '+moneyEarned.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.</span>');
            }
            else {
                xpEarned = 8;
                this.$emit('clicked', '<span class="text-warning">Heavy crime failed!</span>');
            }
            this.$emit('updatexp', xpEarned);
            this.$emit('updatemoney', moneyEarned);
            this.$emit('updatehealth', healthLost);
            this.$emit('updateheat', heatIncreased);
            this.$emit('updatetimer', 'heavyCrimeTimer', newTimer);
        },
        carTheft: function() {
            let xpEarned = 75,
                moneyEarned = 0,
                healthLost = this.random(-20,0),
                heatIncreased = 6,
                newTimer = 100,
                dice = this.random(0,6);
            if(this.xp > this.xpRankGodfather) { dice = this.random(1,3); }
            else if(this.xp > this.xpRankConsigliere) { dice = this.random(1,4); }
            if(dice === 1 || dice === 2 || dice === 3) {
                moneyEarned = this.random(200,1000)*( Math.max(1, this.power*0.1) );
                this.$emit('clicked', '<span class="text-success">Car theft succeeded! You stole a car and sold it for $ '+moneyEarned.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.</span>');
            }
            else {
                xpEarned = 20;
                this.$emit('clicked', '<span class="text-warning">Car theft failed!</span>');
            }
            this.$emit('updatexp', xpEarned);
            this.$emit('updatemoney', moneyEarned);
            this.$emit('updatehealth', healthLost);
            this.$emit('updateheat', heatIncreased);
            this.$emit('updatetimer', 'carTheftTimer', newTimer);
        },
        rest: function() {
            this.$emit('clicked', 'Rested: Health increased. Heat decreased. Timers reduced.');
            this.$emit('updatehealth', 1);
            this.$emit('updateheat', -1);
            this.$emit('reducealltimers', 1);
        },
        work: function() {
            let xpEarned = 1,
                moneyEarned = 1;
            this.$emit('clicked', '<span class="text-success">Work completed - It ain\'t much but it\'s honest work.</span>');
            this.$emit('updatexp', xpEarned);
            this.$emit('updatemoney', moneyEarned);
        },
        trainGym: function() {
            let xpEarned = 150,
                newTimer = 300;
            this.$emit('clicked', '<span class="text-success">Gym training completed.</span>');
            this.$emit('updatexp', xpEarned);
            this.$emit('updatetimer', 'trainGymTimer', newTimer);
        },
        targetPractice: function() {
            let xpEarned = 300,
                bulletsUsed = this.random(20,30),
                newTimer = 400;
            this.$emit('clicked', '<span class="text-success">Target practice completed.</span>');
            this.$emit('updatexp', xpEarned);
            this.$emit('updatebullets', -bulletsUsed);
            this.$emit('updatetimer', 'targetPracticeTimer', newTimer);
        },
        oc: function() {
            let xpEarned = 1000,
                moneyEarned = 0,
                heatIncreased = 20,
                bulletsUsed = this.random(5,30),
                newTimer = 1000,
                dice = this.random(0,6);
            if(this.xp > this.xpRankCapoditutticapi) { dice = this.random(1,3); }
            else if(this.xp > this.xpRankGodfather) { dice = this.random(1,4); }
            else if(this.xp > this.xpRankBoss) { dice = this.random(1,5); }
            if(dice === 1 || dice === 2 || dice === 3) {
                moneyEarned = this.random(10000,50000)*( Math.max(1, this.power*0.1) );
                this.$emit('clicked', '<span class="text-success">Your organised bank heist were a major success netting you a total of $ '+moneyEarned.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.');
            }
            else {
                xpEarned = 250;
                this.$emit('clicked', '<span class="text-warning">Organised crime failed!</span>');
            }
            this.$emit('updatemoney', moneyEarned);
            this.$emit('updatexp', xpEarned);
            this.$emit('updatebullets', -bulletsUsed);
            this.$emit('updateheat', heatIncreased);
            this.$emit('updatetimer', 'ocTimer', newTimer);
        },
        kill: function() {
            let xpEarned = 500,
                heatIncreased = 30,
                bulletsUsed = this.random(2,15),
                newTimer = 2000;
            this.$emit('clicked', '<span class="text-success">You killed an associate of an enemy family. This gained you a lot of experience and heat.</span>');
            this.$emit('updatexp', xpEarned);
            this.$emit('updateheat', heatIncreased);
            this.$emit('updatebullets', -bulletsUsed);
            this.$emit('updatetimer', 'killTimer', newTimer);
        },
        bribePolice: function() {
            let xpEarned = 150,
                moneySpent = this.xp,
                heatDecreased = 80,
                newTimer = 300;
            this.$emit('clicked', '<span class="text-success">You bribed the police for $ '+moneySpent.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.</span>');
            this.$emit('updatexp', xpEarned);
            this.$emit('updatemoney', -moneySpent);
            this.$emit('updateheat', -heatDecreased);
            this.$emit('updatetimer', 'bribePoliceTimer', newTimer);
        },
        resetAllTimers: function() {
            let xpEarned = 150,
                moneySpent = 10000000,
                newTimer = 1000;
            this.$emit('clicked', '<span class="text-success">You removed all timers for $ '+moneySpent.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.</span>');
            this.$emit('updatexp', xpEarned);
            this.$emit('updatemoney', -moneySpent);
            this.$emit('resetalltimers', 1);
            this.$emit('updatetimer', 'resetAllTimersTimer', newTimer);
        },
        prestige: function() {
            let confirmReset = confirm('Prestige is a way to further empower your mafioso way of life by granting you a permanent multiplier for xp and money generation.\n\n\
Please note that you will start over from the beginning but with some added bonuses to speed things up:\n\n\
- You will keep 90% of your current cash\n\
- You will keep one hot dog stand\n\
- You will gain an exponential multiplier for all incoming xp and money\n\
- Everything else will be reset\n\n\
Do you wish to proceed?');
            if(confirmReset) {
                this.$emit('doprestige', 1);
            }
        },
    }
}
</script>

<style>
button {
    /* width:170px; */
    min-width:70px;
    padding:6px;
    margin:1px;
    font-weight:bold;
    background:#444;
    border:1px solid #000;
    color:#ddd;
}
button small {
    /* font-size:1.2em; */
    /* line-height:25px; */
}
button:hover {
    background:#555;
    color:#eee;
    cursor:pointer;
}
button:disabled {
    background:#333;
    color:#ccc;
    cursor:not-allowed;
    /* text-decoration: line-through; */
}
button i {
    color:#999;
    background:#444;
    vertical-align: middle;
}
button:hover i {
    color:#eee;
    background:#555;
}
button:disabled i {
    color:#666;
    background:#444;
}
button.green {
    color:yellowgreen;
}
button.red {
    color:orangered;
}
button.blue {
    color:dodgerblue;
}
button.orange {
    color:orange;
}
</style>