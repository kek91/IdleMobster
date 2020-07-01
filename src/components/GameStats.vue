<template>

    <div class="statbox" disabled>

        <span v-html="gameKey" style="color:#ccc;"></span><br>
        
        <span v-if="gameKey == 'Rank'">
            <span v-if="gameVal == 'Hitman' || gameVal == 'Made man' || gameVal == 'Capo'" class="text-uncommon text-stylized" v-html="gameVal"></span>
            <span v-else-if="gameVal == 'Underboss' || gameVal == 'Consigliere' || gameVal == 'Boss'" class="text-rare text-stylized text-large" v-html="gameVal"></span>
            <span v-else-if="gameVal == 'Godfather'" class="text-epic text-stylized text-superlarge" v-html="gameVal"></span>
            <span v-else-if="gameVal == 'Capo di tutti capi'" class="text-legendary text-stylized text-superlarge" v-html="gameVal"></span>
            <span v-else v-html="gameVal"></span>
        </span>
        <span v-else-if="gameKey == 'Heat'">
            <span v-html="gameVal.toFixed(0)" :class="gameVal > 50 ? 'text-danger' : (gameVal > 40 ? 'text-warning' : 'text-success')"></span>
        </span>
        <span v-else-if="gameKey == 'Health'">
            <span v-html="gameVal.toFixed(0)" :class="gameVal > 70 ? 'text-success' : (gameVal > 30 ? 'text-warning' : 'text-danger')"></span>
        </span>
        <span v-else-if="gameKey == 'Money' || gameKey == 'Revenue/day' || gameKey == 'Revenue/sec'">
            <span>$&nbsp;{{ gameVal | filterNumber }}</span>
        </span>
        <span v-else>
            <span>{{ gameVal | filterNumber }}</span>
        </span>
    
    </div>

</template>

<script>

export default {
    name: 'GameStats',
    props: {
        gameKey: String,
        gameVal: [String, Number]
    },
    filters: {
        filterNumber(val) {
            if(typeof(val) == "number") {
                return val.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
            }
            return val;
        }
    },
    methods: {
        filterNumberJs(val) {
            if(typeof(val) == "number") {
                return new Intl.NumberFormat().format(val);
            }
            return val;
        }
    }
}
</script>

<style scoped>
.statbox {
    /* min-width:200px; */
    /* width:30%; */
    /* height:40px; */
    min-width:30px;
    height:40px;
    margin:2px 2px 2px 0px;
    background:#222;
    border:1px solid #000;
    float:left;
    text-align:center;
    padding:5px;
    line-height:20px;
}
</style>

<style>
.text-danger { color:red; }
.text-warning { color:orange; }
.text-success { color:limegreen; }

.text-uncommon { color:yellowgreen; }
.text-rare { color:dodgerblue; }
.text-epic { color:purple; }
.text-legendary { color:orange; }
.text-stylized {
    text-shadow: 2px 2px #000000;
    font-size:1.2em;
}
.text-large {
    font-size:1.4em;
}
.text-superlarge {
    font-size:1.6em;
}
</style>