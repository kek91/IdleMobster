<template>
    <div>
        
        <div>
            <h2>Debug</h2>
            <button v-on:click="debugResetProgress">
                <i class="fa fa-trash-alt fa-2x"></i>
                Reset progress
            </button>
            <button v-on:click="debugAddMoney">
                <i class="fa fa-money-bill-alt fa-2x"></i>
                Add money
            </button>
            <button v-on:click="debugAddXP">
                <i class="fa fa-hat-wizard fa-2x"></i>
                Add XP
            </button>
            <button v-on:click="debugAddHealth">
                <i class="fa fa-heartbeat fa-2x"></i>
                Add health
            </button>
            <button v-on:click="debugResurrect">
                <i class="fa fa-heartbeat fa-2x"></i>
                Resurrect
            </button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'GameDebugFunctions',
    methods: {
        random: function(min,max) {
            return parseInt(Math.floor(Math.random()*(max-min+1)+min));
        },
        debugResetProgress: function() {
            this.$emit('debugresetprogress', 1);
        },
        debugAddMoney: function() {
            this.$emit('debugaddmoney', this.random(1000,100000));
        },
        debugAddXP: function() {
            this.$emit('debugaddxp', this.random(500,10000));
        },
        debugAddHealth: function() {
            this.$emit('debugaddhealth', this.random(1,20));
        },
        debugResurrect: function() {
            this.$emit('debugresurrect', 1);
        },
    }
}
</script>

<style scoped>
button {
    /* width:170px; */
    padding:10px 10px;
    margin:1px;
    font-weight:bold;
    background:#444;
    border:1px solid #000;
    color:#999;
}
button:hover {
    background:#555;
    color:#eee;
    cursor:pointer;
}
button:disabled {
    background:#444;
    color:#666;
    cursor:not-allowed;
    text-decoration: line-through;
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
</style>