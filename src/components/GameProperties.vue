<template>
    <div>

        <div>
            <h2>Properties</h2>
            <button v-on:click="buyPropertyHotdogstand" v-if="xp > xpRankErrandboy || hotdogstands > 0" v-bind:disabled="money < priceHotdogstand" v-bind:title="'Cost: $ ' + new Intl.NumberFormat().format(priceHotdogstand)">
                <i class="fa fa-hotdog fa-3x"></i><br>
                <small>Buy hot dog stand<br>
                ${{ priceHotdogstand | filterNumber }}<br>
                Currently owned: {{ hotdogstands }}<br>
                Revenue/sec: $ {{ incomePerTickHotdogstand*4 | filterNumber }}</small>
            </button>
            <button v-on:click="buyPropertyGasstation" v-if="xp > xpRankSoldier" v-bind:disabled="money < priceGasstation" v-bind:title="'Cost: $ ' + new Intl.NumberFormat().format(priceGasstation)">
                <i class="fa fa-gas-pump fa-3x"></i><br>
                <small>Buy gas station<br>
                ${{ priceGasstation | filterNumber }}<br>
                Currently owned: {{ gasstations }}<br>
                Revenue/sec: $ {{ incomePerTickGasstation*4 | filterNumber }}</small>
            </button>
            <button v-on:click="buyPropertyDistillery" v-if="xp > xpRankHitman" v-bind:disabled="money < priceDistillery" v-bind:title="'Cost: $ ' + new Intl.NumberFormat().format(priceDistillery)">
                <i class="fa fa-glass-martini-alt fa-3x"></i><br>
                <small>Buy distillery<br>
                ${{ priceDistillery | filterNumber }}<br>
                Currently owned: {{ distilleries }}<br>
                Revenue/sec: $ {{ incomePerTickDistillery*4 | filterNumber }}</small>
            </button>
            <button v-on:click="buyPropertyCasino" v-if="xp > xpRankMademan && inventory.includes('Stylish Suit')" v-bind:disabled="money < priceCasino" v-bind:title="'Cost: $ ' + new Intl.NumberFormat().format(priceCasino)">
                <i class="fa fa-dice fa-3x"></i><br>
                <small>Buy casino<br>
                ${{ priceCasino | filterNumber }}<br>
                Currently owned: {{ casinos }}<br>
                Revenue/sec: $ {{ incomePerTickCasino*4 | filterNumber }}</small>
            </button>
            <button v-on:click="buyPropertyHotel" v-if="xp > xpRankCapo && inventory.includes('Fake Business School Degree')" v-bind:disabled="money < priceHotel" v-bind:title="'Cost: $ ' + new Intl.NumberFormat().format(priceHotel)">
                <i class="fa fa-hotel fa-3x"></i><br>
                <small>Buy hotel<br>
                ${{ priceHotel | filterNumber }}<br>
                Currently owned: {{ hotels }}<br>
                Revenue/sec: $ {{ incomePerTickHotel*4 | filterNumber }}</small>
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
        inventory: Array,

        priceHotdogstand: Number,
        priceGasstation: Number,
        priceDistillery: Number,
        priceCasino: Number,
        priceHotel: Number,

        hotdogstands: Number,
        gasstations: Number,
        distilleries: Number,
        casinos: Number,
        hotels: Number,

        incomePerTickHotdogstand: Number,
        dailyRevenueHotdogstand: Number,
        incomePerTickGasstation: Number,
        dailyRevenueGasstation: Number,
        incomePerTickDistillery: Number,
        dailyRevenueDistillery: Number,
        incomePerTickCasino: Number,
        dailyRevenueCasino: Number,
        incomePerTickHotel: Number,
        dailyRevenueHotel: Number,

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
        buyPropertyHotdogstand: function() {
            this.$emit('clicked', 'You purchased a hot dog stand.');
            this.$emit('updateproperties', 'hotdogstand', 1);
            this.$emit('updatexp', 200);
        },
        buyPropertyGasstation: function() {
            this.$emit('clicked', 'You purchased a gas station.');
            this.$emit('updateproperties', 'gasstation', 1);
            this.$emit('updatexp', 400);
        },
        buyPropertyDistillery: function() {
            this.$emit('clicked', 'You purchased a distillery.');
            this.$emit('updateproperties', 'distillery', 1);
            this.$emit('updatexp', 600);
        },
        buyPropertyCasino: function() {
            this.$emit('clicked', 'You purchased a casino.');
            this.$emit('updateproperties', 'casino', 1);
            this.$emit('updatexp', 800);
        },
        buyPropertyHotel: function() {
            this.$emit('clicked', 'You purchased a hotel.');
            this.$emit('updateproperties', 'hotel', 1);
            this.$emit('updatexp', 1000);
        },
    },
    filters: {
        filterNumber(val) {
            if(typeof(val) == "number") {
                return val.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
            }
            return val;
        },
    }
}
</script>

<style scoped>
button small {
    /* font-size:1em; */
}
</style>